import * as path from "jsr:@std/path";
import { Config } from "../../core/config.ts";
import { buildManifests } from "../../core/manifest_builder.ts";
import { buildScripts } from "../../core/scripts_builder.ts";
import { buildStaticFiles } from "../../core/static_builder.ts";
import { Command, type CommandData } from "../command.ts";
import { buildModules } from "../../core/modules_builder.ts";
import { emptyDirectorySync } from "../../core/utils/fileIO.ts";

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
        buildStaticFiles(_args.options.watch);
        // Build dynamic src files
        await buildModules(_args.options.watch);
        buildManifests();
        // Build scripts
        buildScripts(_args.options.watch);
    },
});