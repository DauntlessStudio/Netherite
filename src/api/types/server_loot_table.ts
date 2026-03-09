import type { ServerLootItemFunction } from "./server_loot_item_functions.ts";

interface ServerLootTablePoolTiered {
    tiers: {
        initial_range?: number;
        bonus_rolls?: number;
        bonus_chance?: number;
    };
    entries: ServerLootTableEntry[];
}

interface ServerLootTablePoolWeighted {
    rolls: number|{ min: number; max: number; };
    bonus_rolls?: number;
    bonus_chance?: number;
    conditions?: ServerLootTableConditions[];
    entries: ServerLootTableEntry[];
}

interface ServerLootTableEntries {
    item: {
        type: "item";
        name: string;
        weight?: number;
        functions?: ServerLootItemFunction[];
    }
    loot: {
        type: "loot_table";
        name: string;
        weight?: number;
    }
}

export type ServerLootTableEntry = ServerLootTableEntries[keyof ServerLootTableEntries];

interface ServerLootTableConditions {
    random_chance: {
        condition: "random_chance";
        chance: number;
    }
    killed_by_player: {
        condition: "killed_by_player";
    }
    killed_by_player_or_pets: {
        condition: "killed_by_player_or_pets";
    }
    random_difficulty_chance: {
        condition: "random_difficulty_chance";
        default_chance: number;
        peaceful: number;
        hard: number;
    }
    entity_properties: {
        condition: "entity_properties";
        entity: "this";
        properties: {
            on_fire?: boolean;
            [key: string]: boolean|undefined;
        }
    }
    bool_property: {
        condition: "bool_property";
        domain: string;
        value: boolean;
    }
    killed_by_entity: {
        condition: "killed_by_entity";
        entity_type: string;
    }
    random_chance_with_looting: {
        condition: "random_chance_with_looting";
        chance: number;
        looting_multiplier: number;
    }
    entity_killed: {
        condition: "entity_killed";
        entity_type: string;
    }
    has_variant: {
        condition: "has_variant";
        value: number;
    }
    damaged_by_entity: {
        condition: "damaged_by_entity";
        entity_type: string;
    }
    passenger_of_entity: {
        condition: "passenger_of_entity";
        entity_type: string;
    }
    is_baby: {
        condition: "is_baby";
    }
    random_regional_difficulty_chance: {
        condition: "random_regional_difficulty_chance";
        max_chance: number;
    }
    has_mark_variant: {
        condition: "has_mark_variant";
        value: number;
    }
}

export type ServerLootTableCondition = ServerLootTableConditions[keyof ServerLootTableConditions];

export type ServerLootTablePool = ServerLootTablePoolWeighted|ServerLootTablePoolTiered;

export interface ServerLootTable {
    pools: ServerLootTablePool[];
}