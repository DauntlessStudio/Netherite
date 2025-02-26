import * as path from "jsr:@std/path";
import { Config, Language, Manifest, Module, Script } from "../../core/classes/index.ts";
import { Command, type CommandData } from "../command.ts";
import { emptyDirectorySync } from "../../core/utils/index.ts";
import { Static } from "../../core/classes/static.ts";

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
        // Delete dist directory
        emptyDirectorySync(path.join(Deno.cwd(), Config.Paths.bp.root));
        emptyDirectorySync(path.join(Deno.cwd(), Config.Paths.rp.root));
        // Copy static src files to dist
        Static.build(_args.options.watch);
        // Build dynamic src files
        await Module.build(_args.options.watch);
        Language.outputLangFiles();
        Manifest.outputManifestFiles();
        // Build scripts
        Script.build(_args.options.watch);
    },
});