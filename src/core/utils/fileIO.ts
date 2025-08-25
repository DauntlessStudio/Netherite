import * as path from "@std/path";
import { Config } from "../classes/config.ts";
import { keywordReplacer } from "./index.ts";
import { attemptRepeater } from "./error.ts";

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

    dest = dest.replace("PATH", path.join(Config.StudioName, Config.PackName));
    
    if (stat.isDirectory) {
        Deno.mkdirSync(dest, {recursive: true});

        for (const entry of Deno.readDirSync(src)) {
            sendToDist(path.join(src, entry.name), path.join(dest, entry.name), excludeGlob);

            if (!Deno.readDirSync(dest).toArray().length) {
                Deno.removeSync(dest);
            }
        }
    } else {
        attemptRepeater(() => {
            if (isTextFile(src)) {
                const content = Deno.readTextFileSync(src);
                writeTextToDist(dest, content);
            } else {
                const content = Deno.readFileSync(src);
                writeBufferToDist(dest, content);
            }
        });
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
    
    const modifiedContent = keywordReplacer(content, Config.Options);
    
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

// deno-lint-ignore no-explicit-any
export function JSONCParse(...args: Parameters<JSON["parse"]>): any {
    args[0] = args[0]
        .replace(/(^|[ \t])\/\/.*(?=[\n\r])/gm, "$1")
        .replace(/\/\*[\s\S]*?\*\//g, "");
    return JSON.parse.apply(JSON, args);
}