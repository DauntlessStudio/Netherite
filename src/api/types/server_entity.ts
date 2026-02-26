// deno-lint-ignore-file ban-types
import type { ServerFilters, ServerFilterSubject } from "./filters.ts";
import type { Float } from "./float.ts";
import type { Components } from "./server_entity_components.ts";

interface ServerEntityProperty {
    client_sync?: boolean;
    type: "float"|"int"|"enum"|"bool";
}

interface ServerEntityFloatProperty extends ServerEntityProperty {
    type: "float";
    default: Float;
    range: [Float, Float];
}

interface ServerEntityIntProperty extends ServerEntityProperty {
    type: "int";
    default: number;
    range: [number, number];
}

interface ServerEntityEnumProperty extends ServerEntityProperty {
    type: "enum";
    default: string;
    values: string[];
}

interface ServerEntityBoolProperty extends ServerEntityProperty {
    type: "bool";
    default: boolean;
}

type ServerEntityPropertyType = ServerEntityFloatProperty | ServerEntityIntProperty | ServerEntityEnumProperty | ServerEntityBoolProperty;

interface ServerEntityDescription {
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
        [key: string]: ServerEntityPropertyType;
    }
}

interface ServerEntityEvents {
    add?: {
        component_groups: string[];
    };
    remove?: {
        component_groups: string[];
    };
    trigger?: string;
    randomize?: ServerEntityEvents[];
    sequence?: ServerEntityEvents[];
    set_property?: {
        [key: string]: string|number|boolean;
    };
    filters?: ServerFilters|ServerFilters[];
    queue_command?: {
        command: string|string[];
        target?: ServerFilterSubject;
    },
    reset_target?: {},
}

export interface ServerEntityStrict {
    format_version: string;
    "minecraft:entity": {
        description: ServerEntityDescription;
        component_groups: {
            [key: string]: Components;
        };
        components: Components;
        events: {
            [key: string]: ServerEntityEvents;
        }
    }
}

export interface ServerEntityLoose {
    format_version?: string;
    "minecraft:entity": {
        description?: Partial<ServerEntityDescription>;
        component_groups?: {
            [key: string]: Components;
        };
        components?: Components;
        events?: {
            [key: string]: ServerEntityEvents;
        }
    }
}