import type { BlockComponents } from "./server_block_components.ts";

interface ServerBlockDescription {
    identifier?: string;
    menu_category?: {
        category: "construction" | "equipment" | "items" | "nature";
        group?: string;
        is_hidden_in_commands?: boolean;
    };
    states?: {
        [key: string]: boolean[] | string[] | number[] | {
            values?: {
                min?: number;
                max?: number;
            }
        };
    };
    traits?: ServerBlockTraits;
}

interface ServerBlockPermutation {
    condition: string;
    components: BlockComponents;
}

interface ServerBlockTraits {
    "minecraft:placement_direction"?: {
        enabled_states?: ("minecraft:cardinal_direction" | "minecraft:facing_direction")[];
        y_rotation_offset?: number;
    };
    "minecraft:placement_position"?: {
        enabled_states?: ("minecraft:block_face" | "minecraft:vertical_half")[];
    };
}

export interface ServerBlockStrict {
    format_version: string;
    "minecraft:block": {
        description: ServerBlockDescription;
        components: BlockComponents;
        permutations?: ServerBlockPermutation[];
    }
}

export interface ServerBlockLoose {
    format_version?: string;
    "minecraft:block"?: {
        description?: Partial<ServerBlockDescription>;
        components?: BlockComponents;
        permutations?: ServerBlockPermutation[];
    }
}