import { type WriteableResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import { Float } from "../types/float.ts";
import type { ServerEntityStrict, ServerEntityLoose } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

/**
 * A class for creating and working with Server Entities.
 */
export class MinecraftServerEntity extends MinecraftWriteable<ServerEntityLoose, ServerEntityStrict> {
    // #region Static
    /**
     * Generates a dummy entity with no physics, collision, damage handling, or targeting.
     * @param identifier The entity identifier.
     * @returns The Entity instance.
     */
    public static dummy(identifier: string, subpath?: string): MinecraftServerEntity {
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
                            "$NAMESPACE:" + identifier,
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
                    "minecraft:cannot_be_attacked": {},
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
        }, subpath);
    }

    // #endregion
    
    public get Entity() : ServerEntityLoose {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return this.minecraftObj["minecraft:entity"].description?.identifier ?? "$NAMESPACE:SHORTNAME";
    }

    constructor(obj: ServerEntityLoose, protected readonly subpath: string = "") {
        super(obj);
        this.subpath &&= this.subpath + "/";
    }

    protected override validate(): ServerEntityStrict {
        if (!this.minecraftObj["minecraft:entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!this.minecraftObj["minecraft:entity"].description.identifier.includes(":")) {
            this.minecraftObj["minecraft:entity"].description.identifier = `$NAMESPACE:${this.minecraftObj["minecraft:entity"].description.identifier}`;
        }

        const properties = this.minecraftObj["minecraft:entity"].description.properties;
        if (properties) {
            for (const value of Object.values(properties)) {
                if (value.type === "float") {
                    value.default = Float(value.default);
                    value.range[0] = Float(value.range[0]);
                    value.range[1] = Float(value.range[1]);
                }
            }
        }

        // component upgrades
        if (this.minecraftObj["minecraft:entity"].components?.["minecraft:pushable"]?.is_pushable) {
            this.minecraftObj["minecraft:entity"].components["minecraft:pushable_by_entity"] = {};
            this.addWarning(`${this.Identifier} using deprectated "minecraft:pushable", replaced with "minecraft:pushable_by_entity"`);
        }
        if (this.minecraftObj["minecraft:entity"].components?.["minecraft:pushable"]?.is_pushable_by_piston) {
            this.minecraftObj["minecraft:entity"].components["minecraft:pushable_by_block"] = {}
            this.addWarning(`${this.Identifier} using deprectated "minecraft:pushable", replaced with "minecraft:pushable_by_block"`);
        }
        delete this.minecraftObj["minecraft:entity"].components?.["minecraft:pushable"];

        // Merge baseline
        const baseline: ServerEntityStrict = {
            format_version: "$FORMATVERSION",
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

    protected generate(): WriteableResponse<ModuleResponse> {
        const response = {
            endpoint: `BP/entities/${this.subpath}${this.Shortname}.json`,
            response: {
                name: `${this.Shortname}`,
                data: this.encode(),
                warnings: this.warnings,
            },
        };

        return response;
    }
}