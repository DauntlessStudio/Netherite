import { Language, type WorkerResponse, type ModuleWriteable, type ProjectOptions, type ModuleResponse, WorkerWriter } from "../../core/classes/index.ts";
import { deepMerge, keywordReplacer } from "../../core/utils/index.ts";
import type { ServerEntityStrict, ServerEntityLoose } from "../types/index.d.ts";

export class MinecraftServerEntity implements ModuleWriteable {
    // #region Static

    private static validate(entity: ServerEntityLoose, options: ProjectOptions): ServerEntityStrict {
        if (!entity["minecraft:entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!entity["minecraft:entity"].description.identifier.includes(":")) {
            entity["minecraft:entity"].description.identifier = `${options.namespace}:${entity["minecraft:entity"].description.identifier}`;
        }

        const family = entity["minecraft:entity"].components?.["minecraft:type_family"]?.family
        if (family) {
            entity["minecraft:entity"]!.components!["minecraft:type_family"]!.family = family.map((f: string) => {
                if (!f.includes(":")) {
                    return `${options.namespace}:${f}`;
                }
                return f;
            });
        }

        const baseline: ServerEntityStrict = {
            format_version: options.format_version,
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

    private static encode(entity: MinecraftServerEntity, options: ProjectOptions): number[] {
        let content = JSON.stringify(entity.entity, null, "\t");
        content = content.replace(/IDENTIFIER/g, entity.Identifier);
        content = content.replace(/SHORTNAME/g, entity.Shortname);
        content = keywordReplacer(content, options);

        // TODO: Handle Floats

        return Array.from(new TextEncoder().encode(content));
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

    protected entity: ServerEntityLoose;

    public get Identifier() : string {
        return this.entity["minecraft:entity"].description?.identifier ?? "NAMESPACE:SHORTNAME";
    }
    
    public get Shortname() : string {
        return this.Identifier.split(":")[1];
    }
    
    constructor(entity: ServerEntityLoose) {
        this.entity = entity;
        WorkerWriter.broadcast(this);
    }

    public modify(entity: ServerEntityLoose): MinecraftServerEntity {
        this.entity = deepMerge(this.entity, entity);
        WorkerWriter.broadcast(this);
        return this;
    }

    public generate(options: ProjectOptions): WorkerResponse<ModuleResponse> {
        this.entity = MinecraftServerEntity.validate(this.entity, options);

        Language.addPlaceholderEntry("entity names", `entity.${this.Identifier}.name`, this.Shortname);

        if (this.entity["minecraft:entity"].description?.is_spawnable) {
            Language.addPlaceholderEntry("spawn eggs", `item.spawn_egg.entity.${this.Identifier}.spawn`, `Spawn ${this.Shortname}`);
        }

        return {
            endpoint: "minecraft_server_entity",
            response: {
                name: `${this.Shortname}`,
                data: MinecraftServerEntity.encode(this, options),
            },
        };
    }
}