import * as path from "jsr:@std/path";
import { Config } from "./config.ts";

export function buildStaticFiles(): void {
    const behaviorPackPath = path.join(Deno.cwd(), "src/behavior_pack");
    const behaviorPackDest = path.join(Deno.cwd(), Config.Paths.bp.root);
    Deno.mkdirSync(behaviorPackDest, {recursive: true});
    copyDirectoryRecursive(behaviorPackPath, behaviorPackDest, ["*.ts", "manifest.json"]);

    const resourcePackPath = path.join(Deno.cwd(), "src/resource_pack");
    const resourcePackDest = path.join(Deno.cwd(), Config.Paths.rp.root);
    Deno.mkdirSync(resourcePackDest, {recursive: true});
    copyDirectoryRecursive(resourcePackPath, resourcePackDest, ["manifest.json"]);
}

function copyDirectoryRecursive(src: string, dest: string, excludeGlob: string[] = []): void {
    for (const entry of Deno.readDirSync(src)) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (excludeGlob.some(glob => path.globToRegExp(glob).test(entry.name))) {
            continue;
        }

        if (entry.isDirectory) {
            Deno.mkdirSync(destPath, {recursive: true});
            copyDirectoryRecursive(srcPath, destPath);
        } else {
            if (isTextFile(entry.name)) {
                const content = Deno.readTextFileSync(srcPath);
                const modifiedContent = content.replace(/NAMESPACE/g, Config.Options.projectNamespace);
                Deno.writeTextFileSync(destPath, modifiedContent);
            } else {
                Deno.copyFileSync(srcPath, destPath);
            }
        }
    }
}

function isTextFile(filename: string): boolean {
    const textFileExtensions = [".ts", ".json", ".txt", ".md", ".lang"];
    return textFileExtensions.some(ext => filename.endsWith(ext));
}