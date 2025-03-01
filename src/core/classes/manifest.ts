import * as path from "jsr:@std/path";
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
                    pack_scope: "world",
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
                ]
            };
    
            if (Config.Options.type === "add-on") {
                manifest.metadata = {
                    product_type: "addon",
                };
            }

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
                    pack_scope: "world",
                    version: [1, 0, 0],
                    min_engine_version: Config.Options.formatVersion.split(".").map(Number),
                },
                modules: [
                    {
                        type: "data",
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
            };
    
            if (Config.Options.type === "add-on") {
                manifest.metadata = {
                    product_type: "addon",
                };
            }

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
                    pack_scope: "world",
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
                    authors: [
                        Config.Options.author
                    ],
                },
            };
    
            if (Config.Options.type === "add-on") {
                manifest.metadata = {
                    product_type: "addon",
                };
            }

            resolve(manifest);
        });
    }
    
    private static getVersionNumber(module: string): string {
        try {
            const deno = JSON.parse(Deno.readTextFileSync(path.join(Deno.cwd(), "deno.json")));
            const value = deno.imports[module] as string|undefined;
    
            if (!value) throw new Error(`Could not find module ${module} in deno.json`);
            return value.split("@^")[1]; // TODO: handle beta versions correctly
        } catch (_error) {
            throw new Error(`Could not get version number for module ${module} as deno.json doesn't exist`);
        }
    }

    public static async build(): Promise<void> {
        if (Config.Options.type !== "skin-pack") {
            writeTextToDist(path.join(Config.Paths.bp.root, "manifest.json"), JSON.stringify(await this.BehaviorManifest, null, "\t"));
            writeTextToDist(path.join(Config.Paths.rp.root, "manifest.json"), JSON.stringify(await this.ResourceManifest, null, "\t"));

            if (Config.Options.type === "world") {
                writeTextToDist(path.join(Config.Paths.root, "manifest.json"), JSON.stringify(await this.WorldManifest, null, "\t"));
            }
        }
    }
}