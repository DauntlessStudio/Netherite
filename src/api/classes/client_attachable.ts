import { type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ClientAttachableStrict, ClientAttachableLoose } from "../types/index.d.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientAttachable extends MinecraftWriteable<ClientAttachableLoose, ClientAttachableStrict> {
    public static armor(name: string, piece: string): MinecraftClientAttachable {
        const setName = name.replace(`_${piece}`, "");

        return new MinecraftClientAttachable({
            format_version: "1.10.0",
            "minecraft:attachable": {
                description: {
                    identifier: `NAMESPACE:${name}`,
                    materials: {
                        default: "armor",
                        enchanted: "armor_enchanted",
                    },
                    textures: {
                        default: `textures/PATH/attachables/${setName}`,
                        enchanted: "textures/misc/enchanted_item_glint"
                    },
                    geometry: {
                        default: `geometry.NAMESPACE.player.${setName}.${piece}`
                    },
                    scripts: {
                        initialize: [
                            "variable.is_first_person = 0.0;"
                        ],
                        pre_animation: [
                            "v.is_first_person = c.owning_entity->v.is_first_person;",
                            "v.is_paperdoll = c.owning_entity->v.is_paperdoll;"
                        ],
                        parent_setup: "variable.leggings_layer_visible = 0.0;"
                    },
                    render_controllers: [
                        "controller.render.armor"
                    ]
                }
            }
        });
    }

    public static skeletal(name: string): MinecraftClientAttachable {
        return new MinecraftClientAttachable({
            format_version: "1.10.0",
            "minecraft:attachable": {
                description: {
                    identifier: `NAMESPACE:${name}`,
                    materials: {
                        default: "entity_alphatest",
                        enchanted: "entity_alphatest_glint",
                    },
                    textures: {
                        default: `textures/PATH/attachables/${name}`,
                        enchanted: "textures/misc/enchanted_item_glint"
                    },
                    geometry: {
                        default: `geometry.NAMESPACE.player.${name}`
                    },
                    animations: {
                        [`ctrl.${name}`]: `controller.animation.NAMESPACE.item.custom_items.${name}`,
                        [`${name}.idle.first_person`]: `animation.NAMESPACE.item.${name}.idle.first_person`,
                        [`${name}.idle.third_person`]: `animation.NAMESPACE.item.${name}.idle.third_person`,
                        [`${name}.attack.first_person`]: `animation.NAMESPACE.item.${name}.attack.first_person`,
                        [`${name}.attack.third_person`]: `animation.NAMESPACE.item.${name}.attack.third_person`,
                    },
                    scripts: {
                        pre_animation: [
                            "variable.is_first_person = c.is_first_person;",
                        ],
                        animate: [
                            `ctrl.${name}`,
                        ],
                    },
                    render_controllers: [
                        "controller.render.item_default"
                    ]
                }
            }
        });
    }

    public get Identifier() : string {
        return this.minecraftObj["minecraft:attachable"].description.identifier ?? "NAMESPACE:SHORTNAME";
    }
    
    protected validate(): ClientAttachableStrict {
        if (!this.minecraftObj["minecraft:attachable"]?.description?.identifier) {
            throw new Error("Attachable identifier is required");
        }

        if (!this.minecraftObj["minecraft:attachable"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:attachable"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:attachable"].description.identifier}`;
        }

        const baseline: ClientAttachableStrict = {
            format_version: "1.10.0",
            "minecraft:attachable": {
                description: {
                    identifier: "",
                    materials: {
                        default: "entity_alphatest"
                    },
                    geometry: {
                        default: "geometry.empty"
                    },
                    textures: {
                        default: "textures/empty"
                    },
                    render_controllers: []
                },
            }
        }

        return deepMerge(baseline, this.minecraftObj);
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const data = this.encode();

        return {
            endpoint: `RP/attachables/${this.Shortname}.json`,
            response: {
                name: this.Shortname,
                data,
            }
        }
    }
}