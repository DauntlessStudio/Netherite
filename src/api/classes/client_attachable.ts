import { type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ClientAttachableStrict, ClientAttachableLoose } from "../types/index.d.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientAttachable extends MinecraftWriteable<ClientAttachableLoose, ClientAttachableStrict> {
    public static armor(name: string, piece: string): MinecraftClientAttachable {
        return new MinecraftClientAttachable({
            format_version: "1.10.0",
            "minecraft:client_attachable": {
                description: {
                    identifier: "NAMESPACE:name",
                    materials: {
                        default: "armor",
                        enchanted: "armor_enchanted",
                    },
                    textures: {
                        default: `textures/PATH/attachables/${name}`,
                        enchanted: "textures/misc/enchanted_item_glint"
                    },
                    geometry: {
                        default: `geometry.NAMESPACE.player.${name}.${piece}`
                    },
                    scripts: {
                        initialize: [
                            "variable.is_first_person = 0.0;"
                        ],
                        pre_animation: [
                            "v.is_first_person = c.owning_entity->v.is_first_person;",
                            "v.is_paperdoll = c.owning_entity->v.is_paperdoll;"
                        ],
                        parent_setup: "variable.leggings_layer_visible = 0.0;0"
                    },
                    render_controllers: [
                        "controller.render.armor"
                    ]
                }
            }
        });
    }

    public get Identifier() : string {
        return this.minecraftObj["minecraft:client_attachable"].description.identifier ?? "NAMESPACE:SHORTNAME";
    }
    
    protected validate(): ClientAttachableStrict {
        if (!this.minecraftObj["minecraft:client_attachable"]?.description?.identifier) {
            throw new Error("Attachable identifier is required");
        }

        if (!this.minecraftObj["minecraft:client_attachable"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:client_attachable"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:client_attachable"].description.identifier}`;
        }

        const baseline: ClientAttachableStrict = {
            format_version: "1.10.0",
            "minecraft:client_attachable": {
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
        return {
            endpoint: `RP/attachables/${this.Shortname}.json`,
            response: {
                name: this.Shortname,
                data: this.encode(),
            }
        }
    }
}