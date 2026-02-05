import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientTerrainTexture } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientTerrainTexture extends MinecraftWriteable<Partial<ClientTerrainTexture>, ClientTerrainTexture> {
    public override get Identifier(): string {
        return ""
    }

    protected override validate(): ClientTerrainTexture {
        this.minecraftObj.num_mip_levels = this.minecraftObj.num_mip_levels ?? 4;
        this.minecraftObj.padding = this.minecraftObj.padding ?? 8;
        this.minecraftObj.resource_pack_name = "NAMESPACE";
        this.minecraftObj.texture_name = "atlas.terrain";
        this.minecraftObj.texture_data = this.minecraftObj.texture_data ?? {};

        return this.minecraftObj as ClientTerrainTexture;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `terrain_texture`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        return response;
    }
}