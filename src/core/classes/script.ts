import * as path from "@std/path";
import * as esbuild from "esbuild";
import {denoPlugins} from "@luca/esbuild-deno-loader";
import { Config } from "./config.ts";

export class Script {
    public static async build(watch?: boolean): Promise<void> {
        if (Config.Options.type === "skin-pack") return;
        
        try {
            Deno.statSync(path.join(Deno.cwd(), "src/behavior_pack/scripts/main.ts"));
        } catch (_error) {
            console.error("No main script found in src/behavior_pack/scripts/main.ts");
            return;
        }
    
        const buildOptions: esbuild.BuildOptions = {
            plugins: Config.Options.scripting === "deno" ? [...denoPlugins()] : undefined,
            entryPoints: ["./src/behavior_pack/scripts/main.ts"],
            external: ["@minecraft/server", "@minecraft/server-ui"],
            outfile: Config.Paths.bp.scripts + `/main.js`,
            bundle: true,
            sourcemap: "inline",
            format: "esm",
            logLevel: watch ? "info" : undefined,
        };
    
        if (watch) {
            this.watch(buildOptions);
        } else {
            await esbuild.build(buildOptions);
        }
    }

    public static async watch(buildOptions: esbuild.BuildOptions): Promise<void> {
        const context = await esbuild.context(buildOptions);
        context.watch();
    }
}