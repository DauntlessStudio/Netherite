import type { MinecraftWriteable } from "../../api/api.ts";
import { composites, writeBufferToSrc } from "../../core/core.ts";
import encoded from "../../templates/encoded.ts";

export interface SourceWriteOptions {
    overwrite?: boolean
}

export function minecraftWriteableToSource(writeable: MinecraftWriteable<object, object>, options: SourceWriteOptions): void {
    const {endpoint, response} = writeable.generate();
    const path = endpoint.replace("BP", "./src/behavior_pack").replace("RP", "./src/resource_pack");

    writeBufferToSrc(path, new Uint8Array(response.data), options.overwrite);
}

export interface SourceImageOptions {
    overwrite?: boolean,
    addToTerrain?: boolean;
    addToItem?: boolean;
}

export function writeImage<T extends keyof typeof encoded>(subpath: string, sourceKey: T, options: SourceImageOptions): void {
    const name = "NAMESPACE:" + (subpath.split("/").at(-1) ?? "undefined");
    const contents = Uint8Array.from(atob(encoded[sourceKey]), c => c.charCodeAt(0));
    
    writeBufferToSrc(`./src/resource_pack/textures/${subpath}.png`, contents, options.overwrite);

    if (options.addToItem) {
        composites.item_texture.ingestDir("./src/resource_pack/textures/");
        composites.item_texture.ingestData({
            resource_pack_name: "NAMESPACE",
            texture_name: "atlas.items",
            texture_data: {
                [name]: {
                    textures: `textures/${subpath}`
                }
            }
        });

        composites.item_texture.buildSource();
    }

    if (options.addToTerrain) {
        composites.terrain_texture.ingestDir("./src/resource_pack/textures/");
        composites.terrain_texture.ingestData({
            num_mip_levels: 4,
            padding: 8,
            resource_pack_name: "vanilla",
            texture_name: "atlas.terrain",
            texture_data: {
                [name]: {
                    textures: `textures/${subpath}`
                }
            }
        });

        composites.terrain_texture.buildSource();
    }
}