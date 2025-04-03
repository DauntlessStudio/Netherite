import "@std/dotenv/load";
import { platform } from 'node:process';
import { v4 } from "uuid";
import * as path from "@std/path";
import type { ProjectOptions } from "./project.ts";
import { Buffer } from "node:buffer";
import { Logger } from "../utils/index.ts";
import { WorkerManager } from "./index.ts";
import deno from "../../../deno.json" with {type: "json" };

interface ConfigPaths {
    root: string;
    bp: {
        root: string;
        scripts: string;
    };
    rp: {
        root: string;
    }
    skins: {
        root: string;
    }
}

interface JSRMeta {
    scope: string;
    name: string;
    latest: string;
    versions: {
        [key: string]: unknown
    }
}

export class Config {
    private static options: ProjectOptions;
    private static studioName: string;
    private static packName: string;
    private static meta?: JSRMeta;
    
    public static get Options() : ProjectOptions {
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
    
    public static get InstalledNetheriteVersion() : string {
        return deno.version;
    }
    
    public static get LatestNetheriteVersion() : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (this.meta) {
                resolve(this.meta.latest);
            } else {
                fetch("https://jsr.io/@coldiron/netherite/meta.json").then(response => {
                    response.json().then((data: JSRMeta) => {
                        this.meta = data;
                        resolve(data.latest);
                    });
                }).catch(reject);
            }
        });
    }
    
    public static get BetaNetheriteVersion() : Promise<string> {
        function getBeta(meta: JSRMeta): string {
            const versions = Object.keys(meta.versions).filter((version) => version.includes("beta"));
            if (versions.length === 0) {
                throw new Error("No beta version found in meta.json");
            }
            return versions[0];
        }

        return new Promise<string>((resolve, reject) => {
            if (this.meta) {
                resolve(getBeta(this.meta));
            } else {
                fetch("https://jsr.io/@coldiron/netherite/meta.json").then(response => {
                    response.json().then((data: JSRMeta) => {
                        this.meta = data;
                        resolve(getBeta(this.meta));
                    });
                }).catch(reject);
            }
        });
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
        const skinRoot = "./dist/Content/skin_pack";

        return {
            root,
            bp: {
                root: bpRoot,
                scripts: bpRoot + "scripts/",
            },
            rp: {
                root: rpRoot,
            },
            skins: {
                root: skinRoot,
            },
        }
    }
    
    public static setOptions(options: ProjectOptions): void {
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
            Deno.statSync(path.join(Deno.cwd(), "netherite.config.ts"));
        } catch (_error) {
            throw new Error("No config file found in the root of your project, please create a netherite.config.ts file.");
        }
        
        try {
            const value = await WorkerManager.run<ProjectOptions>(path.join(Deno.cwd(), "netherite.config.ts"));
            this.setOptions(value[0].response);
        } catch (error) {
            throw new Error("Failed to ingest netherite.config.ts due to " + error);
        }
    }

    public static async getUUID(category: string): Promise<string> {
        const hash = await crypto.subtle.digest("SHA-256", Buffer.from(category + Config.Options.uuid));
        return v4({rng: () => new Uint8Array(Buffer.from(hash, 0, 16))});
    }
}