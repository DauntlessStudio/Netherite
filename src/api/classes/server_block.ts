import { type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ServerBlockStrict, ServerBlockLoose } from "../types/index.ts";
import type { BlockGeometry, BlockMaterialInstances } from "../types/server_block_components.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";
import { MinecraftServerItem } from "./server_item.ts";

export class MinecraftServerBlock extends MinecraftWriteable<ServerBlockLoose, ServerBlockStrict> {
    // #region Static
    public static dummy(identifier: string): MinecraftServerBlock {
        if (!identifier.includes(":")) identifier = "NAMESPACE:" + identifier;

        return new MinecraftServerBlock({
            "minecraft:block": {
                description: {
                    identifier,
                    menu_category: {
                        category: "items",
                    },
                },
                components: {
                    "minecraft:display_name": `tile.${identifier}.name`,
                }
            }
        });
    }

    // #endregion
    private serverItem?: MinecraftServerItem;

    public get Identifier() : string {
        return this.minecraftObj["minecraft:block"]?.description?.identifier ?? "NAMESPACE:SHORTNAME";
    }

    /**
     * Creates an {@link MinecraftServerItem} that can be used to place this block.
     * Useful if you need to add item tags, stack size limits, or other modifications to the block item.
     * This block will be automatically modified to include the needed changes to support a seperate item file.
     * @returns The created {@link MinecraftServerItem}.
     */
    public createItem(): MinecraftServerItem {
        this.serverItem = new MinecraftServerItem({
            "minecraft:item": {
                description: {
                    identifier: this.Identifier,
                    menu_category: this.minecraftObj["minecraft:block"]?.description?.menu_category,
                },
                components: {
                    "minecraft:block_placer": {
                        block: this.Identifier,
                    },
                    "minecraft:display_name": {
                        value: this.minecraftObj["minecraft:block"]?.components?.["minecraft:display_name"] ?? `tile.${this.Identifier}.name`,
                    }
                }
            }
        });

        return this.serverItem;
    }

    protected override validate(): ServerBlockStrict {
        if (!this.minecraftObj["minecraft:block"]?.description?.identifier) {
            throw new Error("Block identifier is required");
        }

        if (!this.minecraftObj["minecraft:block"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:block"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:block"].description.identifier}`;
        }

        const baseline: ServerBlockStrict = {
            format_version: "FORMATVERSION",
            "minecraft:block": {
                description: {
                    identifier: "",
                    menu_category: {
                        category: "items",
                    },
                },
                components: {},
            }
        }

        const result = deepMerge(baseline, this.minecraftObj);

        if (this.serverItem) {
            this.serverItem.modify({
                "minecraft:item": {
                    description: {
                        menu_category: result["minecraft:block"].description.menu_category,
                    }
                }
            });
            delete result["minecraft:block"].description.menu_category;

            if (!result["minecraft:block"].components["minecraft:item_visual"]) {
                const geometry: BlockGeometry = result["minecraft:block"].components["minecraft:geometry"] ?? "minecraft:geometry.full_block";
                const material_instances: BlockMaterialInstances = result["minecraft:block"].components["minecraft:material_instances"] ?? {};
                result["minecraft:block"].components["minecraft:item_visual"] = {
                    geometry,
                    material_instances,
                }
            }
        }

        return result;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/blocks/${this.Shortname}.json`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        return response;
    }
}