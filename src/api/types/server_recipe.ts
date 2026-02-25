type ItemReference = {
    item?: string;
    data?: number;
    count?: number;
    tag?: string;
};

type CraftingTag = "crafting_table" | "stonecutter" | "smithing_table" | "furnace" | "blast_furnace" | "smoker" | "campfire" | "soul_campfire" | "bring_stand";

interface ServerRecipeShapedData {
    description?: {
        identifier?: string;
    };
    tags?: CraftingTag[];
    pattern?: string[];
    key?: {
        [key: string]: ItemReference;
    };
    unlock?: {
        item?: string;
        data?: number;
        context?: string | "PlayerInWater";
    };
    result?: (string | ItemReference)[];
}

interface ServerRecipeShapelessData {
    description?: {
        identifier?: string;
    };
    group?: string;
    tags?: CraftingTag[];
    ingredients?: ItemReference[];
    unlock?: {
        item?: string;
        data?: number;
        context?: string | "PlayerInWater";
    };
    result?: (string | ItemReference)[];
}

export interface ServerRecipeShaped {
    format_version: string;
    "minecraft:recipe_shaped": ServerRecipeShapedData;
}

export interface ServerRecipeShapeless {
    format_version: string;
    "minecraft:recipe_shapeless": ServerRecipeShapelessData;
}

export type ServerRecipe = ServerRecipeShaped | ServerRecipeShapeless;