import { Command, type CommandData } from "../command.ts";
import { Config, Exporter, type ExportType } from "../../core/classes/index.ts";
import { runCached } from "../utils/jsr.ts";

interface ExportCommandData extends CommandData {
    options: {
        type: ExportType;
        out?: string;
        local?: boolean;
    }
}

export default new Command<ExportCommandData>({
    name: "export",
    usage: {
        description: "Exports the project",
        usage: "--type world|template|publish [--out <directory>]",
        flags: {
            "type": {
                type: "string",
                description: "The output type to be exported",
                optional: false,
            },
            "out": {
                type: "string",
                description: "The directory to send to the export to",
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
        }
    },
    validateArgs(_args) {
        const typeValid = _args.options.type === "world" || _args.options.type === "template" || _args.options.type === "publish";
        const outValid = _args.options.out === undefined || typeof _args.options.out === "string";
        const localValid = _args.options.local === undefined || typeof _args.options.local === "boolean";
        return typeValid && outValid && localValid;
    },
    async action(_args) {
        // The export command delegates to the installed version of Netherite, passing the hidden --local flag.
        if (!_args.options.local) {
            await runCached([...Deno.args, "--local"]);
            return;
        }
        
        await Exporter.export(_args.options.type, _args.options.out);
    },
});