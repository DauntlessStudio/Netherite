import * as path from "@std/path";
import { debounce } from "@std/async/debounce";
import { writeBufferToDist } from "../utils/fileIO.ts";
import { WorkerManager, type WorkerWriteable, type ProjectOptions, composites } from "./index.ts";
import { Config } from "./config.ts";
import { Logger } from "../utils/index.ts";

export interface ModuleResponse {
    name: string;
    data: number[];
}

export interface ModuleWriteable extends WorkerWriteable<ProjectOptions, ModuleResponse> {}

interface WriteData {
    outputPath: string;
    content: number[];
}

type ModuleSubdirectory = "bp"|"rp"|"skin_pack"|"root";

export class Module {
    private static readonly moduleDir: string = path.join(Deno.cwd(), "src/modules");
    private static readonly queue: Map<string, Map<string, number[]>> = new Map();
    private static endWatchCallback: () => void;

    public static async build(watch?: boolean): Promise<void> {
        try {
            Deno.statSync(this.moduleDir);
        } catch (_error) {
            return;
        }

        await this.iterate(async (filepath: string) => {
            if (filepath.endsWith(".mod.ts")) {
                await this.process(filepath, true);
            }
        });

        if (watch) {
            this.watch();
        }
    }

    public static endWatch(): void {
        if (this.endWatchCallback) this.endWatchCallback();
        this.queue.clear();
    }

    public static async iterate(callback: (filepath: string) => Promise<void>): Promise<void> {
        const iterator = async (dirpath: string) => {
            dirpath = dirpath ?? this.moduleDir;

            for (const dirEntry of Deno.readDirSync(dirpath)) {
                const entryPath = path.join(dirpath, dirEntry.name);
    
                if (dirEntry.isDirectory) {
                    await iterator(path.join(dirpath, dirEntry.name));
                } else if (dirEntry.isFile) {
                    await callback(entryPath);
                }
            }
        }

        await iterator(this.moduleDir);
    }

    public static isInModuleDirectory(directory: string, subdirectory: ModuleSubdirectory): boolean {
        const absoluteModuleDir = path.isAbsolute(this.moduleDir) ? this.moduleDir : path.resolve(Deno.cwd(), this.moduleDir);
        const absoluteDirectory = path.isAbsolute(directory) ? directory : path.resolve(Deno.cwd(), directory);
    
        if (!absoluteDirectory.startsWith(absoluteModuleDir)) {
            return false;
        }
    
        const directorySegments = absoluteDirectory.replace(absoluteModuleDir, "").split(path.SEPARATOR_PATTERN).filter(Boolean);
    
        return RegExp(subdirectory, "i").test(directorySegments.at(1) ?? "") || absoluteDirectory === absoluteModuleDir;
    }

    private static async watch(): Promise<void> {
        const ingest = debounce(async (event: Deno.FsEvent) => {
            if (!event.paths[0].endsWith(".mod.ts")) return;

            switch (event.kind) {
                case "modify": {
                    try {
                        await this.process(event.paths[0]);
                    } catch (e) {
                        console.error(`Error loading module: ${event.paths[0]}`);
                        console.error(e);
                    }
                    break;
                }
                case "remove": {
                    const cache = this.queue.get(event.paths[0]);

                    if (cache) {
                        for (const file of cache.keys()) {
                            Deno.removeSync(file);
                        }

                        this.queue.delete(event.paths[0]);
                    }
                    break;
                }
                case "rename": {
                    const cache = this.queue.get(event.paths[0]);

                    if (cache && event.paths[1]) {
                        this.queue.delete(event.paths[0]);
                        this.queue.set(event.paths[1], cache);
                    }
                    break;
                }
                default: return;                    
            }
        }, 200);

        const watcher = Deno.watchFs(this.moduleDir);
        this.endWatchCallback = () => watcher.close();

        for await (const event of watcher) {
            ingest(event);
        }
    }

    private static async process(file: string, silent?: boolean): Promise<void> {
        if (!file.endsWith(".mod.ts")) return;

        try {
            const stat = Deno.statSync(file);
            if (stat.isDirectory) return;
        } catch (_error) {
            // Do Nothing
        }

        try {
            const result = await WorkerManager.run<ModuleResponse>(file, Config.Options);

            if (result.length > 0) {
                if (!this.queue.has(file)) {
                    this.queue.set(file, new Map());
                }

                const cachedFiles = this.queue.get(file)?.keys().toArray() ?? [];

                for (const {endpoint, response} of result) {
                    const entry: WriteData = {
                        outputPath: endpoint.replace("BP", Config.Paths.bp.root).replace("RP", Config.Paths.rp.root),
                        content: response.data,
                    };

                    if (entry) {
                        this.queue.get(file)?.set(entry.outputPath, entry.content);

                        if (cachedFiles.includes(entry.outputPath)) {
                            cachedFiles.splice(cachedFiles.indexOf(entry.outputPath), 1);
                        }
                    }
                }

                for (const cachedFile of cachedFiles) {
                    Deno.removeSync(cachedFile);
                    this.queue.get(file)?.delete(cachedFile);
                    if (!silent) Logger.log(`[${Logger.Colors.red("remove")}] ${path.resolve(cachedFile)}`);
                }
            }
        } catch (error) {
            Logger.error(`Error processing module: ${file}`);
            Logger.error(String(error));
        }

        const modifiedComposites = new Set<keyof typeof composites>();

        for (const module of this.queue.values()) {
            for (const [key, data] of module) {
                if (key in composites) {
                    const compositeKey = key as keyof typeof composites;
                    modifiedComposites.add(compositeKey);
                    composites[compositeKey].ingestData(JSON.parse(new TextDecoder().decode(new Uint8Array(data))));
                }

                writeBufferToDist(key, new Uint8Array(data));
                if (!silent) Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(key)}`);
            }
        }

        modifiedComposites.forEach(mod => composites[mod].build());
    }
}