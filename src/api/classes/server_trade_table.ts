import type { WriteableResponse, ModuleResponse } from "../../core/core.ts";
import type { ServerTradeTable } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftServerTradeTable extends MinecraftWriteable<ServerTradeTable, ServerTradeTable> {
    private readonly identifier: string;

    public get TradeTable() : ServerTradeTable {
        return this.minecraftObj;
    }
    
    public override get Identifier(): string {
        return this.identifier;
    }

    constructor(name: string, obj: ServerTradeTable) {
        super(obj);
        this.identifier = name;
    }

    protected override validate(): ServerTradeTable {
        return this.minecraftObj as ServerTradeTable;
    }

    protected generate(): WriteableResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/trading/PATH/${this.Identifier}.json`,
            response: {
                name: `${this.Identifier}`,
                data: this.encode(),
            },
        };

        return response;
    }
}