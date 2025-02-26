import { Language, Config, Module, type ModuleWriteable } from "../../core/classes/index.ts";
import { deepMerge } from "../../core/utils/index.ts";
import type { ServerEntityStrict, ServerEntityLoose } from "../types/index.d.ts";

export class MinecraftServerEntity implements ModuleWriteable {
    // #region Static

    private static validate(entity: ServerEntityLoose): ServerEntityStrict {
        if (!entity["minecraft:entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!entity["minecraft:entity"].description.identifier.includes(":")) {
            entity["minecraft:entity"].description.identifier = `${Config.Options.projectNamespace}:${entity["minecraft:entity"].description.identifier}`;
        }

        const family = entity["minecraft:entity"].components?.["minecraft:type_family"]?.family
        if (family) {
            entity["minecraft:entity"]!.components!["minecraft:type_family"]!.family = family.map((f: string) => {
                if (!f.includes(":")) {
                    return `${Config.Options.projectNamespace}:${f}`;
                }
                return f;
            });
        }

        const baseline: ServerEntityStrict = {
            format_version: Config.Options.projectFormatVersion,
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

        return deepMerge(baseline, entity);
    }

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

    private entity: ServerEntityStrict;

    public get Identifier() : string {
        return this.entity["minecraft:entity"].description.identifier;
    }
    
    public get Shortname() : string {
        return this.Identifier.split(":")[1];
    }
    
    constructor(entity: ServerEntityLoose) {
        this.entity = MinecraftServerEntity.validate(entity);
        Module.register(this);
    }

    public updateEntity(entity: ServerEntityLoose): MinecraftServerEntity {
        this.entity = MinecraftServerEntity.validate(deepMerge(this.entity, entity));
        return this;
    }

    generate(): { outputPath: string; content: Uint8Array; } {
        Language.addPlaceholderEntry("entity names", `entity.${this.Identifier}.name`, this.Shortname);

        if (this.entity["minecraft:entity"].description.is_spawnable) {
            Language.addPlaceholderEntry("spawn eggs", `item.spawn_egg.entity.${this.Identifier}.spawn`, `Spawn ${this.Shortname}`);
        }

        return {
            outputPath: `${Config.Paths.bp.root}entities/${this.Shortname}.json`,
            content: new TextEncoder().encode(JSON.stringify(this.entity, null, "\t"))
        };
    }
}