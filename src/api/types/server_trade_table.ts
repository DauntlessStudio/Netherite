import type { ServerLootItemFunction } from "./server_loot_item_functions.ts";

interface ServerTradeTableTierTrades {
    total_exp_required?: number;
    trades: ServerTradeTableTrade[];
}

interface ServerTradeTableTierGroups {
    groups: {
        num_to_select?: number;
        trades: ServerTradeTableTrade[];
    }
}

export interface ServerTradeTableTrade {
    wants: ServerTradeTableItem[];
    gives: ServerTradeTableItem[];
    max_uses?: number;
    reward_exp?: boolean;
    trader_exp?: number;
}

export interface ServerTradeTableItem {
    item: string;
    quantity?: {min: number, max: number},
    price_multiplier?: number;
    functions?: ServerLootItemFunction[];
}

export type ServerTradeTableTier = ServerTradeTableTierGroups|ServerTradeTableTierTrades;

export interface ServerTradeTable {
    tiers: ServerTradeTableTier[];
}