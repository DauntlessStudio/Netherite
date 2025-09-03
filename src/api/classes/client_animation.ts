import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientAnimationLoose, ClientAnimationStrict } from "../types/index.d.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientAnimation extends MinecraftWriteable<ClientAnimationLoose, ClientAnimationStrict> {
    public static skeletalAttachable(name: string): MinecraftClientAnimation {
        return new MinecraftClientAnimation({
            format_version: "1.10.0",
            animations: {
                [`animation.NAMESPACE.${name}.blockbench_fix`]: { "loop": true, "bones": { "rightArm": { "rotation": [95, -45, 115], "position": [13.5, -10, 12] }, "rightItem": { "position": [0, 0, -1] } } },
                [`animation.NAMESPACE.player.${name}.idle.first_person`]: { loop: true, override_previous_animation: true, blend_weight: `v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${"NAMESPACE:" + name}')`, bones: { [name]: { rotation: [-40, 60, -40], position: [-3, 0, 0] } } },
                [`animation.NAMESPACE.player.${name}.idle.third_person`]: { loop: true, override_previous_animation: true, blend_weight: `!v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${"NAMESPACE:" + name}')`, bones: { rightArm: { rotation: [-30, 0, 0] } } },
                [`animation.NAMESPACE.player.${name}.attack.first_person`]: { loop: "hold_on_last_frame", animation_length: 0.5, override_previous_animation: true, blend_weight: `v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${"NAMESPACE:" + name}')`, bones: { [name]: { "rotation": { "0.0": [-40, 60, -40], "0.1": { "pre": [-33, 56, -60], "post": [-33, 56, -60], "lerp_mode": "catmullrom" }, "0.2": [-39, 57, -81], "0.3": [-90, 40, -100], "0.4": [-40, 60, -40], "0.5": [-40, 60, -40] }, "position": { "0.0": [-3, 0, 0], "0.1": { "pre": [-3, 4, -8], "post": [-3, 4, -8], "lerp_mode": "catmullrom" }, "0.2": [19, -8, -10], "0.3": [23, -10, -15], "0.4": [17, -10, -11], "0.5": [-3, 0, 0] } } }, timeline: { 0.0: "v.playing_custom_attack = 1;", 0.5: "v.playing_custom_attack = 0;" } },
                [`animation.NAMESPACE.player.${name}.attack.third_person`]: { loop: "hold_on_last_frame", override_previous_animation: true, blend_weight: `!v.is_first_person && q.is_item_name_any('slot.weapon.mainhand', 0, '${"NAMESPACE:" + name}')`, animation_length: 0.3, timeline: { "0": "v.playing_custom_attack = 1;", 0.3: "v.playing_custom_attack = 0;" }, bones: { rightArm: { rotation: { 0.0: [-90, 0, 0], 0.1: [-100, 20, 0], 0.2: [-100, -20, 0], 0.3: [-90, 0, 0] } } } },
                [`animation.NAMESPACE.item.${name}.idle.first_person`]: { loop: true, bones: {} },
                [`animation.NAMESPACE.item.${name}.idle.third_person`]: {},
                [`animation.NAMESPACE.item.${name}.attack.first_person`]: { loop: "hold_on_last_frame", animation_length: 0.5, bones: { [name]: { "rotation": { "0.0": [-40, 60, -40], "0.1": { "pre": [-33, 56, -60], "post": [-33, 56, -60], "lerp_mode": "catmullrom" }, "0.2": [-39, 57, -81], "0.3": [-90, 40, -100], "0.4": [-40, 60, -40], "0.5": [-40, 60, -40] }, "position": { "0.0": [-3, 0, 0], "0.1": { "pre": [-3, 4, -8], "post": [-3, 4, -8], "lerp_mode": "catmullrom" }, "0.2": [19, -8, -10], "0.3": [23, -10, -15], "0.4": [17, -10, -11], "0.5": [-3, 0, 0] } } }, timeline: { 0.0: "v.playing_custom_attack = 1;", 0.5: "v.playing_custom_attack = 0;" } },
                [`animation.NAMESPACE.item.${name}.attack.third_person`]: {},
            }
        }, name);
    }

    public get Identifier() : string {
        return this.name;
    }

    constructor(obj: ClientAnimationLoose, protected readonly name: string) {
        super(obj);
    }
    
    protected validate(): ClientAnimationStrict {
        return this.minecraftObj as ClientAnimationStrict;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        return {
            endpoint: `RP/animations/${this.name}.anim.json`,
            response: {
                name: name,
                data: this.encode(),
            }
        }
    }
}