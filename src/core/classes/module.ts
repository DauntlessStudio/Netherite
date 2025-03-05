import * as path from "jsr:@std/path";
import { debounce } from "jsr:@std/async/debounce";
import { writeBufferToDist } from "../utils/fileIO.ts";

export interface ModuleWriteable {
    generate(): {outputPath: string, content: Uint8Array};
}

type ModuleSubdirectory = "bp"|"rp"|"skin_pack"|"root";

export class Module {
    private static queue: ModuleWriteable[] = [];
    private static readonly moduleDir: string = path.join(Deno.cwd(), "src/modules");

    public static register(module: ModuleWriteable): void {
        this.queue.push(module);
    }

    public static async build(watch?: boolean): Promise<void> {
        try {
            Deno.statSync(this.moduleDir);
        } catch (_error) {
            return;
        }

        await this.iterate(async (filepath: string) => {
            if (filepath.endsWith(".mod.ts")) {
                await this.process(filepath);
            }
        });

        if (watch) {
            this.watch();
        }
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
            if (event.kind === "modify" && event.paths[0].endsWith(".mod.ts")) {
                try {
                    console.log("[%s] %s", event.kind, event.paths[0]);
                    await this.process(event.paths[0]);
                } catch (e) {
                    console.error(`Error loading module: ${event.paths[0]}`);
                    console.error(e);
                }
            }
        }, 200);

        const watcher = Deno.watchFs(this.moduleDir);

        for await (const event of watcher) {
            ingest(event);
        }
    }

    private static async process(path: string): Promise<void> {
        if (!path.endsWith(".mod.ts")) return;

        const url = new URL("file://" + path + "?version=" + Date.now());

        try {
            await import(url.toString());
        } catch (error) {
            throw error;
        }

        for (const module of this.queue) {
            const { outputPath, content } = module.generate();
            writeBufferToDist(outputPath, content);
        }

        this.queue = [];
    }
}