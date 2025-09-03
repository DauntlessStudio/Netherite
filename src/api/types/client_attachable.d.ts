import type { Molang } from "./index.d.ts";

interface ClientAttachableDescription {
    identifier: string;
    item?: { [key: string]: Molang };
    textures: { [key: string]: string };
    geometry: { [key: string]: string };
    materials: { [key: string]: string };
    animations?: { [key: string]: string };
    sound_effects?: { [key: string]: string };
    particle_effects?: { [key: string]: string };
    particle_emitters?: { [key: string]: string };
    scripts?: ClientAttachableScripts;
    render_controllers: (string|{ [key: string]: Molang })[];
}

interface ClientAttachableScripts {
    scale?: Molang;
    scalex?: Molang;
    scaley?: Molang;
    scalez?: Molang;
    variables?: {
        [key: string]: "public";
    };
    animate?: string[];
    initialize?: string[];
    parent_setup?: string;
    pre_animation?: string[];
    should_update_effects_offscreen?: boolean;
    should_update_bones_and_effects_offscreen?: boolean;
}

export interface ClientAttachableStrict {
    format_version: "1.10.0";
    "minecraft:client_attachable": {
        description: ClientAttachableDescription;
    }
}

export interface ClientAttachableLoose {
    format_version?: "1.10.0";
    "minecraft:client_attachable": {
        description: Partial<ClientAttachableDescription>;
    }
}