import * as path from "@std/path";
import { Logger, sendToDist, sleep } from "../utils/index.ts";
import { Config, Language } from "./index.ts";
import { Texture } from "./texture.ts";
import { Module } from "./module.ts";
import { Script } from "./script.ts";
import { Sound } from "./sound.ts";
import { Block } from "./block.ts";
import { Skin } from "./skin.ts";

export class Static {
    private static readonly behaviorPath = path.join(Deno.cwd(), "src/behavior_pack");
    private static readonly resourcePath = path.join(Deno.cwd(), "src/resource_pack");
    private static readonly skinsPath = path.join(Deno.cwd(), "src/skin_pack");
    private static readonly modulePath = path.join(Deno.cwd(), "src/modules");

    private static readonly pendingChanges: Map<string, boolean> = new Map();

    private static readonly specialFiles: Map<string, (file: string) => void> = new Map([
        ["**/skins.json", Skin.watch.bind(Skin)],
        ["**/sounds.json", Sound.watch.bind(Sound)],
        ["**/blocks.json", Block.watch.bind(Block)],
        ["**/*.lang", Language.watch.bind(Language)],
        ["**/scripts/**/*.ts", Script.watch.bind(Script)],
        ["**/textures/*.json", Texture.watch.bind(Texture)],
        ["**/sounds/sound_definitions.json", Sound.watch.bind(Sound)],
    ]);

    public static build(watch?: boolean) {
        if (Config.Options.type === "skin-pack") {
            this.processSkinPath(this.skinsPath);
        } else {
            if (Config.Options.include_skin_pack === true) {
                this.processSkinPath(this.skinsPath);
            }
            
            this.processBehaviorPath(this.behaviorPath);
            this.processResourcePath(this.resourcePath);
        }

        try {
            for (const entry of Deno.readDirSync(this.modulePath)) {
                if (entry.isDirectory) {
                    for (const subEntry of Deno.readDirSync(path.join(this.modulePath, entry.name))) {
                        const subPath = path.join(this.modulePath, entry.name, subEntry.name);
        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "bp")) {
                            this.processBehaviorPath(subPath);
                            continue;
                        }
                        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "rp")) {
                            this.processResourcePath(subPath);
                            continue;
                        }
                        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "skin_pack")) {
                            this.processSkinPath(subPath);
                            continue;
                        }
                    }
                }
            }
        } catch (_error) {
            // Do Nothing
        }

        if (watch) {
            this.watch();
        }
    }

    private static processBehaviorPath(src: string): void {
        try {
            sendToDist(src, Config.Paths.bp.root, ["**/*.ts"]);
        } catch (_error) {
            // Do Nothing
        }
    }

    private static processResourcePath(src: string): void {
        try {
            Texture.ingestTextureFiles(path.join(src, "textures"));
            Language.ingestLangFiles(path.join(src, "texts"));
            Sound.ingestSoundFiles(path.join(src, "sounds"));
            Block.ingestBlockFiles(src);
            Sound.ingestSoundFiles(src);
    
            sendToDist(src, Config.Paths.rp.root, ["**/.lang"]);
        } catch (_error) {
            // Do Nothing
        }
    }

    private static processSkinPath(src: string): void {
        try {
            Skin.ingestSkinFiles(src);
        
            sendToDist(src, Config.Paths.skins.root, ["**/*.json", "**/*.lang"]);
        } catch (_error) {
            // Do Nothing
        }
    }

    public static getDistFromPath(src: string): string|undefined {
        src = path.resolve(src);

        if (src.startsWith(this.behaviorPath)) {
            src = src.replace(this.behaviorPath, "");
            return path.resolve(path.join(Config.Paths.bp.root, src));
        }

        if (src.startsWith(this.resourcePath)) {
            src = src.replace(this.resourcePath, "");
            return path.resolve(path.join(Config.Paths.rp.root, src));
        }

        if (Module.isInModuleDirectory(src, "bp")) {
            src = src.replace(this.modulePath, "");
            const segments = src.split(path.SEPARATOR_PATTERN).filter(Boolean);
            return path.resolve(path.join(Config.Paths.bp.root, ...segments.slice(2)));
        }

        if (Module.isInModuleDirectory(src, "rp")) {
            src = src.replace(this.modulePath, "");
            const segments = src.split(path.SEPARATOR_PATTERN).filter(Boolean);
            return path.resolve(path.join(Config.Paths.rp.root, ...segments.slice(2)));
        }
    }

    private static async watch(): Promise<void> {
        const sync = (event: Deno.FsEvent) => {
            const src = event.paths[0];
            
            if (!this.canWrite(src)) return;

            try {
                const stat = Deno.statSync(src);
                if (stat.isDirectory) return;
            } catch (_error) {
                // Do Nothing
            }
            
            for (const [file, callback] of this.specialFiles.entries()) {
                if (path.globToRegExp(file).test(src)) {
                    callback(src);
                    return;
                }
            }

            const dest = this.getDistFromPath(src);
            if (!dest) return;

            switch (event.kind) {
                case "create": {
                    sendToDist(src, dest);
                    Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
                    break;
                }
                case "modify": {
                    sendToDist(src, dest);
                    Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
                    break;
                }
                case "rename": {
                    sendToDist(src, dest);
                    Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
                    break;
                }
                case "remove": {
                    Deno.removeSync(dest, {recursive: true});
                    Logger.log(`[${Logger.Colors.red("remove")}] ${dest}`);
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