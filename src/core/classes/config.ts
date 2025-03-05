import "jsr:@std/dotenv/load";
import { platform } from 'node:process';
import { v4 } from "npm:uuid";
import * as path from "jsr:@std/path";
import type { ProjectBuilderOptions } from "./project.ts";
import { Buffer } from "node:buffer";
import { Logger } from "../utils/index.ts";

export interface ConfigOptions extends ProjectBuilderOptions {
    uuid: string;
    version: `${number}.${number}.${number}`;
}

interface ConfigPaths {
    root: string;
    bp: {
        root: string;
        scripts: string;
    };
    rp: {
        root: string;
    }
}

export class Config {
    private static options: ConfigOptions;
    private static studioName: string;
    private static packName: string;
    private static readonly templatePath = path.join(path.fromFileUrl(Deno.mainModule), "../..", "templates");
    
    public static get Options() : ConfigOptions {
        if (!this.options) {
            Logger.error("No config options set, is your netherite.config.ts file missing?");
            Deno.exit(1);
        }

        return this.options;
    }
    
    public static get StudioName() : string {
        if (!this.options) {
            Logger.error("No config options set, is your netherite.config.ts file missing?");
            Deno.exit(1);
        }

        return this.studioName;
    }
    
    public static get PackName() : string {
        if (!this.options) {
            Logger.error("No config options set, is your netherite.config.ts file missing?");
            Deno.exit(1);
        }

        return this.packName;
    }
    
    public static get MojangDirectory() : string {
        const APPDATA = (Deno.env.get("LOCALAPPDATA") || (platform == 'darwin' ? Deno.env.get("HOME") + '/Library/Preferences' : Deno.env.get("HOME") + "/.local/share")).replace(/\\/g, '/');
        return `${APPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang`;
    }

    public static get HomeDirectory() : string {
        const home = (Deno.env.get("USERPROFILE") ?? Deno.env.get("HOME") ?? "").replace(/\\/g, '/');
        return home;
    }

    public static get NetheriteDirectory() : string {
        return path.join(this.HomeDirectory, ".netherite");
    }

    public static get DownloadDirectory() : string {
        return path.join(this.HomeDirectory, "Downloads");
    }

    public static get Paths(): ConfigPaths {
        const root = this.Options.type === "world" ? "./dist/Content/world_template/" : "./dist/Content/";
        const bpRoot = root + "behavior_packs/" + this.Options.namespace + "_bp/";
        const rpRoot = root + "resource_packs/" + this.Options.namespace + "_rp/";

        return {
            root,
            bp: {
                root: bpRoot,
                scripts: bpRoot + "scripts/",
            },
            rp: {
                root: rpRoot,
            }
        }
    }
    
    public static setOptions(options: ConfigOptions): void {
        this.options = Object.freeze(options);

        const namespaceParts = this.Options.namespace.split("_");

        if (namespaceParts.length !== 2) {
            Logger.error("Namespace must be in the format of 'author_name'");
            Deno.exit(1);
        }

        this.studioName = namespaceParts[0];
        this.packName = namespaceParts[1];
    }

    public static async ingestConfig(): Promise<void> {
        try {
            const url = new URL("file://" + path.join(Deno.cwd(), "netherite.config.ts"));
            await import(url.toString());
        } catch (_error) {
            Logger.error("No config file found in the root of your project, please create a netherite.config.ts file.");
        }
    }

    public static async getUUID(category: string): Promise<string> {
        const hash = await crypto.subtle.digest("SHA-256", Buffer.from(category + Config.Options.uuid));
        return v4({rng: () => new Uint8Array(Buffer.from(hash, 0, 16))});
    }

    public static getTemplateFile(file: string): string {
        return path.join(this.templatePath, file);
    }
}