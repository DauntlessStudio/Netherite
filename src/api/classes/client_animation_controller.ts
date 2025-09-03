import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientAnimationControllerLoose, ClientAnimationControllerStrict } from "../types/index.d.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientAnimationController extends MinecraftWriteable<ClientAnimationControllerLoose, ClientAnimationControllerStrict> {
    public static skeletalAttachable(name: string): MinecraftClientAnimationController {
        return new MinecraftClientAnimationController({
            format_version: "1.10.0",
            animation_controllers: {
                [`controller.animation.NAMESPACE.item.custom_items.${name}`]: {
                    initial_state: 'idle',
                    states: {
                        idle: {
                            animations: [
                                {
                                    [`${name}.idle.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${name}.idle.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    attack: "query.is_using_item || query.is_name_any('§a§t§t§a§c§k§e§r')"
                                }
                            ],
                            blend_transition: 0.2
                        },
                        attack: {
                            animations: [
                                {
                                    [`${name}.attack.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${name}.attack.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    idle: "q.any_animation_finished && !query.is_using_item"
                                },
                                {
                                    escape_attack: "q.any_animation_finished && query.is_using_item"
                                }
                            ],
                            blend_transition: 0.2
                        },
                        escape_attack: {
                            animations: [
                                {
                                    [`${name}.idle.first_person`]: "v.is_first_person"
                                },
                                {
                                    [`${name}.idle.third_person`]: "!v.is_first_person"
                                }
                            ],
                            transitions: [
                                {
                                    idle: "!query.is_using_item"
                                }
                            ],
                            blend_transition: 0.2
                        }
                    }
                }
            }
        }, name);
    }

    public get Identifier() : string {
        return this.name;
    }

    constructor(obj: ClientAnimationControllerLoose, protected readonly name: string) {
        super(obj);
    }
    
    protected validate(): ClientAnimationControllerStrict {
        return this.minecraftObj as ClientAnimationControllerStrict;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        return {
            endpoint: `RP/animation_controllers/${this.name}.ac.json`,
            response: {
                name: name,
                data: this.encode(),
            }
        }
    }
}