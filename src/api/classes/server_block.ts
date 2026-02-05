import { type WorkerResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ServerBlockStrict, ServerBlockLoose } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

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

    public get Identifier() : string {
        return this.minecraftObj["minecraft:block"]?.description?.identifier ?? "NAMESPACE:SHORTNAME";
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

        return deepMerge(baseline, this.minecraftObj);
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