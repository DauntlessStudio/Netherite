import { Molang } from "./molang.ts";

interface RGB {
    r: string|Molang;
    g: string|Molang;
    b: string|Molang;
}

interface RGBA extends RGB {
    a: string|Molang;
}

interface ClientRenderController {
    arrays?: {
        textures?: Record<string, string[]>;
        geometries?: Record<string, string[]>;
        materials?: Record<string, string[]>;
    },
    geometry: string;
    materials: Record<string, string>[];
    textures: string[];
    part_visibility?: Record<string, string|boolean|Molang>[];
    color?: RGBA;
    is_hurt_color?: RGBA;
    filter_lighting?: boolean;
    ignore_lighting?: boolean;
    light_color_multiplier?: number|Molang
}

export interface ClientRenderControllerStrict {
    format_version: "1.10.0";
    render_controllers: {
        [key: string]: ClientRenderController;
    };
}

export interface ClientRenderControllerLoose {
    format_version?: "1.10.0";
    render_controllers?: {
        [key: string]: ClientRenderController;
    };
}