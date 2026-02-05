// deno-lint-ignore-file no-empty-interface
import type { Molang } from "./molang.ts";

export type BlockVector = [number, number, number];

export type BlockCollisionBox = boolean | {
  origin?: BlockVector;
  size?: BlockVector;
};

export interface BlockCraftingTable {
  table_name?: string;
  crafting_tags?: string[];
}

export type BlockDestructibleByExplosion = boolean | {
  explosion_resistance?: number;
};

export type BlockDestructibleByMining = boolean | {
  seconds_to_destroy?: number;
};

export interface BlockDestructionParticles {
  particle_count?: number;
  texture?: string;
  tint_method?: string;
}

export type BlockDisplayName = string;

export interface BlockEmbeddedVisual {
  geometry?: BlockGeometry;
  material_instances?: BlockMaterialInstances;
}

export interface BlockEntityFallOn {
  min_fall_distance?: number;
}

export type BlockFlammable = boolean | {
    catch_chance_modifier?: number;
    destroy_chance_modifier?: number;
};

export interface BlockFlowerPottable {
}

export type BlockFriction = number;

export type BlockGeometry = string | {
  identifier?: string;
  culling?: string;
  bone_visibility?: {
    [key: string]: boolean | Molang;
  };
  uv_lock?: boolean | string[];
};

export interface BlockItemVisual {
  geometry?: BlockGeometry;
  material_instances?: BlockMaterialInstances;
}

export type BlockLightDampening = number;

export type BlockLightEmission = number;

export interface BlockLiquidDetection {
  detection_rules?: {
    liquid_type?: "water";
    can_contain_liquid?: boolean;
    on_liquid_touches?: "blocking" | "broken" | "no_reaction" | "popped";
    stops_liquid_flowing_from_direction?: string[];
  }[];
}

export type BlockLoot = string;

export type BlockMapColor = string | BlockVector | {
    color?: string;
    tint_method?: string;
};

export interface BlockMaterialInstances {
  [key: string]: {
    texture?: string;
    render_method?: string;
    tint_method?: "alpha_test" | "alpha_test_single_sided" | "blend" | "double_sided" | "opaque" | "alpha_test_to_opaque" | "alpha_test_single_sided_to_opaque" | "blend_to_opaque";
    ambient_occlusion?: boolean | number;
    face_dimming?: boolean;
    isotropic?: boolean;
  };
}

export type BlockMovementType = "immovable" | "popped" | "push" | "push_pull";

export interface BlockMovable {
  movement_type?: BlockMovementType;
  sticky?: BlockMovementType | "same";
}

export type BlockFace = "side" | "down" | "up" | "north" | "south" | "west" | "east";

export interface BlockPlacementFilter {
  conditions?: {
    allowed_faces?: ("all" | BlockFace)[];
    block_filter?: string | {
      name?: string;
      tags?: string;
      states?: {
        [key: string]: string | number | boolean;
      };
    };
  }[];
}

export interface BlockPrecipitationInteractions {
  precipitation_behavior?: "none" | "obstruct_rain" | "obstruct_rain_accumulate_snow";
}

export interface BlockRandomOffsetEntry {
  steps?: number;
  range?: {
    min?: number;
    max?: number;
  };
}

export interface BlockRandomOffset {
  x: BlockRandomOffsetEntry;
  y: BlockRandomOffsetEntry;
  z: BlockRandomOffsetEntry;
}

export interface BlockRedstoneConductivity {
  redstone_conductor?: boolean;
  allows_wire_to_step_down?: boolean;
}

export interface BlockRedstoneProducer {
  power?: number;
  strongly_powered_face?: BlockFace;
  connected_faces?: BlockFace[];
  transform_relative?: boolean;
}

export interface BlockReplaceable {
}

export type BlockSelectionBox = boolean | {
  origin?: BlockVector;
  size?: BlockVector;
};

export interface BlockTick {
  interval_range?: [number, number];
  looping?: boolean;
}

export interface BlockTransformation {
  rotation?: BlockVector;
  rotation_pivot?: BlockVector;
  scale?: BlockVector;
  scale_pivot?: BlockVector;
  translation?: BlockVector;
}

export interface BlockComponents {
    "minecraft:collision_box"?: BlockCollisionBox;
    "minecraft:crafting_table"?: BlockCraftingTable;
    "minecraft:destructible_by_explosion"?: BlockDestructibleByExplosion;
    "minecraft:destructible_by_mining"?: BlockDestructibleByMining;
    "minecraft:destruction_particles"?: BlockDestructionParticles;
    "minecraft:display_name"?: BlockDisplayName;
    "minecraft:embedded_visual"?: BlockEmbeddedVisual;
    "minecraft:entity_fall_on"?: BlockEntityFallOn;
    "minecraft:flammable"?: BlockFlammable;
    "minecraft:flower_pottable"?: BlockFlowerPottable;
    "minecraft:friction"?: BlockFriction;
    "minecraft:geometry"?: BlockGeometry;
    "minecraft:item_visual"?: BlockItemVisual;
    "minecraft:light_dampening"?: BlockLightDampening;
    "minecraft:light_emission"?: BlockLightEmission;
    "minecraft:liquid_detection"?: BlockLiquidDetection;
    "minecraft:loot"?: BlockLoot;
    "minecraft:map_color"?: BlockMapColor;
    "minecraft:material_instances"?: BlockMaterialInstances;
    "minecraft:movable"?: BlockMovable;
    "minecraft:placement_filter"?: BlockPlacementFilter;
    "minecraft:precipitation_interactions"?: BlockPrecipitationInteractions;
    "minecraft:random_offset"?: BlockRandomOffset;
    "minecraft:redstone_conductivity"?: BlockRedstoneConductivity;
    "minecraft:redstone_producer"?: BlockRedstoneProducer;
    "minecraft:replaceable"?: BlockReplaceable;
    "minecraft:selection_box"?: BlockSelectionBox;
    "minecraft:tick"?: BlockTick;
    "minecraft:transformation"?: BlockTransformation;
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}