import * as path from "jsr:@std/path";
import { Config, Language } from "./index.ts";
import { sendToDist, sleep } from "../utils/index.ts";
import { Module } from "./module.ts";
import { Sound } from "./sound.ts";
import { Texture } from "./texture.ts";
import { Block } from "./block.ts";

export class Static {
    private static readonly behaviorPath = path.join(Deno.cwd(), "src/behavior_pack");
    private static readonly resourcePath = path.join(Deno.cwd(), "src/resource_pack");
    private static readonly modulePath = path.join(Deno.cwd(), "src/modules");

    private static readonly pendingChanges: Map<string, boolean> = new Map();

    private static readonly specialFiles: Map<string, (file: string) => void> = new Map([
        ["**/sounds.json", Sound.watch.bind(Sound)],
        ["**/blocks.json", Block.watch.bind(Block)],
        ["**/*.lang", Language.watch.bind(Language)],
        ["**/textures/*.json", Texture.watch.bind(Texture)],
        ["**/sound/sound_definitions.json", Sound.watch.bind(Sound)],
    ]);

    public static build(watch?: boolean) {
        Texture.ingestTextureFiles(path.join(this.resourcePath, "textures"));
        Language.ingestLangFiles(path.join(this.resourcePath, "texts"));
        Sound.ingestSoundFiles(path.join(this.resourcePath, "sounds"));
        Block.ingestBlockFiles(this.resourcePath);
        Sound.ingestSoundFiles(this.resourcePath);

        sendToDist(this.behaviorPath, Config.Paths.bp.root, ["**/*.ts"]);
        sendToDist(this.resourcePath, Config.Paths.rp.root, ["**/.lang"]);

        for (const entry of Deno.readDirSync(this.modulePath)) {
            if (entry.isDirectory) {
                for (const subEntry of Deno.readDirSync(path.join(this.modulePath, entry.name))) {
                    const subPath = path.join(this.modulePath, entry.name, subEntry.name);
    
                    if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "bp")) {
                        sendToDist(subPath, Config.Paths.bp.root, ["**/*.ts"]);
                        continue;
                    }
                    
                    if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "rp")) {
                        Texture.ingestTextureFiles(path.join(subPath, "textures"));
                        Language.ingestLangFiles(path.join(subPath, "texts"));
                        Sound.ingestSoundFiles(path.join(subPath, "sounds"));
                        Block.ingestBlockFiles(subPath);
                        Sound.ingestSoundFiles(subPath);
                        
                        sendToDist(subPath, Config.Paths.rp.root, ["**/.lang"]);
                        continue;
                    }
                }
            }
        }

        if (watch) {
            this.watch();
        }
    } 

    public static getDistFromPath(src: string): string {
        src = path.resolve(src);

        if (src.startsWith(this.behaviorPath)) {
            src = src.replace(this.behaviorPath, "");
            return path.join(Config.Paths.bp.root, src);
        }

        if (src.startsWith(this.resourcePath)) {
            src = src.replace(this.resourcePath, "");
            return path.join(Config.Paths.rp.root, src);
        }

        if (Module.isInModuleDirectory(src, "bp")) {
            src = src.replace(this.modulePath, "");
            const segments = src.split(path.SEPARATOR_PATTERN).filter(Boolean);
            return path.join(Config.Paths.bp.root, ...segments.slice(2));
        }

        if (Module.isInModuleDirectory(src, "rp")) {
            src = src.replace(this.modulePath, "");
            const segments = src.split(path.SEPARATOR_PATTERN).filter(Boolean);
            return path.join(Config.Paths.rp.root, ...segments.slice(2));
        }

        throw new Error("Path is not in a valid directory");
    }

    private static async watch(): Promise<void> {
        const sync = (event: Deno.FsEvent) => {
            const src = event.paths[0];

            if (src.endsWith(".ts") || !this.canWrite(src)) return;

            console.log("[%s] %s", event.kind, event.paths[0]);

            for (const [file, callback] of this.specialFiles.entries()) {
                if (path.globToRegExp(file).test(src)) {
                    callback(src);
                    return;
                }
            }

            const dest = this.getDistFromPath(src);

            switch (event.kind) {
                case "create": {
                    sendToDist(src, dest);
                    break;
                }
                case "modify": {
                    const stat = Deno.statSync(src);
                    if (stat.isDirectory) return;
                    sendToDist(src, dest);
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
        };

        const watcher = Deno.watchFs(path.join(Deno.cwd(), "src"), {recursive: true});

        for await (const event of watcher) {
          sync(event);
        }
    }

    private static canWrite(src: string): boolean {
        if (this.pendingChanges.has(src)) return false;
    
        this.pendingChanges.set(src, true);
        this.canWrite(src);
        sleep(200).then(() => this.pendingChanges.delete(src));
    
        return true;
    }
}