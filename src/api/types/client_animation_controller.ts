interface ClientAnimationController {
    initial_state?: string;
    states: {
        [key: string]: ClientAnimationControllerState
    }
}

interface ClientAnimationControllerState {
    animations?: (string|{[key: string]: string})[];
    transitions?: {[key: string]: string}[];
    blend_transition?: number;
    on_entry?: string[];
    on_exit?: string[];
}

export interface ClientAnimationControllerStrict {
    format_version: "1.10.0";
    "animation_controllers": {
        [key: string]: ClientAnimationController;
    }
}

export interface ClientAnimationControllerLoose {
    format_version?: "1.10.0";
    "animation_controllers"?: {
        [key: string]: ClientAnimationController;
    }
}