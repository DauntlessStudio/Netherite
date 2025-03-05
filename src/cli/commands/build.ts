import { Command, type CommandData } from "../command.ts";
import { Project } from "../../core/classes/project.ts";

interface BuildCommandData extends CommandData {
    options: {
        watch?: boolean;
        silent?: boolean;
    }
}

export default new Command<BuildCommandData>({
    name: "build",
    usage: {
        description: "Builds the project",
        usage: "[--watch --silent]",
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
        },
    },
    parse: {
        boolean: ["watch", "silent"],
        alias: {
            watch: "w",
            silent: "s",
        }
    },
    validateArgs(_args) {
        const watchValid = _args.options.watch === undefined || typeof _args.options.watch === "boolean";
        const silentValid = _args.options.silent === undefined || typeof _args.options.silent === "boolean";
        return watchValid && silentValid;
    },
    async action(_args) {
        await Project.build(_args.options);
    },
});