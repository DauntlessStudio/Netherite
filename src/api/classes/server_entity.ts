import { Language, type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ServerEntityStrict, ServerEntityLoose } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftServerEntity extends MinecraftWriteable<ServerEntityLoose, ServerEntityStrict> {
    // #region Static
    public static dummy(identifier: string): MinecraftServerEntity {
        return new MinecraftServerEntity({
            "minecraft:entity": {
                description: {
                    identifier,
                    is_spawnable: false,
                    is_summonable: true
                },
                component_groups: {
                    despawn: {
                        "minecraft:instant_despawn": {}
                    }
                },
                components: {
                    "minecraft:type_family": {
                        family: [
                            identifier,
                        ]
                    },
                    "minecraft:collision_box": {
                        width: 0,
                        height: 0,
                    },
                    "minecraft:physics": {
                        has_collision: false,
                        has_gravity: false,
                    },
                    "minecraft:pushable": {
                        is_pushable: false,
                        is_pushable_by_piston: false,
                    },
                    "minecraft:damage_sensor": {
                        triggers: [
                            {
                                cause: "void",
                                on_damage: {
                                    event: "despawn"
                                }
                            },
                            {
                                cause: "all",
                                deals_damage: "no",
                            }
                        ]
                    }
                },
                events: {
                    despawn: {
                        add: {
                            component_groups: ["despawn"]
                        }
                    }
                }
            }
        });
    }

    // #endregion

    public get Identifier() : string {
        return this.minecraftObj["minecraft:entity"].description?.identifier ?? "NAMESPACE:SHORTNAME";
    }

    protected override validate(): ServerEntityStrict {
        if (!this.minecraftObj["minecraft:entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!this.minecraftObj["minecraft:entity"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:entity"].description.identifier = `NAMESPACE:${this.minecraftObj["minecraft:entity"].description.identifier}`;
        }

        const family = this.minecraftObj["minecraft:entity"].components?.["minecraft:type_family"]?.family
        if (family) {
            this.minecraftObj["minecraft:entity"]!.components!["minecraft:type_family"]!.family = family.map((f: string) => {
                if (!f.includes(":")) {
                    return `NAMESPACE:${f}`;
                }
                return f;
            });
        }

        const baseline: ServerEntityStrict = {
            format_version: "FORMATVERSION",
            "minecraft:entity": {
                description: {
                    identifier: "",
                    is_spawnable: false,
                    is_summonable: true
                },
                component_groups: {},
                components: {},
                events: {}
            }
        }

        return deepMerge(baseline, this.minecraftObj);
    }

    public generate(): WorkerResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/entities/${this.Shortname}.json`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
            },
        };

        Language.addPlaceholderEntry("entities", `entity.${this.Identifier}.name`, this.Shortname);

        if (this.minecraftObj["minecraft:entity"].description?.is_spawnable) {
            Language.addPlaceholderEntry("spawn eggs", `item.spawn_egg.entity.${this.Identifier}.spawn`, `Spawn ${this.Shortname}`);
        }

        return response;
    }
}