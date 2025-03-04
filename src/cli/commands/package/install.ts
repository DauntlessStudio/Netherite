import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";

interface InstallCommandData extends CommandData {
    options: {
        "no-load"?: boolean;
    }
}

export default new Command<InstallCommandData>({
    name: "install",
    usage: {
        description: "Installs a package into the Netherite cache, and loads it into the project",
        usage: "[--no-load]",
        argument: "<package git repo>",
        flags: {
            "no-load": {
                type: "boolean",
                description: "Does not load the package into the project",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["no-load"],
    },
    validateArgs(_args) {
        const args = _args.arguments.length >= 1 && _args.arguments.every(arg => typeof arg === "string");
        const noLoad = _args.options["no-load"] === undefined || typeof _args.options["no-load"] === "boolean";
        return args && noLoad;
    },
    async action(_args) {
        for (const arg of _args.arguments) {
            const manifest = await Package.install(arg as string);
            
            if (!_args.options["no-load"]) {
                await Package.load(manifest.manifest.name);
            }
        }
    },
});