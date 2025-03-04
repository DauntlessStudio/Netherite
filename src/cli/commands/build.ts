import { Command, type CommandData } from "../command.ts";
import { Project } from "../../core/classes/project.ts";

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
        await Project.build({watch: _args.options.watch});
    },
});