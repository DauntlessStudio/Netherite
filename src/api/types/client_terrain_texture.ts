export interface ClientTerrainTexture {
    num_mip_levels: number;
    padding: number;
    resource_pack_name: string;
    texture_name: "atlas.terrain";
    texture_data: {
        [key: string]: TerrainTextureData;
    }
}

export interface TerrainTextureData {
    quad?: number;
    textures: string|(string|TerrainTexture)[];
}

export interface TerrainTexture {
    path: string;
    overlay_color: string;
}