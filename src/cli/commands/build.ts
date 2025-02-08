import { Config } from "../../core/config.ts";
import { buildManifests } from "../../core/manifest_builder.ts";
import { buildScripts } from "../../core/scripts_builder.ts";
import { Command, type CommandData } from "../command.ts";

interface BuildCommandData extends CommandData {
    options: {
        watch?: boolean;
    }
}

export default new Command<BuildCommandData>({
    name: "build",
    usage: {
        description: "Builds the project",
        usage: "[options]",
        flags: {
            "watch": {
                type: "boolean",
                description: "Watch for changes",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["watch"],
        alias: {
            watch: "w",
        }
    },
    validateArgs(_args) {
        return _args.options.watch === undefined || typeof _args.options.watch === "boolean";
    },
    async action(_args) {
        await Config.ingestConfig();
        buildScripts(_args.options.watch);
        buildManifests();
    },
});