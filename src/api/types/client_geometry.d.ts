type Vector3 = [number, number, number];

type Vector2 = [number, number];

interface ClientGeometryDescription {
    identifier: string;
    texture_width: number;
    texture_height: number;
    visible_bounds_width?: number;
    visible_bounds_height?: number;
    visible_bounds_offset?: Vector3;
}

interface ClientGeometryBone {
    name: string;
    parent?: string;
    pivot?: Vector3;
    mirror?: boolean;
    rotation?: Vector3;
    neverRender?: boolean;
    cubes?: ClientGeometryCube[];
}

interface ClientGeometryCube {
    origin?: Vector3;
    size?: Vector3;
    uv?: {
        north?: ClientGeometryUVFace;
        south?: ClientGeometryUVFace;
        east?: ClientGeometryUVFace;
        west?: ClientGeometryUVFace;
        down?: ClientGeometryUVFace;
        up?: ClientGeometryUVFace;
    }|Vector2;
    inflate?: number;
}

interface ClientGeometryUVFace {
    uv?: Vector2;
    uv_size?: Vector2;
}

interface ClientGeometryStrict_1_12_0 {
    format_version: "1.12.0";
    "minecraft:geometry": {
        description: ClientGeometryDescription;
        bones: ClientGeometryBone[];
    }[];
}

interface ClientGeometryLoose_1_12_0 {
    format_version?: "1.12.0";
    "minecraft:geometry": {
        description: Partial<ClientGeometryDescription>;
        bones?: ClientGeometryBone[];
    }[];
}

interface ClientGeometryStrict_1_8_0 {
    format_version: "1.8.0";
    [key: `geometry.${string}`]: {
        texturewidth?: number;
        textureheight?: number;
        visible_bounds_width?: number;
        visible_bounds_height?: number;
        visible_bounds_offset?: Vector3;
        bones: ClientGeometryBone[];
    };
}

interface ClientGeometryLoose_1_8_0 {
    format_version?: "1.8.0";
    [key: `geometry.${string}`]: {
        texturewidth?: number;
        textureheight?: number;
        visible_bounds_width?: number;
        visible_bounds_height?: number;
        visible_bounds_offset?: Vector3;
        bones: ClientGeometryBone[];
    };
}

export type ClientGeometryStrict = 
    | ClientGeometryStrict_1_12_0
    | ClientGeometryStrict_1_8_0;

export type ClientGeometryLoose = 
    | ClientGeometryLoose_1_12_0
    | ClientGeometryLoose_1_8_0;