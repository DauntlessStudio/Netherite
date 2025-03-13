import * as path from "@std/path";
import type * as types from "../../api/types/index.d.ts";
import { Config } from "./config.ts";
import { writeTextToDist } from "../utils/fileIO.ts";

export class Manifest {
    public static get BehaviorManifest() : Promise<types.Manifest> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<types.Manifest>(async resolve => {
            const manifest: types.Manifest = {
                format_version: 2,
                header: {
                    name: "pack.name",
                    description: "pack.description",
                    uuid: await Config.getUUID("behavior"),
                    pack_scope: Config.Options.type === "add-on" ? "world" : undefined,
                    version: [1, 0, 0],
                    min_engine_version: Config.Options.formatVersion.split(".").map(Number),
                },
                modules: [
                    {
                        type: "data",
                        uuid: await Config.getUUID("data"),
                        version: [1, 0, 0],
                    },
                    {
                        type: "script",
                        language: "javascript",
                        uuid: await Config.getUUID("script"),
                        version: [1, 0, 0],
                        entry: "scripts/main.js",
                    }
                ],
                dependencies: [
                    {
                        uuid: await Config.getUUID("resource"),
                        version: [1, 0, 0],
                    },
                    {
                        module_name: "@minecraft/server",
                        version: this.getVersionNumber("@minecraft/server"),
                    },
                    {
                        module_name: "@minecraft/server-ui",
                        version: this.getVersionNumber("@minecraft/server-ui"),
                    },
                ],
                metadata: Config.Options.type === "add-on" ? {
                    product_type: "addon",
                } : undefined,
            };

            resolve(manifest);
        });
    }
    
    public static get ResourceManifest() : Promise<types.Manifest> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<types.Manifest>(async resolve => {
            const manifest: types.Manifest = {
                format_version: 2,
                header: {
                    name: "pack.name",
                    description: "pack.description",
                    uuid: await Config.getUUID("resource"),
                    pack_scope: Config.Options.type === "add-on" ? "world" : undefined,
                    version: [1, 0, 0],
                    min_engine_version: Config.Options.formatVersion.split(".").map(Number),
                },
                modules: [
                    {
                        type: "resources",
                        uuid: await Config.getUUID("resources"),
                        version: [1, 0, 0],
                    },
                ],
                dependencies: [
                    {
                        uuid: await Config.getUUID("behavior"),
                        version: [1, 0, 0],
                    },
                ],
                metadata: Config.Options.type === "add-on" ? {
                    product_type: "addon",
                } : undefined,
            };

            resolve(manifest);
        });
    }
    
    public static get WorldManifest() : Promise<types.Manifest> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<types.Manifest>(async resolve => {
            const manifest: types.Manifest = {
                format_version: 2,
                header: {
                    name: "pack.name",
                    description: "pack.description",
                    uuid: await Config.getUUID("world"),
                    pack_scope: Config.Options.type === "add-on" ? "world" : undefined,
                    lock_template_options: true,
                    version: [1, 0, 0],
                    base_game_version: Config.Options.formatVersion.split(".").map(Number),
                },
                modules: [
                    {
                        type: "world_template",
                        uuid: await Config.getUUID("world_template"),
                        version: [1, 0, 0],
                    },
                ],
                metadata: {
                    product_type: Config.Options.type === "add-on" ? "addon" : undefined,
                    authors: [
                        Config.Options.author
                    ],
                },
            };

            resolve(manifest);
        });
    }
    
    public static get SkinManifest() : Promise<types.Manifest> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<types.Manifest>(async resolve => {
            const manifest: types.Manifest = {
                format_version: 1,
                header: {
                    name: "pack.name",
                    uuid: await Config.getUUID("skin"),
                    version: [1, 0, 0],
                },
                modules: [
                    {
                        type: "skin_pack",
                        uuid: await Config.getUUID("skin_pack"),
                        version: [1, 0, 0],
                    },
                ]
            };

            resolve(manifest);
        });
    }
    
    private static getVersionNumber(module: string): string {
        if (Config.Options.scripting === "deno") {
            try {
                const file = JSON.parse(Deno.readTextFileSync(path.join(Deno.cwd(), "deno.json")));
                const value = file.imports[module] as string|undefined;
        
                if (!value) throw new Error(`Could not find module ${module} in deno.json`);
                return value.split("@^")[1]; // TODO: handle beta versions correctly
            } catch (_error) {
                throw new Error(`Could not get version number for module ${module} as deno.json doesn't exist`);
            }
        } else {
            try {
                const file = JSON.parse(Deno.readTextFileSync(path.join(Deno.cwd(), "package.json")));
                const value = file.dependencies[module] as string|undefined;
        
                if (!value) throw new Error(`Could not find module ${module} in package.json`);
                return value.replace("^", ""); // TODO: handle beta versions correctly
            } catch (_error) {
                throw new Error(`Could not get version number for module ${module} as package.json doesn't exist`);
            }
        }
    }

    public static async build(): Promise<void> {
        if (Config.Options.type !== "skin-pack") {
            writeTextToDist(path.join(Config.Paths.bp.root, "manifest.json"), JSON.stringify(await this.BehaviorManifest, null, "\t"), false);
            writeTextToDist(path.join(Config.Paths.rp.root, "manifest.json"), JSON.stringify(await this.ResourceManifest, null, "\t"), false);
        }

        if (Config.Options.type === "world") {
            writeTextToDist(path.join(Config.Paths.root, "manifest.json"), JSON.stringify(await this.WorldManifest, null, "\t"), false);
        }

        if (Config.Options.type === "skin-pack" || Config.Options.include_skin_pack) {
            writeTextToDist(path.join(Config.Paths.skins.root, "manifest.json"), JSON.stringify(await this.SkinManifest, null, "\t"), false);
        }
    }
}