import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientItemTexture } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientItemTexture extends MinecraftWriteable<Partial<ClientItemTexture>, ClientItemTexture> {
    public override get Identifier(): string {
        return ""
    }

    protected override validate(): ClientItemTexture {
        this.minecraftObj.resource_pack_name = "NAMESPACE";
        this.minecraftObj.texture_name = "atlas.items";
        this.minecraftObj.texture_data = this.minecraftObj.texture_data ?? {};

        return this.minecraftObj as ClientItemTexture;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `item_texture`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        return response;
    }
}