import * as path from "jsr:@std/path";
import { Config } from "./classes/config.ts";
import { sendToDist } from "./utils/fileIO.ts";
import { sleep } from "./utils/time.ts";
import { Language } from "./classes/language.ts";

export async function buildStaticFiles(watch?: boolean): Promise<void> {
    // Handles BP Root Files
    const behaviorPackPath = path.join(Deno.cwd(), "src/behavior_pack");
    const behaviorPackDest = path.join(Deno.cwd(), Config.Paths.bp.root);
    Deno.mkdirSync(behaviorPackDest, {recursive: true});
    sendToDist(behaviorPackPath, behaviorPackDest, ["**/*.ts", "**/manifest.json"]);

    // Handles RP Root Files
    const resourcePackPath = path.join(Deno.cwd(), "src/resource_pack");
    const resourcePackDest = path.join(Deno.cwd(), Config.Paths.rp.root);
    Deno.mkdirSync(resourcePackDest, {recursive: true});
    Language.ingestLangFiles(path.join(resourcePackPath, "texts"));
    sendToDist(resourcePackPath, resourcePackDest, ["**/.lang", "**/manifest.json"]);

    // Handles Module Files
    const modulePath = path.join(Deno.cwd(), "src/modules");
    
    for (const entry of Deno.readDirSync(modulePath)) {
        if (entry.isDirectory) {
            // Get BP and RP Subdirectories and copy
            for (const subEntry of Deno.readDirSync(path.join(modulePath, entry.name))) {
                const subPath = path.join(modulePath, entry.name, subEntry.name);

                if (subEntry.isDirectory && /.+([bp]|[BP])/.test(subPath)) {
                    sendToDist(subPath, behaviorPackDest, ["**/*.ts", "**/manifest.json"]);
                }
                
                if (subEntry.isDirectory && /.+([rp]|[RP])/.test(subPath)) {
                    Language.ingestLangFiles(path.join(subPath, "texts"));
                    sendToDist(subPath, resourcePackDest, ["**/.lang", "**/manifest.json"]);
                }
            }
        }
    }

    // Handles file watching
    if (!watch) return;

    const sync = (event: Deno.FsEvent) => {
        const src = event.paths[0];
        
        if (src.endsWith(".ts")) return;

        let dest = src
        .replace(behaviorPackPath, behaviorPackDest)
        .replace(resourcePackPath, resourcePackDest);

        if (dest.startsWith(modulePath)) {
            dest = dest
            .replace(/.+([bp]|[BP])/, behaviorPackDest)
            .replace(/.+([rp]|[RP])/, resourcePackDest);
        }

        switch (event.kind) {
            case "create": {
                sendToDist(src, dest);
                break;
            }
            case "modify": {
                const stat = Deno.statSync(src);
                if (stat.isDirectory) return;
                if (!writeModifiedFile(src, dest)) return;
                break;
            }
            case "rename": {
                sendToDist(src, dest);
                break;
            }
            case "remove": {
                Deno.removeSync(dest, {recursive: true});
                break;
            }
            default:
                break;
        }

        console.log("[%s] %s", event.kind, event.paths[0]);
    };
      
    const watcher = Deno.watchFs(path.join(Deno.cwd(), "src"), {recursive: true});
    
    for await (const event of watcher) {
      sync(event);
    }
}

const pendingChanges = new Map<string, boolean>();

function writeModifiedFile(src: string, dest: string): boolean {
    if (pendingChanges.has(src)) return false;

    pendingChanges.set(src, true);
    writeModifiedFile(src, dest);
    sleep(200).then(() => pendingChanges.delete(src));

    return true;
}