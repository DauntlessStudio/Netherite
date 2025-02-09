import { v4 } from "npm:uuid";
import * as path from "jsr:@std/path";
import type { ProjectBuilderOptions } from "./project_initializer.ts";
import { Buffer } from "node:buffer";

export interface ConfigOptions extends ProjectBuilderOptions {
    uuid: string;
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
    private static readonly templatePath = path.join(path.fromFileUrl(Deno.mainModule), "../..", "templates");
    
    public static get Options() : ConfigOptions {
        if (!this.options) {
            console.log("No config options set, is your netherite.config.ts file missing?");
            Deno.exit(1);
        }

        return Object.freeze(this.options);
    }

    public static get Paths(): ConfigPaths {
        const root = this.Options.projectType === "world" ? "./dist/Content/world_template/" : "./dist/Content/";
        const bpRoot = root + "behavior_packs/" + this.Options.projectNamespace + "_bp/";
        const rpRoot = root + "resource_packs/" + this.Options.projectNamespace + "_rp/";

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
        this.options = options;
    }

    public static async ingestConfig(): Promise<void> {
        try {
            const url = new URL("file://" + path.join(Deno.cwd(), "netherite.config.ts"));
            await import(url.toString());
        } catch (_error) {
            console.error("No config file found in the root of your project, please create a netherite.config.ts file.");
        }
    }

    public static async getUUID(category: string): Promise<string> {
        const hash = await crypto.subtle.digest("SHA-256", Buffer.from(category + Config.Options.uuid));
        return v4({rng: () => Buffer.from(hash, 0, 16)});
    }

    public static getTemplateFile(file: string): string {
        return path.join(this.templatePath, file);
    }
}