import type { Molang } from "./index.ts";

type AnimVector3 = [number|Molang, number|Molang, number|Molang];
type AnimVector2 = [number|Molang, number|Molang];
type Timeline = {
    [key: string]: AnimVector3|number|Molang|{
        pre: AnimVector3;
        post: AnimVector3;
        lerp_mode?: string;
    }
}

interface ClientAnimation {
    [key: string]: unknown;
    loop?: boolean|"hold_on_last_frame",
    bones?: {
        [key: string]: ClientAnimationBone
    }
    timeline?: Timeline,
}

interface ClientAnimationBone {
    [key: string]: unknown;
    rotation?: AnimVector3|number|Molang|Timeline;
    position?: AnimVector3|number|Molang|Timeline;
    scale?: AnimVector3|number|Molang|Timeline;
}

export interface ClientAnimationStrict {
    format_version: "1.10.0";
    "animations": {
        [key: string]: ClientAnimation;
    }
}

export interface ClientAnimationLoose {
    format_version?: "1.10.0";
    "animations"?: {
        [key: string]: ClientAnimation;
    }
}