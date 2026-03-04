import { type ModuleResponse, type ModuleResponse, deepMerge } from "../../core/core.ts";
import type { ClientRenderControllerStrict, ClientRenderControllerLoose } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientRenderController extends MinecraftWriteable<ClientRenderControllerLoose, ClientRenderControllerStrict> {
    public static default(name: string): MinecraftClientRenderController {
        return new MinecraftClientRenderController({
                format_version: "1.10.0",
                render_controllers: {
                    [`controller.render.NAMESPACE.${name}`]: {
                        geometry: "Geometry.default",
                        materials: [
                            { "*": "Material.default" },
                        ],
                        textures: [
                            "Texture.default"
                        ]
                    }
                }
            }, name);
    }
    
    public get RenderController() : ClientRenderControllerLoose {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return `NAMESPACE:${this.name}`;
    }

    constructor(obj: ClientRenderControllerLoose, protected readonly name: string) {
        super(obj);
    }
    
    protected validate(): ClientRenderControllerStrict {
        const baseline: ClientRenderControllerStrict = {
            format_version: "1.10.0",
            render_controllers: {}
        }

        return deepMerge(baseline, this.minecraftObj);
    }

    protected generate(): ModuleResponse<ModuleResponse> {
        return {
            endpoint: `RP/render_controllers/${this.Shortname}.rc.json`,
            response: {
                name: this.Shortname,
                data: this.encode(),
            }
        }
    }
}