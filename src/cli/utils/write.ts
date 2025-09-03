import type { MinecraftWriteable } from "../../api/api.ts";
import { Texture, writeBufferToSrc } from "../../core/core.ts";
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
    
    Texture.ingestTextureFiles("./src/resource_pack/textures/");
    if (options.addToItem) Texture.addItemEntry(name, `textures/${subpath}`);
    if (options.addToTerrain) Texture.addTerrainEntry(name, `textures/${subpath}`);
    if (options.addToItem || options.addToTerrain) Texture.buildSource();
}