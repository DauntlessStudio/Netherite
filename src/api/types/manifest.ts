export interface Manifest {
    format_version: number;
    header: {
        name: string;
        uuid: string;
        version: number[];
        description?: string;
        pack_scope?: string;
        lock_template_options?: boolean;
        allow_random_seed?: boolean;
        min_engine_version?: number[];
        base_game_version?: number[];
    };
    modules: {
        type: string;
        uuid: string;
        version: number[];
        language?: string;
        entry?: string;
    }[];
    dependencies?: {
        uuid?: string;
        module_name?: string;
        version: number[]|string;
    }[];
    metadata?: {
        product_type?: string;
        authors?: string[];
    };
    capabilities?: ("script_eval" | "chemistry" | "editorExtension" | "experimental_custom_ui" | "pbr" | "raytraced")[];
}