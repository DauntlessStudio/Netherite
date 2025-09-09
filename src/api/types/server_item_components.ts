import type { DamageType } from "./damage_type.ts";

export interface ServerItemComponents {
    "minecraft:allow_off_hand"?: ServerItemAllowOffHand
    "minecraft:block_placer"?: ServerItemBlockPlacer
    "minecraft:bundle_interaction"?: ServerItemBundleInteraction
    "minecraft:can_destroy_in_creative"?: ServerItemCanDestroyInCreative
    "minecraft:compostable"?: ServerItemCompostable
    "minecraft:cooldown"?: ServerItemCooldown
    "minecraft:damage"?: ServerItemDamage
    "minecraft:damage_absorption"?: ServerItemDamageAbsorption
    "minecraft:digger"?: ServerItemDigger
    "minecraft:display_name"?: ServerItemDisplayName
    "minecraft:durability"?: ServerItemDurability
    "minecraft:durability_sensor"?: ServerItemDurabilitySensor
    "minecraft:dyeable"?: ServerItemDyeable
    "minecraft:enchantable"?: ServerItemEnchantable
    "minecraft:entity_placer"?: ServerItemEntityPlacer
    "minecraft:food"?: ServerItemFood
    "minecraft:fuel"?: ServerItemFuel
    "minecraft:glint"?: ServerItemGlint
    "minecraft:hand_equipped"?: ServerItemHandEquipped
    "minecraft:hover_text_color"?: ServerItemHoverTextColor
    "minecraft:icon"?: ServerItemIcon
    "minecraft:interact_button"?: ServerItemInteractButton
    "minecraft:liquid_clipped"?: ServerItemLiquidClipped
    "minecraft:max_stack_size"?: ServerItemMaxStackSize
    "minecraft:projectile"?: ServerItemProjectile
    "minecraft:rarity"?: ServerItemRarity
    "minecraft:record"?: ServerItemRecord
    "minecraft:repairable"?: ServerItemRepairable
    "minecraft:shooter"?: ServerItemShooter
    "minecraft:should_despawn"?: ServerItemShouldDespawn
    "minecraft:stacked_by_data"?: ServerItemStackedByData
    "minecraft:storage_item"?: ServerItemStorageItem
    "minecraft:storage_weight_limit"?: ServerItemStorageWeightLimit
    "minecraft:storage_weight_modifier"?: ServerItemStorageWeightModifier
    "minecraft:tags"?: ServerItemTags
    "minecraft:throwable"?: ServerItemThrowable
    "minecraft:use_animation"?: ServerItemUseAnimation
    "minecraft:use_modifiers"?: ServerItemUseModifiers
    "minecraft:wearable"?: ServerItemWearable
}

export type ServerItemAllowOffHand = boolean;

export interface ServerItemBlockPlacer {
    [key: string]: unknown;
    block?: string;
    use_on?: string[];
}

export interface ServerItemBundleInteraction {
    [key: string]: unknown;
    num_viewable_slots?: number;
}

export type ServerItemCanDestroyInCreative = boolean;

export interface ServerItemCompostable {
    [key: string]: unknown;
    composting_chance?: number;
}

export interface ServerItemCooldown {
    [key: string]: unknown;
    category?: string;
    duration?: number;
}

export type ServerItemDamage = number;

export interface ServerItemDamageAbsorption {
    [key: string]: unknown;
    absorbable_causes?: DamageType[];
}

export interface ServerItemDigger {
    [key: string]: unknown;
    use_efficiency?: boolean;
    destroy_speeds?: {
        block?: string|{tags: string};
        speed?: number;
    }[];
}

export interface ServerItemDisplayName {
    [key: string]: unknown;
    value?: string;
}

export interface ServerItemDurability {
    [key: string]: unknown;
    damage_chance?: {
        min?: number;
        max?: number;
    };
    max_durability?: number;
}

export interface ServerItemDurabilitySensor {
    [key: string]: unknown;
    durability_thresholds?: {
        durability?: number;
        particle_type?: string;
        sound_event?: string;
    }[];
}

export interface ServerItemDyeable {
    [key: string]: unknown;
    default_color?: number;
}

export interface ServerItemEnchantable {
    [key: string]: unknown;
    slot?: string;
    value?: number;
}

export interface ServerItemEntityPlacer {
    [key: string]: unknown;
    entity?: string;
    dispense_on?: string[];
    use_on?: string[];
}

export interface ServerItemFood {
    [key: string]: unknown;
    can_always_eat?: boolean;
    nutrition?: number;
    saturation_modifier?: number;
    using_converts_to?: string;
}

export interface ServerItemFuel {
    [key: string]: unknown;
    duration?: number;
}

export type ServerItemGlint = boolean;

export type ServerItemHandEquipped = boolean;

export type ServerItemHoverTextColor = string;

export type ServerItemIcon = string|{
    [key: string]: unknown;
    default?: string;
    dyed?: string;
    icon_trim?: string;
    bundle_open_back?: string;
    bundle_open_front?: string;
}

export type ServerItemInteractButton = string|boolean;

export type ServerItemLiquidClipped = boolean;

export type ServerItemMaxStackSize = number;

export interface ServerItemProjectile {
    [key: string]: unknown;
    minimum_critical_power?: number;
    projectile_entity?: string;
}

export type ServerItemRarity = "common"|"uncommon"|"rare"|"epic";

export interface ServerItemRecord {
    [key: string]: unknown;
    comparator_signal?: number;
    duration?: number;
    sound_event?: string;
}

export interface ServerItemRepairable {
    repair_items?: {
        items?: string[];
        repair_amount?: number|string;
    }[];
}

export interface ServerItemShooter {
    [key: string]: unknown;
    ammunition?: {
        item?: string;
        use_offhand?: boolean;
        search_inventory?: boolean;
        use_in_creative?: boolean;
    }[];
    max_draw_duration?: number;
    scale_power_by_draw_duration?: boolean;
    charge_on_draw?: boolean;
}

export type ServerItemShouldDespawn = boolean;

export type ServerItemStackedByData = boolean;

export interface ServerItemStorageItem {
    [key: string]: unknown;
    max_slots?: number;
    allow_nested_storage_items?: boolean;
    banned_items?: string[];
    max_weight_limit?: number;
}

export interface ServerItemStorageWeightLimit {
    [key: string]: unknown;
    max_weight_limit?: number;
}

export interface ServerItemStorageWeightModifier {
    [key: string]: unknown;
    weight_in_storage_item?: number;
}

export interface ServerItemTags {
    [key: string]: unknown;
    tags?: string[];
}

export interface ServerItemThrowable {
    [key: string]: unknown;
    do_swing_animation?: boolean;
    launch_power_scale?: number;
    max_draw_duration?: number;
    max_launch_power?: number;
    min_draw_duration?: number;
    scale_power_by_draw_duration?: boolean;
}

export type ServerItemUseAnimation = "eat"|"drink"|"bow"|"block"|"camera"|"crossbow"|"none"|"brush"|"spear"|"spyglass";

export interface ServerItemUseModifiers {
    [key: string]: unknown;
    movement_modifier?: number;
    use_duration?: number;
}

export interface ServerItemWearable {
    [key: string]: unknown;
    slot?: string;
    protection?: number;
    hides_player_location?: boolean;
}