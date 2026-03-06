type MinMax = { min: number; max: number; };

interface ServerLootFunctions {
    setCount: {
        function: "set_count";
        count: MinMax;
    };
    setName: {
        function: "set_name";
        name: string;
    };
    setLore: {
        function: "set_lore";
        lore: string[];
    };
    setData: {
        function: "set_data";
        data: number|MinMax;
    };
    randomBlockState: {
        function: "random_block_state";
        block_state: string;
        values: number|MinMax;
    };
    randomAuxValue: {
        function: "random_aux_value";
        values: number|MinMax;
    };
    setDamage: {
        function: "set_damage";
        damage: number|MinMax;
    };
    furnaceSmelt: {
        function: "furnace_smelt";
    };
    setBookContents: {
        function: "set_book_contents";
        title: string;
        author: string;
        pages: string[];
    };
    explorationMap: {
        function: "exploration_map";
        destination: string;
    };
    setBannerDetails: {
        function: "set_banner_details";
        type: 0|1;
    };
    randomDye: {
        function: "random_dye";
    };
    setActorId: {
        function: "set_actor_id";
        id: string;
    };
    fillContainer: {
        function: "fill_container";
        loot_table: string;
    }
    enchantWithLevels: {
        function: "enchant_with_levels";
        treasure?: boolean;
        levels?: number|MinMax;
    };
    enchantBookForTrading: {
        function: "enchant_book_for_trading";
        base_cost: number;
        base_random_cost: number;
        per_level_cost: number;
        per_level_random_cost: number;
    };
    enchantRandomly: {
        function: "enchant_randomly";
    };
    enchantRandomGear: {
        function: "enchant_random_gear";
        chance: number;
    };
    specificEnchants: {
        function: "specific_enchants";
        enchants: {
            id: string;
            level: [number, number];
        }[];
    };
    setDataFromColorIndex: {
        function: "set_data_from_color_index";
    };
}

export type ServerLootItemFunction = ServerLootFunctions[keyof ServerLootFunctions];