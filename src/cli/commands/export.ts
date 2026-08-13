import { Command, type CommandData } from "../command.ts";
import { Exporter, type ExportType } from "../../core/classes/index.ts";
import { runCached } from "../utils/jsr.ts";
import { Script } from "../../core/core.ts";

interface ExportCommandData extends CommandData {
    options: {
        type: ExportType;
        out?: string;
        local?: boolean;
        obfuscate?: boolean;
    }
}

export default new Command<ExportCommandData>({
    name: "export",
    usage: {
        description: "Exports the project",
        usage: "--type world|template|addon|publish [--out <directory> --no-obfuscate]",
        flags: {
            "type": {
                type: "string",
                description: "The output type, options are: world = .mcworld with packs, template = .mctemplate with packs, addon = .mcaddon with packs, publish = .zip with marketplace content.",
                optional: false,
            },
            "out": {
                type: "string",
                description: "The directory to send to the export to. Defaults to user Downloads folder.",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["local"],
        string: ["type", "out"],
        alias: {
            type: "t",
            out: "o",
        },
        negatable: [
            "obfuscate"
        ]
    },
    validateArgs(_args) {
        const typeValid = _args.options.type === "world" || _args.options.type === "template" || _args.options.type === "addon" || _args.options.type === "publish";
        const outValid = _args.options.out === undefined || typeof _args.options.out === "string";
        const localValid = _args.options.local === undefined || typeof _args.options.local === "boolean";
        const obfuscateValid = _args.options.obfuscate === undefined || typeof _args.options.obfuscate === "boolean";
        return typeValid && outValid && localValid && obfuscateValid;
    },
    async action(_args) {
        // The export command delegates to the installed version of Netherite, passing the hidden --local flag.
        if (!_args.options.local) {
            await runCached([...Deno.args, "--local"]);
            return;
        }
        
        Script.minify = _args.options.obfuscate ?? true;
        await Exporter.export(_args.options.type, _args.options.out);
    },
}).register();