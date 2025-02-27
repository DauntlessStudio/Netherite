export interface ClientItemTexture {
    resource_pack_name: string;
    texture_name: "atlas.items";
    texture_data: {
        [key: string]: ItemTextureData;
    }
}

interface ItemTextureData {
    textures: string|string[];
}