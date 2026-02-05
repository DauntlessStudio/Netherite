import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientBlocks } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientBlocks extends MinecraftWriteable<ClientBlocks, ClientBlocks> {
    public override get Identifier(): string {
        return ""
    }

    protected override validate(): ClientBlocks {
        return this.minecraftObj;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `blocks`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        return response;
    }
}