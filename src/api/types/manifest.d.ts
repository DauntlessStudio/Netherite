export interface Manifest {
    format_version: number;
    header: {
        name: string;
        description: string;
        uuid: string;
        pack_scope?: string;
        version: number[];
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
}