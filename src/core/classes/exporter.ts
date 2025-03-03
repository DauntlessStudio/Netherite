import { zipDir } from "https://deno.land/x/jszip@0.11.0/mod.ts";
import * as path from "jsr:@std/path";
import { Project } from "./project.ts";
import { Config, World } from "./index.ts";
import { sendToDist } from "../utils/index.ts";

export type ExportType = "world"|"template"|"publish";

export class Exporter {
    public static async export(type: ExportType, out: string = Config.DownloadDirectory): Promise<void> {
        await Project.build({ignoreSymlinks: true});

        if (type !== "publish" && Config.Options.type === "add-on") {
            await World.build(true);
        }

        if (type === "publish") {
            await this.publish(out);
            return;
        }

        const filename = `${Config.Options.name}_v${Config.Options.version}.mc${type}`;

        const zip = await zipDir(Config.Paths.root, {includeDirs: true, includeFiles: true});
        await zip.writeZip(path.join(out, filename));

        console.log("Exported project to " + path.join(out, filename));
    }

    private static async publish(out: string): Promise<void> {
        try {
            sendToDist(path.join(Deno.cwd(), "public/store"), path.join(Deno.cwd(), "dist/Store Art/"))
        } catch (_error) {
            console.error("No store art found in the public/store directory, skipping.");
        }

        try {
            sendToDist(path.join(Deno.cwd(), "public/marketing"), path.join(Deno.cwd(), "dist/Marketing Art/"))
        } catch (_error) {
            console.error("No marketing art found in the public/marketing directory, skipping.");
        }

        const filename = `${Config.Options.name}_v${Config.Options.version}.zip`;

        const zip = await zipDir(path.join(Deno.cwd(), "dist"), {followSymlinks: true, includeDirs: true, includeFiles: true})
        await zip.writeZip(path.join(out, filename));

        console.log("Exported project to " + path.join(out, filename));
    }
}