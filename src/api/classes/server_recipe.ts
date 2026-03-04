import type { ModuleResponse, ModuleResponse } from "../../core/core.ts";
import type { ServerRecipe, ServerRecipeShaped, ServerRecipeShapeless } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftServerRecipe extends MinecraftWriteable<Partial<ServerRecipe>, ServerRecipe> {
    public get Recipe() : Partial<ServerRecipe> {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return (this.minecraftObj as ServerRecipeShaped)["minecraft:recipe_shaped"]?.description?.identifier
        ?? (this.minecraftObj as ServerRecipeShapeless)["minecraft:recipe_shapeless"]?.description?.identifier
        ?? "NAMESPACE:SHORTNAME";
    }

    protected override validate(): ServerRecipe {
        if (!("minecraft:recipe_shaped" in this.minecraftObj) && !("minecraft:recipe_shapeless" in this.minecraftObj)) {
            throw new Error("Recipe must include either `minecraft:recipe_shaped` or `minecraft:recipe_shapeless`");
        }

        this.minecraftObj.format_version = this.minecraftObj.format_version ?? "FORMATVERSION";

        return this.minecraftObj as ServerRecipe;
    }

    protected generate(): ModuleResponse<ModuleResponse> {
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