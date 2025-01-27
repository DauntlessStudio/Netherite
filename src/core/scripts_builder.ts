import * as path from "jsr:@std/path";
import * as esbuild from "npm:esbuild";
import {denoPlugins} from "jsr:@luca/esbuild-deno-loader";

export async function buildScripts(watch?: boolean): Promise<void> {
    try {
        Deno.statSync(path.join(Deno.cwd(), "src/behavior_pack/scripts/main.ts"));
    } catch (_error) {
        console.error("No main script found in src/behavior_pack/scripts/main.ts");
        return;
    }

    const buildOptions: esbuild.BuildOptions = {
        plugins: [...denoPlugins()],
        entryPoints: ["./src/behavior_pack/scripts/main.ts"],
        external: ["@minecraft/server", "@minecraft/server-ui"],
        outfile: "./dist/Content/world_template/behavior_packs/folder_bp/scripts/main.js",
        bundle: true,
        format: "esm",
        logLevel: "info",
    };

    if (watch) {
        const context = await esbuild.context(buildOptions);
        context.watch();
    } else {
        await esbuild.build(buildOptions);
    }
}