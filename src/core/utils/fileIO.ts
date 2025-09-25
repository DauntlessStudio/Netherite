import * as path from "@std/path";
import { Config } from "../classes/config.ts";
import { keywordReplacer } from "./index.ts";
import { attemptRepeater } from "./error.ts";
import { Logger } from "./logger.ts";

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

export async function sendToDist(src: string, dest: string, excludeGlob: string[] = []): Promise<void> {
    if (excludeGlob.some(glob => path.globToRegExp(glob).test(src))) {
        return;
    }
    
    dest = dest.replace("PATH", path.join(Config.StudioName, Config.PackName));
    const stat = Deno.statSync(src);
    
    if (stat.isDirectory) {
        Deno.mkdirSync(dest, {recursive: true});

        for (const entry of Deno.readDirSync(src)) {
            try {
                sendToDist(path.join(src, entry.name), path.join(dest, entry.name), excludeGlob);

                if (!Deno.readDirSync(dest).toArray().length) {
                    Deno.removeSync(dest);
                }
            } catch (error) {
                Logger.warn(String(error));
            }
        }
    } else {
        await attemptRepeater(() => {
            const content = Deno.readFileSync(src);
            writeBufferToDist(dest, content);
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

export function writeBufferToSrc(dest: string, content: Uint8Array, overwrite: boolean = true): void {
    Deno.mkdirSync(path.dirname(dest), {recursive: true});

    if (isTextFile(dest)) {
        writeTextToSrc(dest, new TextDecoder().decode(content), overwrite);
    } else {
        try {
            Deno.writeFileSync(dest, content, {createNew: !overwrite});
            Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
        } catch (_error) {
            Logger.warn(`${dest} already exists and overwrite is false`);
        }
    }
}

export function writeTextToSrc(dest: string, content: string, overwrite: boolean = true): void {
    Deno.mkdirSync(path.dirname(dest), {recursive: true});
    
    try {
        Deno.writeTextFileSync(dest, content, {createNew: !overwrite});
        Logger.log(`[${Logger.Colors.green("write")}] ${dest}`);
    } catch (_error) {
        Logger.warn(`${dest} already exists and overwrite is false`);
    }
}

export function isTextFile(filename: string): boolean {
    const textFileExtensions = [".ts", ".js", ".json", ".txt", ".md", ".lang", ".mcfunction"];
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