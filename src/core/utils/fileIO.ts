import * as path from "jsr:@std/path";
import { Config } from "../classes/config.ts";

export function emptyDirectorySync(dir: string): void {
    try {
        for (const entry of Deno.readDirSync(dir)) {
            const entryPath = path.join(dir, entry.name);
            Deno.removeSync(entryPath, {recursive: true});
        }
    } catch (_error) {
        // Directory doesn't exist, no need to empty it
    }
}

export function copyDirSync(src: string, dest: string): void {
    const stat = Deno.statSync(src);
    
    if (stat.isDirectory) {
        Deno.mkdirSync(dest, {recursive: true});
        for (const entry of Deno.readDirSync(src)) {
            copyDirSync(path.join(src, entry.name), path.join(dest, entry.name));
        }
    } else {
        Deno.copyFileSync(src, dest);
    }
}

export function sendToDist(src: string, dest: string, excludeGlob: string[] = []): void {
    const stat = Deno.statSync(src);

    if (excludeGlob.some(glob => path.globToRegExp(glob).test(src))) {
        return;
    }
    
    if (stat.isDirectory) {
        Deno.mkdirSync(dest, {recursive: true});
        for (const entry of Deno.readDirSync(src)) {
            sendToDist(path.join(src, entry.name), path.join(dest, entry.name), excludeGlob);
        }
    } else {
        if (isTextFile(src)) {
            const content = Deno.readTextFileSync(src);
            writeTextToDist(dest, content);
        } else {
            Deno.copyFileSync(src, dest);
        }
    }
}

export function writeBufferToDist(dest: string, content: Uint8Array): void {
    Deno.mkdirSync(path.dirname(dest), {recursive: true});

    if (isTextFile(dest)) {
        writeTextToDist(dest, new TextDecoder().decode(content));
    } else {
        Deno.writeFileSync(dest, content);
    }
}

export function writeTextToDist(dest: string, content: string, overwrite: boolean = true): void {
    Deno.mkdirSync(path.dirname(dest), {recursive: true});
    
    const modifiedContent = content
    .replace(/FORMATVERSION/g, Config.Options.formatVersion)
    .replace(/NAMESPACE/g, Config.Options.namespace)
    .replace(/VERSION/g, Config.Options.version)
    .replace(/AUTHOR/g, Config.Options.author)
    .replace(/NAME/g, Config.Options.name)
    
    try {
        Deno.writeTextFileSync(dest, modifiedContent, {createNew: !overwrite});
    } catch (_error) {
        // File already exists and overwrite is false
    }
}

export function isTextFile(filename: string): boolean {
    const textFileExtensions = [".ts", ".js", ".json", ".txt", ".md", ".lang"];
    return textFileExtensions.some(ext => filename.endsWith(ext));
}

export function replaceTextInFile(filepath: string, replacements: Record<string, string>): void {
    try {
        const content = Deno.readTextFileSync(filepath);

        const modifiedContent = Object.entries(replacements).reduce((acc, [key, value]) => {
            return acc.replace(new RegExp(key, "g"), value);
        }, content);
        
        Deno.writeTextFileSync(filepath, modifiedContent);
    } catch (error) {
        console.error(`Error replacing text in file: ${error}`);
    }
}