import * as path from "jsr:@std/path";
import { debounce } from "jsr:@std/async/debounce";

export async function buildModules(watch?: boolean): Promise<void> {
    const modulesDir = path.join(Deno.cwd(), "src/modules");
    await traverseDirectory(modulesDir);

    if (watch) {
        watchModules();
    }
}

async function traverseDirectory(dir: string): Promise<void> {
    for await (const dirEntry of Deno.readDir(dir)) {
        const entryPath = path.join(dir, dirEntry.name);
        if (dirEntry.isDirectory) {
            await traverseDirectory(entryPath);
        } else if (dirEntry.isFile && dirEntry.name.endsWith(".mod.ts")) {
            const url = new URL("file://" + entryPath);
            await import(url.toString());
        }
    }
}


// TODO: In the future when modules are generating output files, register the output files with their source .mod.ts files to track dependency relationships
async function watchModules(): Promise<void> {
    const modulesDir = path.join(Deno.cwd(), "src/modules");
    const ingest = debounce(async (event: Deno.FsEvent) => {
        if (event.kind === "modify" && event.paths[0].endsWith(".mod.ts")) {
            const url = new URL("file://" + event.paths[0] + "?version=" + Date.now());
            
            try {
                await import(url.toString());
                console.log("[%s] %s", event.kind, event.paths[0]);
            } catch (e) {
                console.error(`Error loading module: ${event.paths[0]}`);
                console.error(e);
            }
        }
    }, 200);

    const watcher = Deno.watchFs(modulesDir);

    for await (const event of watcher) {
        ingest(event);
    }
}