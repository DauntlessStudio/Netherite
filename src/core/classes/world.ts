import * as path from "@std/path";
import { writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import { Logger } from "../utils/logger.ts";

export class World {
    public static get BehaviorPacks() : Promise<[object]> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<[object]>(async resolve => {
            const manifest: [object] = [
                {
                    pack_id: await Config.getUUID("behavior"),
                    version: [1, 0, 0],
                }
            ];

            resolve(manifest);
        });
    }
    
    public static get ResourcePacks() : Promise<[object]> {
        // deno-lint-ignore no-async-promise-executor
        return new Promise<[object]>(async resolve => {
            const manifest: [object] = [
                {
                    pack_id: await Config.getUUID("resource"),
                    version: [1, 0, 0],
                }
            ];

            resolve(manifest);
        });
    }
    
    public static async build(force?: boolean): Promise<void> {
        if (Config.Options.type === "world" || force) {
            writeTextToDist(path.join(Config.Paths.root, "world_behavior_packs.json"), JSON.stringify(await this.BehaviorPacks, null, "\t"));
            writeTextToDist(path.join(Config.Paths.root, "world_resource_packs.json"), JSON.stringify(await this.ResourcePacks, null, "\t"));

            writeTextToDist(path.join(Config.Paths.root, "levelname.txt"), Config.Options.name);

            // TODO: Use NBT editor to modify level.dat before building
            try {
                Deno.copyFileSync(path.join(Deno.cwd(), "src/world/level.dat"), path.join(Config.Paths.root, "level.dat"));
            } catch (_error) {
                Logger.warn("No level.dat found.");
            }

            try {
                Deno.copyFileSync(path.join(Deno.cwd(), "src/world/world_icon.jpeg"), path.join(Config.Paths.root, "world_icon.jpeg"));
            } catch (_error) {
                // TODO: Get a placeholder world_icon.jpeg
            }
        }
    }
}