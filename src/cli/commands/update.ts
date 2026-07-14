import { Command, type CommandData } from "../command.ts";
import { installNetherite } from "../utils/install.ts";

export default new Command<CommandData>({
    name: "update",
    usage: {
        description: "Updates the global version of Netherite on this machine.",
        usage: "<version> (as SemVer or latest)",
    },
    validateArgs(_args) {
        _args.arguments[0] ||= "latest";
        if (typeof _args.arguments[0] !== "string") return false;
        const validVersion = _args.arguments[0] === "latest" || RegExp(/\d\.\d\.\d?.+/).test(_args.arguments[0]);
        return validVersion && _args.arguments.length === 1;
    },
    async action(_args) {
        await installNetherite(_args.arguments[0] as string);
        Deno.exit(0);
    },
}).register();