import type { Molang } from "./index.ts";

interface ClientEntityDescription {
    identifier: string;
    textures: { [key: string]: string };
    geometry: { [key: string]: string };
    materials: { [key: string]: string };
    animations?: { [key: string]: string };
    sound_effects?: { [key: string]: string };
    particle_effects?: { [key: string]: string };
    particle_emitters?: { [key: string]: string };
    scripts?: ClientEntityScripts;
    enable_attachables?: boolean;
    held_item_ignores_lighting?: boolean;
    hide_armor?: boolean;
    queryable_geometry?: string;
    spawn_egg?: ClientEntitySpawnEgg;
    render_controllers: (string|{ [key: string]: Molang })[];
}

interface ClientEntityScripts {
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

interface ClientEntitySpawnEggColor {
    base_color: string;
    overlay_color: string;
}

interface ClientEntitySpawnEggTexture {
    texture: string;
    texture_index?: number;
}

type ClientEntitySpawnEgg = ClientEntitySpawnEggColor | ClientEntitySpawnEggTexture;

export interface ClientEntityStrict {
    format_version: string;
    "minecraft:client_entity": {
        description: ClientEntityDescription;
    }
}

export interface ClientEntityLoose {
    format_version?: string;
    "minecraft:client_entity": {
        description: Partial<ClientEntityDescription>;
    }
}