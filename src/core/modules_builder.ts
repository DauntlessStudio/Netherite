import * as path from "jsr:@std/path";

export async function buildModules(): Promise<void> {
    const modulesDir = path.join(Deno.cwd(), "src/modules");
    await traverseDirectory(modulesDir);
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