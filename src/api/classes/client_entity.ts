import { type WriteableResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ClientEntityStrict, ClientEntityLoose, Molang } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientEntity extends MinecraftWriteable<ClientEntityLoose, ClientEntityStrict> {
    public static dummy(name: string): MinecraftClientEntity {
        return new MinecraftClientEntity(
            {
                format_version: "FORMATVERSION",
                "minecraft:client_entity": {
                    description: {
                        identifier: `NAMESPACE:${name}`,
                        materials: {
                            default: "entity_alphatest",
                        },
                        textures: {
                            default: `textures/PATH/entity/${name}/default`,
                        },
                        geometry: {
                            default: `geometry.NAMESPACE.${name}`,
                        },
                        render_controllers: [
                            "controller.render.default",
                        ],
                    }
                }
            }
        );
    }
    
    public get Entity() : ClientEntityLoose {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return this.minecraftObj["minecraft:client_entity"].description.identifier ?? "NAMESPACE:SHORTNAME";
    }

    /**
     * **Overwrites** rather than modifies the `render_controllers` array. Useful when extending a base entity.
     * @param rcs The new `render_controllers` array.
     * @returns This {@link MinecraftClientEntity}.
     */
    public setRenderControllers(rcs?: (string|{ [key: string]: Molang })[]): MinecraftClientEntity {
        this.minecraftObj["minecraft:client_entity"].description.render_controllers = rcs;
        return this;
    }
    
    protected validate(): ClientEntityStrict {
        if (!this.minecraftObj["minecraft:client_entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!this.minecraftObj["minecraft:client_entity"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:client_entity"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:client_entity"].description.identifier}`;
        }

        const baseline: ClientEntityStrict = {
            format_version: "FORMATVERSION",
            "minecraft:client_entity": {
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

    protected generate(): WriteableResponse<ModuleResponse> {
        return {
            endpoint: `RP/entity/${this.Shortname}.entity.json`,
            response: {
                name: this.Shortname,
                data: this.encode(),
            }
        }
    }
}