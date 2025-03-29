import * as path from "@std/path";
import * as esbuild from "esbuild";
import {denoPlugins} from "@luca/esbuild-deno-loader";
import { Config } from "./config.ts";
import { writeTextToDist } from "../utils/index.ts";
import { Logger } from "../utils/logger.ts";

export class Script {
    private static buildOptions?: esbuild.BuildOptions;
    private static context?: esbuild.BuildContext<esbuild.BuildOptions>;

    public static async build(watch?: boolean): Promise<void> {
        if (Config.Options.type === "skin-pack") return;
        
        try {
            Deno.statSync(path.join(Deno.cwd(), "src/behavior_pack/scripts/main.ts"));
        } catch (_error) {
            console.error("No main script found in src/behavior_pack/scripts/main.ts");
            return;
        }
    
        this.buildOptions = {
            plugins: Config.Options.scripting === "deno" ? [...denoPlugins()] : undefined,
            entryPoints: ["./src/behavior_pack/scripts/main.ts"],
            external: ["@minecraft/server", "@minecraft/server-ui"],
            outfile: Config.Paths.bp.scripts + `/main.js`,
            bundle: true,
            sourcemap: "inline",
            format: "esm",
            logLevel: watch ? "info" : undefined,
            write: false,
        };
    
        if (watch) {
            this.watch();
        } else {
            const result = await esbuild.build(this.buildOptions);
            for (const out of result.outputFiles ?? []) {
                writeTextToDist(out.path, out.text);
            }
        }
    }

    public static async watch(): Promise<void> {
        if (!this.buildOptions) {
            throw new Error("Build options are not set. Please run build() first.");
        }

        let firstRun = false;

        if (!this.context) {
            firstRun = true;
            this.context = await esbuild.context(this.buildOptions);
        }

        const result = await this.context.rebuild();
        
        for (const out of result.outputFiles ?? []) {
            writeTextToDist(out.path, out.text);
        }

        if (!firstRun) Logger.log("Rebuilt Scripts...");
    }
}