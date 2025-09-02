import type { MinecraftWriteable } from "../../api/api.ts";
import { writeBufferToSrc } from "../../core/core.ts";

export interface SourceWriteOptions {
    overwrite: boolean
}

export function minecraftWriteableToSource(writeable: MinecraftWriteable<object, object>, options: SourceWriteOptions): void {
    const {endpoint, response} = writeable.generate();
    const path = endpoint.replace("BP", "./src/behavior_pack").replace("RP", "./src/resource_pack");

    writeBufferToSrc(path, new Uint8Array(response.data), options.overwrite);
}