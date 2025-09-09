import { Language, type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ServerItemStrict, ServerItemLoose, ServerItemCooldown } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftServerItem extends MinecraftWriteable<ServerItemLoose, ServerItemStrict> {
    // #region Static

    public static dummy(identifier: string, stack_size?: number, cooldown?: number): MinecraftServerItem {
        const cooldownComp: ServerItemCooldown|undefined = cooldown !== undefined ? {category: "SHORTNAME", duration: cooldown} : undefined;

        return new MinecraftServerItem({
            "minecraft:item": {
                description: {
                    identifier,
                    menu_category: {
                        category: "items"
                    }
                },
                components: {
                    "minecraft:display_name": {
                        value: `item.NAMESPACE:${identifier}.name`
                    },
                    "minecraft:icon": "NAMESPACE:" + identifier,
                    "minecraft:max_stack_size": stack_size,
                    "minecraft:cooldown": cooldownComp,
                },
            }
        });
    }

    public static attachable(identifier: string, stack_size?: number, cooldown?: number): MinecraftServerItem {
        const cooldownComp: ServerItemCooldown|undefined = cooldown !== undefined ? {category: "SHORTNAME", duration: cooldown} : undefined;

        return new MinecraftServerItem({
            "minecraft:item": {
                description: {
                    identifier,
                    menu_category: {
                        category: "items"
                    }
                },
                components: {
                    "minecraft:display_name": {
                        value: `item.NAMESPACE:${identifier}.name`
                    },
                    "minecraft:icon": "NAMESPACE:" + identifier,
                    "minecraft:max_stack_size": stack_size,
                    "minecraft:cooldown": cooldownComp,
                    "minecraft:use_modifiers": {
                        use_duration: 30000,
                        movement_modifier: 1
                    }
                },
            }
        });
    }

    public static armor(identifier: string, slot: string, protection?: number): MinecraftServerItem {
        return new MinecraftServerItem({
            "minecraft:item": {
                description: {
                    identifier,
                    menu_category: {
                        category: "equipment"
                    }
                },
                components: {
                    "minecraft:display_name": {
                        value: `item.NAMESPACE:${identifier}.name`
                    },
                    "minecraft:icon": "NAMESPACE:" + identifier,
                    "minecraft:max_stack_size": 1,
                    "minecraft:wearable": {
                        protection,
                        slot
                    }
                },
            }
        });
    }

    // #endregion

    public get Identifier() : string {
        return this.minecraftObj["minecraft:item"].description?.identifier ?? "NAMESPACE:SHORTNAME";
    }

    protected override validate(): ServerItemStrict {
        if (!this.minecraftObj["minecraft:item"]?.description?.identifier) {
            throw new Error("Item identifier is required");
        }

        if (!this.minecraftObj["minecraft:item"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:item"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:item"].description.identifier}`;
        }

        const baseline: ServerItemStrict = {
            format_version: "FORMATVERSION",
            "minecraft:item": {
                description: {
                    identifier: "",
                    menu_category: {
                        category: "items"
                    }
                },
                components: {},
            }
        }

        return deepMerge(baseline, this.minecraftObj);
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/items/${this.Shortname}.json`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        Language.addPlaceholderEntry("items", `item.${this.Identifier}.name`, this.Shortname);

        return response;
    }
}