import type { ServerItemComponents } from "./server_item_components.ts";

interface ServerItemDescription {
    identifier: string;
    menu_category: {
        category: string;
        group?: string;
        is_hidden_in_commands?: boolean;
    }
}

export interface ServerItemStrict {
    format_version: string;
    "minecraft:item": {
        description: ServerItemDescription;
        components: ServerItemComponents;
    }
}

export interface ServerItemLoose {
    format_version?: string;
    "minecraft:item": {
        description?: Partial<ServerItemDescription>;
        components?: ServerItemComponents;
    }
}