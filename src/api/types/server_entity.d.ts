import type { ServerFilters } from "./filters.d.ts";
import type { Components } from "./server_entity_components.d.ts";

interface Property {
    client_sync?: boolean;
    type: "float"|"int"|"enum"|"bool";
}

interface FloatProperty extends Property {
    type: "float";
    // TODO: add float type so this can maintain precision
    default: number;
    range: [number, number];
}

interface IntProperty extends Property {
    type: "int";
    default: number;
    range: [number, number];
}

interface EnumProperty extends Property {
    type: "enum";
    default: string;
    values: string[];
}

interface BoolProperty extends Property {
    type: "bool";
    default: boolean;
}

type PropertyType = FloatProperty | IntProperty | EnumProperty | BoolProperty;

interface Description {
    identifier: string;
    is_spawnable: boolean;
    is_summonable: boolean;
    spawn_category?: string;
    is_experimental?: boolean;
    runtime_identifier?: string;
    animations?: {[key: string]: string};
    scripts?: {
        animate: (string | {[key: string]: string})[];
    },
    properties?: {
        [key: string]: PropertyType;
    }
}

interface Events {
    add?: {
        component_groups: string[];
    };
    remove?: {
        component_groups: string[];
    };
    trigger?: string;
    randomize?: Events[];
    sequence?: Events[];
    set_property?: {
        [key: string]: string|number|boolean;
    };
    filters?: ServerFilters|ServerFilters[];
    queue_command?: {
        command: string|string[];
    }
}

export interface ServerEntityStrict {
    format_version: string;
    "minecraft:entity": {
        description: Description;
        component_groups: {
            [key: string]: Components;
        };
        components: Components;
        events: {
            [key: string]: Events;
        }
    }
}

export interface ServerEntityLoose {
    format_version?: string;
    "minecraft:entity": {
        description?: Partial<Description>;
        component_groups?: {
            [key: string]: Components;
        };
        components?: Components;
        events?: {
            [key: string]: Events;
        }
    }
}