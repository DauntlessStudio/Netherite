export interface ClientBlocks {
    [key: string]: unknown;
}

interface Block {
    sound?: string;
    ambient_occlusion_exponent?: number;
    carried_textures?: string;
    isotropic?: {
        up?: boolean;
        down?: boolean;
        north?: boolean;
        south?: boolean;
        east?: boolean;
        west?: boolean;
    }|boolean;
    textures?: {
        up?: string;
        down?: string;
        north?: string;
        south?: string;
        east?: string;
        west?: string;
        side?: string;
    }|string;
}