import * as path from "jsr:@std/path";

export function emptyDirectorySync(dir: string): void {
    for (const entry of Deno.readDirSync(dir)) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory) {
            emptyDirectorySync(entryPath);
            Deno.removeSync(entryPath);
        }
    }
}