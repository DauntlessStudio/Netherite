// deno-lint-ignore-file no-empty-interface
import type { DamageType } from "./damage_type.d.ts";
import type { ServerFilters } from "./filters.d.ts";
import type { MobEffect } from "./mob_effects.d.ts";

/**
 * Adds a rider to the entity. Requires `minecraft:rideable`
 */
interface AddRider {
    /**
     * The entity type that will be riding this entity
     */
    entity_type: string;
    /**
     * The spawn event that will be used when the riding entity is created
     */
    spawn_event?: string;
}

/**
 * Causes the mob to ignore attackable targets for a given duration
 */
interface AdmireItem {
    /**
     * Duration, in seconds, for shich the mob won't admire items if it was hurt
     * @default 0
     */
    cooldown_after_being_attacked: number;
    /**
     * Duration, in seconds, that the mob is pacified
     * @default 10
     */
    duration: number;
}

/**
 * Adds a timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by `feed_items`
 */
interface Ageable {
    /**
     * List of items that the entity drops when it grows up
     */
    drop_items: string[];
    /**
     * Amount of time before the entity grows up, -1 for always a baby
     * @default 1200.0
     */
    duration: number;
    /**
     * List of items that can be fed to the entity
     */
    feed_items: {
        /**
         * The item name
         */
        item: string, 
        /**
         * How much time it grows up by
         */
        growth: number
    }[];
    /**
     * The event to run when this entity grows up
     */
    grow_up: string;
    /**
     * List of conditions to meet in order for the entity to be fed
     */
    interact_filters: ServerFilters|ServerFilters[];
    /**
     * The item used will transform into this item on successful interaction
     */
    transform_to_item: string|`${string}:${number}`;
}

interface AmbientSoundInterval {
    value: number;
    range: number;
    event_name: string;
    event_names: {
        event_name: string;
        condition: string;
    }[];
}

/**
 * Allows this entity to track anger towards a set of nuisances
 */
interface AngerLevel {
    /**
     * Anger level will decay over time. Defines how often anger will be decreased by one
     * @default 1.0
     */
    anger_decrement_interval: number;
    /**
     * Anger boost applied to angry threshold when the mob gets angry
     * @default 20
     */
    angry_boost: number;
    /**
     * Threshold that defines when the mob is considered angry
     * @default 80
     */
    angry_threshold: number;
    /**
     * The default amount of annoyingness for any given nuisance. Specifies how much to raise anger level on each provocation
     * @default 0
     */
    default_annoyingness: string;
    /**
     * The maximum anger level that can be reached
     * @default 100
     */
    max_anger: number;
    /**
     * Filter that is applied to determine if a mob is a nuisance
     */
    nuisance_filter: ServerFilters|ServerFilters[];
    /**
     * Sounds to play when the mob is getting provoked. Evaluated in order; first matching condition wins
     */
    on_increase_sounds: {
        /**
         * A Molang expression describing the conditions under which to play this sound, given the entity was provoked
         */
        condition: string;
        /**
         * The sound to play
         */
        sound: string;
    }[];
    /**
     * Defines if the mob should remove a target if it falls below the angry threshold
     * @default true
     */
    remove_targets_below_angry_threshold: boolean;
}

/**
 * Defines the entity's angry state using a timer
 */
interface Angry {
    /**
     * The sound event to play when the mob is angry
     */
    angry_sound: string;
    /**
     * If true, family types specified in `broadcast_targets` within `broadcast_range` will also get angry
     * @default false
     */
    broadcast_anger: boolean;
    /**
     * If true, family types specified in `broadcast_targets` within `broadcast_range` will also get angry when this entity performs an attack
     * @default false
     */
    broadcast_anger_on_attack: boolean;
    /**
     * If true, family types specified in `broadcast_targets` within `broadcast_range` will also get angry when this entity is attacked
     * @default false
     */
    broadcast_anger_on_being_attacked: boolean;
    /**
     * If true, family types specified in `broadcast_targets` within `broadcast_range` will also get angry when this entity is killed
     * @default true
     */
    broadcast_anger_when_dying: boolean;
    /**
     * TODO: determine if this affects this entity or the entities it broadcasts to
     */
    broadcast_filters: ServerFilters|ServerFilters[];
    /**
     * The range in blocks that family types specified in `broadcast_targets` will recieve the angry broadcast
     * @default 20
     */
    broadcast_range: number;
    /**
     * A list of entity familes to broadcast anger to
     */
    broadcast_targets: string[];
    /**
     * Event to run after the number of seconds specified in `duration` expires
     */
    calm_event: string;
    /**
     * The amount of time in seconds that the entity will be angry
     * @default 25
     */
    duration: number;
    /**
     * Variance in seconds to modify the duration, i.e. `duration +|- duration_delta`
     * @default 0
     */
    duration_delta: number;
    /**
     * Filter out mob types that it should not attack while angry
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * The range of time in seconds to randomly wait before playing the sound again
     * @default [0,0]
     */
    sound_interval: [number, number];
}

/**
 * Allows the actor to break doors assuming that the flags are set up for the component to use in navigation
 */
interface Annotation_BreakDoor {
    /**
     * The time in seconds required to break through doors
     * @default 12.0
     */
    break_time: number;
    /**
     * The minimum world difficulty required for this entity to break doors
     * @default "hard"
     */
    min_difficulty: string;
}

/**
 * Allows the actor to open doors assuming that the flags are set up for the component to use in navigation
 */
interface Annotation_OpenDoor {}

/**
 * Allows the entity to deal damage to other entities within range
 */
interface AreaAttack {
    /**
     * The type of damage that is applied to entities matching `entity_filter` within `damage_range`
     */
    cause: DamageType;
    /**
     * The cooldown in seconds before the entity can deal damage to the same target again
     * @default 0
     */
    damage_cooldown: number;
    /**
     * How much damage is applied to entities matching `entity_filter` within `damage_range` per tick
     * @default 2
     */
    damage_per_tick: number;
    /**
     * The range in blocks that entities matching `entity_filter` will be damaged
     * @default 0.2
     */
    damage_range: number;
    /**
     * The filter that is applied to determine which entities will be damaged
     */
    entity_filter: ServerFilters|ServerFilters[];
    /**
     * If true, the entity will play their attack sound when damaging a target
     * @default true
     */
    play_attack_sound: boolean;
}

/**
 * Defines the entity's attack
 */
interface Attack {
    /**
     * The amount of damage the attack deals
     */
    damage: number;
    /**
     * A mob effect that is applied to the target
     */
    effect_name?: MobEffect;
    /**
     * The duration of the mob effect in seconds
     */
    effect_duration?: number;
}

/**
 * Adds an attack cooldown to a mob to prevent it from attempting to aquire new targets
 */
interface AttackCooldown {
    attack_cooldown_complete_event: string;
    attack_cooldown_time: [number, number];
}