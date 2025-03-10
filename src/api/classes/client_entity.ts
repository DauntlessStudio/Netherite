import { type WorkerResponse, type ModuleWriteable, type ProjectOptions, type ModuleResponse, WorkerWriter } from "../../core/classes/index.ts";
import { deepMerge, keywordReplacer } from "../../core/utils/index.ts";
import type { ClientEntityStrict, ClientEntityLoose } from "../types/index.d.ts";

export class MinecraftClientEntity implements ModuleWriteable {
    // #region Static

    private static validate(entity: ClientEntityLoose, options: ProjectOptions): ClientEntityStrict {
        if (!entity["minecraft:client_entity"]?.description?.identifier) {
            throw new Error("Entity identifier is required");
        }

        if (!entity["minecraft:client_entity"].description.identifier.includes(":")) {
            entity["minecraft:client_entity"].description.identifier = `${options.namespace}:${entity["minecraft:client_entity"].description.identifier}`;
        }

        const textures = entity["minecraft:client_entity"].description.textures;
        if (textures) {
            const path = `${options.namespace.replace("_", "/")}`;
            for (const [key, value] of Object.entries(textures)) {
                textures[key] = value.replace(/NAMESPACE/g, path);
            }
        }

        const baseline: ClientEntityStrict = {
            format_version: options.formatVersion,
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

        return deepMerge(baseline, entity);
    }

    private static encode(entity: MinecraftClientEntity, options: ProjectOptions): Uint8Array {
        let content = JSON.stringify(entity, null, "\t");
        content = keywordReplacer(content, options);
        content = content.replace(/SHORTNAME/g, entity.Shortname);
        content = content.replace(/IDENTIFIER/g, entity.Identifier);

        return new TextEncoder().encode(content);
    }

    // #endregion

    protected entity: ClientEntityLoose;
    
    public get Identifier() : string {
        return this.entity["minecraft:client_entity"].description.identifier ?? "NAMESPACE:SHORTNAME";
    }
    
    public get Shortname() : string {
        return this.Identifier.split(":")[1];
    }
    
    constructor(entity: ClientEntityLoose) {
        WorkerWriter.register(this);
        this.entity = entity as ClientEntityStrict;
    }

    public modify(entity: ClientEntityLoose): MinecraftClientEntity {
        this.entity = deepMerge(this.entity, entity);
        return this;
    }

    public generate(options: ProjectOptions): WorkerResponse<ModuleResponse> {
        this.entity = MinecraftClientEntity.validate(this.entity, options);

        return {
            endpoint: "minecraft_client_entity",
            response: {
                name: this.Shortname,
                data: MinecraftClientEntity.encode(this, options),
            }
        }
    }
}