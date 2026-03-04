import * as path from "@std/path";
import { writeBufferToDist } from "../utils/fileIO.ts";
import { ModuleManager, type WriteableModule, type ProjectOptions, composites } from "./index.ts";
import { Config } from "./config.ts";
import { Logger } from "../utils/index.ts";

export interface ModuleResponse {
    name: string;
    data: number[];
}

export interface ModuleWriteable extends WriteableModule<ProjectOptions, ModuleResponse> {}

interface WriteData {
    outputPath: string;
    content: number[];
}

export class Module {
    private static readonly srcDir: string = path.join(Deno.cwd(), "src");
    private static readonly filemap: Map<string, Map<string, number[]>> = new Map();
    private static endWatchCallback: () => void;

    public static async build(): Promise<void> {
        try {
            Deno.statSync(this.srcDir);
        } catch (_error) {
            return;
        }

        await this.iterate(async (filepath: string) => {
            if (filepath.endsWith(".mod.ts")) {
                await this.process(filepath, true);
            }
        });
    }

    public static endWatch(): void {
        if (this.endWatchCallback) this.endWatchCallback();
        this.filemap.clear();
    }

    public static async iterate(callback: (filepath: string) => Promise<void>): Promise<void> {
        const iterator = async (dirpath: string) => {
            dirpath = dirpath ?? this.srcDir;

            for (const dirEntry of Deno.readDirSync(dirpath)) {
                const entryPath = path.join(dirpath, dirEntry.name);
    
                if (dirEntry.isDirectory) {
                    await iterator(path.join(dirpath, dirEntry.name));
                } else if (dirEntry.isFile) {
                    await callback(entryPath);
                }
            }
        }

        await iterator(this.srcDir);
    }

    public static async watch(filepath: string, event: Deno.FsEvent["kind"]): Promise<void> {
        switch (event) {
                case "modify": {
                    try {
                        await this.process(filepath);
                    } catch (e) {
                        console.error(`Error loading module: ${filepath}`);
                        console.error(e);
                    }
                    break;
                }
                case "remove": {
                    this.remove(filepath);
                    break;
                }
                default: return;
        }
    }

    private static async process(filepath: string, silent?: boolean): Promise<void> {
        if (!filepath.endsWith(".mod.ts")) return;

        try {
            const stat = Deno.statSync(filepath);
            if (stat.isDirectory) return;
        } catch (_error) {
            // Do Nothing
        }

        try {
            // Run module file
            const result = await ModuleManager.run<ModuleResponse>(filepath, Config.Options);
            if (!silent) Logger.log(`[${Logger.Colors.brightGreen("mode write")}] ${filepath}`);

            // Create new filemap entry if needed
            if (!this.filemap.has(filepath)) {
                this.filemap.set(filepath, new Map());
            }

            // Create cache of currently mapped output files
            const cachedFiles = this.filemap.get(filepath)?.keys().toArray() ?? [];

            // Prepare composites for writing
            const modifiedComposites = new Set<keyof typeof composites>();

            // Iterate through responses
            for (const { endpoint, response } of result) {
                // Add entry to filemap
                const entry: WriteData = {
                    outputPath: endpoint.replace("BP", Config.Paths.bp.root).replace("RP", Config.Paths.rp.root),
                    content: response.data,
                };
                this.filemap.get(filepath)?.set(entry.outputPath, entry.content);

                // If output is a composite add it to list, otherwise write file
                if (entry.outputPath in composites) {
                    const compositeKey = entry.outputPath as keyof typeof composites;
                    modifiedComposites.add(compositeKey);
                    composites[compositeKey].ingestData(JSON.parse(new TextDecoder().decode(new Uint8Array(entry.content))));
                } else {
                    writeBufferToDist(entry.outputPath, new Uint8Array(entry.content));
                    if (!silent) Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(entry.outputPath)}`);
                }

                // Remove any outputs from cache list
                if (cachedFiles.includes(entry.outputPath)) {
                    cachedFiles.splice(cachedFiles.indexOf(entry.outputPath), 1);
                }
            }

            // Update composite files
            modifiedComposites.forEach(mod => {
                composites[mod].build();
                if (!silent) Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(composites[mod].OutPath)}`);
            });

            // Delete cached files
            for (const cachedFile of cachedFiles) {
                Deno.removeSync(cachedFile);
                this.filemap.get(filepath)?.delete(cachedFile);
                if (!silent) Logger.log(`[${Logger.Colors.red("remove")}] ${path.resolve(cachedFile)}`);

                // TODO: handled removed composite entries?
            }
        } catch (error) {
            Logger.error(`Cannot run "${filepath}". [${error}]`);
        }
    }

    private static remove(filepath: string, silent?: boolean): void {
        if (!silent) Logger.log(`[${Logger.Colors.brightRed("mode remove")}] "${filepath}"`);
        const cache = this.filemap.get(filepath);

        if (cache) {
            for (const file of cache.keys()) {
                Deno.removeSync(file);
                if (!silent) Logger.log(`[${Logger.Colors.red("remove")}] ${path.resolve(file)}`);
            }

            this.filemap.delete(filepath);
        }
    }
}