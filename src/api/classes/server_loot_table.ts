import type { WriteableResponse, ModuleResponse } from "../../core/core.ts";
import type { ServerLootTable } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftServerLootTable extends MinecraftWriteable<ServerLootTable, ServerLootTable> {
    private readonly identifier: string;

    public get LootTable() : ServerLootTable {
        return this.minecraftObj;
    }
    
    public override get Identifier(): string {
        return this.identifier;
    }

    constructor(name: string, obj: ServerLootTable) {
        super(obj);
        this.identifier = name;
    }

    protected override validate(): ServerLootTable {
        return this.minecraftObj as ServerLootTable;
    }

    protected generate(): WriteableResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/loot_tables/PATH/${this.Identifier}.json`,
            response: {
                name: `${this.Identifier}`,
                data: this.encode(),
            },
        };

        return response;
    }
}