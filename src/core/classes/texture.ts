import * as path from "jsr:@std/path";
import { deepMerge, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { ClientItemTexture, ClientTerrainTexture } from "../../api/api.ts";

export class Texture {
    private static terrainTexture: ClientTerrainTexture = {
        num_mip_levels: 4,
        padding: 8,
        resource_pack_name: "vanilla",
        texture_name: "atlas.terrain",
        texture_data: {},
    };

    private static itemTexture: ClientItemTexture = {
        resource_pack_name: "vanilla",
        texture_name: "atlas.items",
        texture_data: {},
    };
    
    public static ingestTextureFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            if (entry.name === "terrain_texture.json") {
                const fileContent: ClientTerrainTexture = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.terrainTexture = deepMerge(this.terrainTexture, fileContent);
            } else if (entry.name === "item_texture.json") {
                const fileContent: ClientItemTexture = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.itemTexture = deepMerge(this.itemTexture, fileContent);
            }
        }
    }
    
    public static build(): void {
        writeTextToDist(path.join(path.join(Config.Paths.rp.root, "textures"), "terrain_texture.json"), JSON.stringify(this.terrainTexture, null, "\t"));
        writeTextToDist(path.join(path.join(Config.Paths.rp.root, "textures"), "item_texture.json"), JSON.stringify(this.itemTexture, null, "\t"));
    }
}