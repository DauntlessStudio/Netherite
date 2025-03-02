import * as path from "jsr:@std/path";
import { deepMerge, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";

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
    
    public static async build(): Promise<void> {
        if (Config.Options.type === "world") {
            writeTextToDist(path.join(Config.Paths.root, "world_behavior_packs.json"), JSON.stringify(await this.BehaviorPacks, null, "\t"));
            writeTextToDist(path.join(Config.Paths.root, "world_resource_packs.json"), JSON.stringify(await this.ResourcePacks, null, "\t"));

            writeTextToDist(path.join(Config.Paths.root, "levelname.txt"), Config.Options.name);
        }
    }
}