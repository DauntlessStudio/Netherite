import * as path from "@std/path";
import { Logger, sendToDist, sleep } from "../../utils/index.ts";
import { Config } from "../index.ts";
import { Script } from "./script.ts";
import { Module } from "../module.ts";
import { Language } from "./language.ts";
import { CompositeJSON, composites } from "./composite.ts";
import { Project } from "../project.ts";

export class Static {
    private static readonly behaviorPath = path.join(Deno.cwd(), "src/behavior_pack");
    private static readonly resourcePath = path.join(Deno.cwd(), "src/resource_pack");
    private static readonly skinsPath = path.join(Deno.cwd(), "src/skin_pack");
    private static readonly modulePath = path.join(Deno.cwd(), "src/modules");
    private static endWatchCallback: () => void;

    private static readonly specialFiles: Map<string, (filepath: string, event: Deno.FsEvent["kind"]) => void> = new Map([
        ["**/*.lang", Language.watch.bind(Language)],
        ["**/scripts/**/*.ts", Script.watch.bind(Script)],
        ...CompositeJSON.watchMap()
    ]);

    public static async build(watch?: boolean) {
        // Ingest modules first, this allows projects to override module provided defaults
        try {
            for (const entry of Deno.readDirSync(this.modulePath)) {
                if (entry.isDirectory) {
                    for (const subEntry of Deno.readDirSync(path.join(this.modulePath, entry.name))) {
                        const subPath = path.join(this.modulePath, entry.name, subEntry.name);
        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "bp")) {
                            await this.processBehaviorPath(subPath);
                            continue;
                        }
                        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "rp")) {
                            await this.processResourcePath(subPath);
                            continue;
                        }
                        
                        if (subEntry.isDirectory && Module.isInModuleDirectory(subPath, "skin_pack")) {
                            await this.processSkinPath(subPath);
                            continue;
                        }
                    }
                }
            }
        } catch (_error) {
            // Do Nothing
        }

        if (Config.Options.type === "skin-pack") {
            await this.processSkinPath(this.skinsPath);
        } else {
            if (Config.Options.include_skin_pack === true) {
                await this.processSkinPath(this.skinsPath);
            }
            
            await this.processBehaviorPath(this.behaviorPath);
            await this.processResourcePath(this.resourcePath);
        }

        if (watch) {
            this.watch();
        }
    }

    public static endWatch(): void {
        if (this.endWatchCallback) this.endWatchCallback();
    }

    private static async processBehaviorPath(src: string): Promise<void> {
        try {
            await sendToDist(src, Config.Paths.bp.root, ["**/behavior_pack/scripts/", "**/*.ts"]);
        } catch (error) {
            Logger.error(String(error));
        }
    }

    private static async processResourcePath(src: string): Promise<void> {
        try {
            Language.ingestLangFiles(path.join(src, "texts"));
            composites.sound_definitions.ingestDir(path.join(src, "sounds"));
            composites.terrain_texture.ingestDir(path.join(src, "textures"));
            composites.item_texture.ingestDir(path.join(src, "textures"));
            composites.sounds.ingestDir(src);
            composites.blocks.ingestDir(src);
    
            await sendToDist(src, Config.Paths.rp.root, ["**/.lang"]);
        } catch (error) {
            Logger.error(String(error));
        }
    }

    private static async processSkinPath(src: string): Promise<void> {
        try {
            composites.skins.ingestDir(src);
        
            await sendToDist(src, Config.Paths.skins.root, ["**/*.json", "**/*.lang"]);
        } catch (error) {
            Logger.error(String(error));
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
        let debounceHandler: number | undefined;
        const changedPaths = new Set<string>();

        let currentBranchRef = this.getBranchRef() ;

        const sync = (event: Deno.FsEvent) => {
            event.paths.forEach(path => changedPaths.add(path));

            clearTimeout(debounceHandler);
            debounceHandler = setTimeout(() => {
                const newBranchRef = this.getBranchRef();
                
                if (currentBranchRef !== newBranchRef) {
                    Logger.log(`[${Logger.Colors.green("git")}] Detected change from ${currentBranchRef} to ${newBranchRef}. Rebuilding...`);
                    currentBranchRef = newBranchRef;
                    changedPaths.clear();
                    Project.rebuild();
                    return;
                }

                changedPaths.forEach(Static.syncPath.bind(Static));
            }, 200);
        };

        const watcher = Deno.watchFs(path.join(Deno.cwd(), "src"), {recursive: true});
        this.endWatchCallback = () => watcher.close();

        for await (const event of watcher) {
            sync(event);
        }
    }

    private static syncPath(src: string): void {
        let stat: Deno.FileInfo | null = null;
        try {
            stat = Deno.statSync(src);
            if (stat.isDirectory) return;
        } catch (_error) {
            // File doesn't exist
        }

        for (const [file, callback] of this.specialFiles.entries()) {
            if (path.globToRegExp(file).test(src)) {
                callback(src, stat ? "modify" : "remove");
                return;
            }
        }

        const dest = this.getDistFromPath(src);
        if (!dest) return;

        if (stat) {
            try {
                sendToDist(src, dest);
                Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
            } catch (error) {
                Logger.error(`Failed to write ${dest}: ${error}`);
            }
        } else {
            try {
                Deno.removeSync(dest, { recursive: true });
                Logger.log(`[${Logger.Colors.red("remove")}] ${dest}`);
            } catch (_error) {
                // File already removed
            }
        }
    }

    private static getBranchRef(): string {
        try {
            return Deno.readTextFileSync(path.join(Deno.cwd(), ".git", "HEAD")).trim();
        } catch (_error) {
            return "unknown";
        }
    }
}