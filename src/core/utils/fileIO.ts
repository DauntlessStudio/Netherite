import * as path from "@std/path";
import { Config } from "../classes/config.ts";
import { keywordReplacer, Logger } from "./index.ts";
import { attemptRepeater } from "./error.ts";

interface DistDirectoryMapEntry {
    destDirGlob: RegExp;
    replaceGlob: RegExp;
    vanillaGlob?: RegExp;
    destDir: () => string;
}

const distDirectoryMap: DistDirectoryMapEntry[] = [
    {
        destDirGlob: path.globToRegExp("**/resource_packs/**/textures/**/"),
        vanillaGlob: path.globToRegExp("**/resource_packs/**/textures/vanilla/**"),
        replaceGlob: /dist.+textures/,
        destDir: () => path.join(Config.Paths.rp.root, "textures"),
    },
    {
        destDirGlob: path.globToRegExp("**/behavior_packs/**/loot_tables/**/"),
        vanillaGlob: path.globToRegExp("**/behavior_packs/**/loot_tables/vanilla/**"),
        replaceGlob: /dist.+loot_tables/,
        destDir: () => path.join(Config.Paths.bp.root, "loot_tables"),
    },
    {
        destDirGlob: path.globToRegExp("**/behavior_packs/**/trading/**/"),
        vanillaGlob: path.globToRegExp("**/behavior_packs/**/trading/vanilla/**"),
        replaceGlob: /dist.+trading/,
        destDir: () => path.join(Config.Paths.bp.root, "trading"),
    },
    {
        destDirGlob: path.globToRegExp("**/behavior_packs/**/sounds/**/"),
        vanillaGlob: path.globToRegExp("**/behavior_packs/**/sounds/vanilla/**"),
        replaceGlob: /dist.+sounds/,
        destDir: () => path.join(Config.Paths.bp.root, "sounds"),
    },
    {
        destDirGlob: path.globToRegExp("**/behavior_packs/**/functions/**/"),
        replaceGlob: /dist.+functions/,
        destDir: () => path.join(Config.Paths.bp.root, "functions"),
    }
];

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

            if (!Deno.readDirSync(dest).toArray().length) {
                Deno.removeSync(dest);
            }
        }
    } else {
        for (const element of distDirectoryMap) {
            if (element.destDirGlob.test(dest)) {
                if (element.vanillaGlob?.test(dest)) {
                    dest = dest.replace(new RegExp("vanilla" + path.SEPARATOR_PATTERN.source), "");
                    dest = dest.replace(element.replaceGlob, element.destDir());
                    Deno.mkdirSync(path.dirname(dest), {recursive: true});
                } else {
                    dest = dest.replace(element.replaceGlob, path.join(element.destDir(), Config.StudioName, Config.PackName));
                    Deno.mkdirSync(path.dirname(dest), {recursive: true});
                }
                break;
            }
        }

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
        .replace(/\/\/.*(?=[\n\r])/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
    return JSON.parse.apply(JSON, args);
}