import { Command, type CommandData } from "../command.ts";
import { Exporter, type ExportType } from "../../core/classes/index.ts";

interface ExportCommandData extends CommandData {
    options: {
        type: ExportType;
        out?: string;
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
        string: ["type", "out"],
        alias: {
            type: "t",
            out: "o",
        }
    },
    validateArgs(_args) {
        const typeValid = _args.options.type === "world" || _args.options.type === "template" || _args.options.type === "publish";
        const outValid = _args.options.out === undefined || typeof _args.options.out === "string";
        return typeValid && outValid;
    },
    async action(_args) {
        await Exporter.export(_args.options.type, _args.options.out);
    },
});