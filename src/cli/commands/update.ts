import { Command, type CommandData } from "../command.ts";
import { installNetherite } from "../utils/install.ts";

interface UpdateCommandData extends CommandData {
    options: {
        force?: boolean;
    }
}

export default new Command<UpdateCommandData>({
    name: "update",
    parse: {
        boolean: ["force"]
    },
    usage: {
        description: "Updates the global version of Netherite on this machine.",
        usage: "[--force] <version> (as SemVer or latest)",
        flags: {
            force: {
                type: "boolean",
                description: "Forces this version to be installed even if JSR's 24 window has not elapsed",
                optional: true,
            }
        }
    },
    validateArgs(_args) {
        _args.arguments[0] ||= "latest";
        if (typeof _args.arguments[0] !== "string") return false;
        const validVersion = _args.arguments[0] === "latest" || RegExp(/\d\.\d\.\d?.+/).test(_args.arguments[0]);
        return validVersion && _args.arguments.length === 1;
    },
    async action(_args) {
        await installNetherite(_args.arguments[0] as string, _args.options.force);
        Deno.exit(0);
    },
}).register();