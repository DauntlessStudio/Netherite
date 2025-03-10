import * as path from "jsr:@std/path";
import { Command, type CommandData } from "../command.ts";
import { Project } from "../../core/classes/project.ts";
import { abortOnKeypress, Logger } from "../../core/utils/index.ts";

interface BuildCommandData extends CommandData {
    options: {
        watch?: boolean;
        silent?: boolean;
        all?: string;
    }
}

export default new Command<BuildCommandData>({
    name: "build",
    usage: {
        description: "Builds the project",
        usage: "[--watch --silent --all <directory>]",
        flags: {
            "watch": {
                type: "boolean",
                description: "Watch for changes",
                optional: true,
            },
            "silent": {
                type: "boolean",
                description: "Do not send feedback to the console",
                optional: true,
            },
            "all": {
                type: "string",
                description: "Build all projects in the specified directory",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["watch", "silent"],
        string: ["all"],
        alias: {
            watch: "w",
            silent: "s",
            all: "a",
        }
    },
    validateArgs(_args) {
        const watchValid = _args.options.watch === undefined || typeof _args.options.watch === "boolean";
        const silentValid = _args.options.silent === undefined || typeof _args.options.silent === "boolean";
        const allValid = _args.options.all === undefined || typeof _args.options.all === "string";
        return watchValid && silentValid && allValid;
    },
    async action(_args) {
        if (!_args.options.all) {
            await Project.build(_args.options);
        } else {
            const args = ["build"];
            if (_args.options.watch) args.push("--watch");
            if (_args.options.silent) args.push("--silent");

            const abortCallbacks: (() => void)[] = [];

            try {
                for (const dir of Deno.readDirSync(_args.options.all)) {
                    if (dir.isDirectory) {
                        const subpath = path.join(_args.options.all, dir.name);
                        try {
                            Deno.statSync(path.join(subpath, "netherite.config.ts"));
                        } catch (_error) {
                            continue;
                        }

                        const command = new Deno.Command("netherite", {
                            args,
                            cwd: subpath,
                            stderr: "inherit",
                            stdout: "inherit",
                        });

                        if (!_args.options.watch) {
                            await command.output();
                        } else {
                            const task = command.spawn();
                            task.output();
                            abortCallbacks.push(() => task.kill());
                        }
                    }
                }
            } catch (_error) {
                Logger.error(`The directory ${_args.options.all} does not exist`);
                Deno.exit(1);
            }

            if (abortCallbacks.length) {
                abortOnKeypress(abortCallbacks);
            }
        }
    },
});