type ItemReference = {
    item?: string;
    data?: number;
    count?: number;
    tag?: string;
};

type CraftingTag = "crafting_table" | "stonecutter" | "smithing_table";
type FurnaceTag = "furnace" | "blast_furnace" | "smoker" | "campfire" | "soul_campfire";
type BrewingTag = "brewing_stand";

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
    input?: string;
    output?: ItemReference;
}

interface ServerRecipeFurnaceData {
    description?: {
        identifier?: string;
    };
    group?: string;
    tags?: FurnaceTag[];
    input?: string;
    output?: ItemReference;
}

interface ServerRecipeBrewingMixData {
    description?: {
        identifier?: string;
    };
    group?: string;
    tags?: BrewingTag[];
    input?: string;
    reagent?: string;
    output?: string;
}

export interface ServerRecipeShaped {
    format_version: string;
    "minecraft:recipe_shaped": ServerRecipeShapedData;
}

export interface ServerRecipeShapeless {
    format_version: string;
    "minecraft:recipe_shapeless": ServerRecipeShapelessData;
}

export interface ServerRecipeFurnace {
    format_version: string;
    "minecraft:recipe_furnace": ServerRecipeFurnaceData;
}

export interface ServerRecipeBrewingMix {
    format_version: string;
    "minecraft:recipe_brewing_mix": ServerRecipeBrewingMixData;
}

export type ServerRecipe = ServerRecipeShaped | ServerRecipeShapeless | ServerRecipeFurnace | ServerRecipeBrewingMix;