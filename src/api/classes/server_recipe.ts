import type { WriteableResponse, ModuleResponse } from "../../core/core.ts";
import type { ServerRecipe, ServerRecipeBrewingMix, ServerRecipeFurnace, ServerRecipeShaped, ServerRecipeShapeless } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

const RecipeTypes = [
    "minecraft:recipe_shaped",
    "minecraft:recipe_shapeless",
    "minecraft:recipe_furnace",
    "minecraft:recipe_brewing_mix",
];

export class MinecraftServerRecipe extends MinecraftWriteable<Partial<ServerRecipe>, ServerRecipe> {
    public get Recipe() : Partial<ServerRecipe> {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return (this.minecraftObj as ServerRecipeShaped)["minecraft:recipe_shaped"]?.description?.identifier
        ?? (this.minecraftObj as ServerRecipeShapeless)["minecraft:recipe_shapeless"]?.description?.identifier
        ?? (this.minecraftObj as ServerRecipeFurnace)["minecraft:recipe_furnace"]?.description?.identifier
        ?? (this.minecraftObj as ServerRecipeBrewingMix)["minecraft:recipe_brewing_mix"]?.description?.identifier
        ?? "NAMESPACE:SHORTNAME";
    }

    protected override validate(): ServerRecipe {
        if (RecipeTypes.every(value => !(value in this.minecraftObj))) {
            throw new Error(`Recipe must include one of ${RecipeTypes.join(", ")}`);
        }

        this.minecraftObj.format_version = this.minecraftObj.format_version ?? "FORMATVERSION";

        return this.minecraftObj as ServerRecipe;
    }

    protected generate(): WriteableResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/recipes/${this.Shortname}.json`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        return response;
    }
}