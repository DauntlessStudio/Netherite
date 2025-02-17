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

/**
 * Enables the entity to drop an item as a barter exchange
 */
interface Barter {
    /**
     * A loot table used to drop a random item
     */
    barter_table: string;
    /**
     * Duration in seconds that the mob won't barter after being hurt
     * @default 0
     */
    cooldown_after_being_attacked: number
}

/**
 * Allows the player to detect and maneuver on the scaffold block
 */
interface BlockClimber {}

/**
 * Fires an event when a block is broken in range
 */
interface BlockSensor {
    /**
     * A list of blocks and events to fire when a block is broken. If a block is in multiple lists, multiple events will be fired
     */
    on_break: {
        /**
         * List of blocks to fire the event for
         */
        block_list: string[];
        /**
         * The event to fire when a block is broken
         */
        on_block_broken: string;
    }[];
    /**
     * The range in blocks that the sensor will detect block breaks. Max range is 32.0
     * @default 16.0
     */
    sensor_radius: number;
    /**
     * Filters applied to the entity breaking the block to determine if the event should be fired
     */
    sources: ServerFilters|ServerFilters[];
}

/**
 * A rideable entity's boost
 */
interface Boostable {
    /** 
     * List of items that can be used to boost while riding this entity.
    */
    boost_items: {
        /**
         * The damage the item will take each time it is used
         * @default 1
         */
        damage: number;
        /**
         * The item name
         */
        item: string;
        /**
         * The item will transform into this item when used up
         */
        replace_item: string;
    };
    /**
     * The duration of the boost in seconds
     */
    duration: number;
    /**
     * Factor of speed increase. TODO: account for absence in format verions below 1.20.x
     * @default 1.35
     */
    speed_multiplier: number;
}

/**
 * Defines the effects for boss entities
 */
interface Boss {
    /**
     * The max distance in blocks that the boss can be from the player for the health bar to be displayed
     * @default 55
     */
    hud_range: number;
    /**
     * The name that will be displayed above the boss's health bar
     */
    name: string;
    /**
     * Should the sky darken if the boss is present
     */
    should_darken_sky: boolean;
}

/**
 * Specifies the blocks this entity can break as it moves around
 */
interface BreakBlocks {
    /**
     * A list of the blocks that can be broken when the entity moves
     */
    breakable_blocks: string[];
}

/**
 * Defines what blocks the entity can breathe in and gives them the ability to suffocate
 */
interface Breathable {
    /**
     * List of blocks this entity can breathe in, in addition to the other parameters
     */
    breathe_blocks: string[];
    /**
     * If true, the entity can breathe in air
     * @default true
     */
    breathes_air: boolean;
    /**
     * If true, the entity can breathe in lava
     * @default true
     */
    breathes_lava: boolean;
    /**
     * If true, the entity can breathe in water
     * @default false
     */
    breathes_water: boolean;
    /**
     * If true, the entity can breathe in solid blocks
     * @default false
     */
    breathes_solids: boolean;
    /**
     * If true, the entity can generate bubbles underwater
     * @default true
     */
    generate_bubbles: boolean;
    /**
     * The time in seconds the entity needs to recover its breath
     * @default 0
     */
    inhale_time: number;
    /**
     * List of blocks the entity cannot breathe in, in addition to the other parameters
     */
    non_breathe_blocks: string[];
    /**
     * TODO: check if this is in seconds or ticks
     * The time in seconds between taking suffocation damage
     * @default 2
     */
    suffocate_time: number;
    /**
     * The time in seconds the entity can hold its breath
     * @default 15
     */
    total_supply: number;
}

/**
 * Defines the way the entity can get into the "love" state
 */
interface Breedable {
    /**
     * If true, the entity can breed while sitting
     * @default false
     */
    allow_sitting: boolean;
    /**
     * If true, the entity will blend their attributes in the offsprint
     * @default true
     */
    blend_attributes: boolean;
    /**
     * Time in seconds before the entity can breed again
     * @default 60
     */
    breed_cooldown: number;
    /**
     * List of items that can be used to get the entity into the "love" state
     */
    breed_items: string[];
    /**
     * List of entity definitions that this entity can breed with
     */
    breeds_with: {
        /**
         * The entity definition of the baby this will produce
         */
        baby_type: string;
        /**
         * The event to run when the entity breeds
         */
        breed_event: string;
        /**
         * The entity definition of the mate
         */
        mate_type: string;
    }[];
    /**
     * If true, the entity will become pregnant instead of spawning a baby
     * @default false
     */
    causes_pregnancy: boolean;
    /**
     * Determines the likelihood of a random variant mutation not shared by either parent
     */
    deny_parents_variant: {
        /**
         * The percentage chance of denying the parent's variant
         */
        chance: number;
        /**
         * The inclusive maximum of the variant range
         */
        max_variant: number;
        /**
         * The inclusive minimum of the variant range
         */
        min_variant: number;
    };
    /**
     * The list of nearby block requirements to get the entity into the "love" state
     */
    environment_requirements: {
        /**
         * The list of blocks that must be nearby
         */
        blocks: string[];
        /**
         * The number of the required blocks that must be nearby
         */
        count: number;
        /**
         * The distance in blocks that the blocks must be within. Between 0-16
         */
        radius: number;
    }[];
    /**
     * Chance that up to 16 babies will spawn. Between 0-1
     * @default 0
     */
    extra_baby_chance: number;
    /**
     * If true, the babies will be automatically tamed if its parents are
     * @default true
     */
    inherit_tamed: boolean;
    /**
     * The filters to run when attempting to fall in love
     */
    love_filters: ServerFilters|ServerFilters[];
    /**
     * Determines how likely the babies are to **not** inherite one of their parent's variances. Values between 0.0-1.0
     */
    mutation_factor: {
        /**
         * The percentage chance of the offspring getting its color as if spawned rather than inheriting color from its parents
         * @default 0.0
         */
        color: number;
        /**
         * The percentage chance of a mutation on the entity's mark variant type
         * TODO: Check if this means mark_variant
         * @default 0.0
         */
        extra_variant: number;
        /**
         * The percentage chance of a mutation on the entity's variant type
         * @default 0.0
         */
        variant: number;
    };
    /**
     * Strategy used for mutating variants and mark variants for offpsring
     */
    mutation_strategy: "random"|"none";
    /**
     * [EXPERIMENTAL] List of attributes that should benefit from parent centric attribute blending
     */
    parent_centric_attribute_blending: string[];
    /**
     * List of entity  properties that should be inherited from the parent entities and potentially mutated
     * TODO: look into what potential mutations it means
     */
    property_inheritance: string[];
    /**
     * Range used to determine random mark variant
     * @default [0,0]
     */
    random_extra_variant_mutation_inverval: [number, number];
    /**
     * Range used to determine random variant
     * @default [0,0]
     */
    random_variant_mutation_inverval: [number, number];
    /**
     * If true, the entity needs to be full health before it can breed
     * @default false
     */
    require_full_health: boolean;
    /**
     * If true, the entity needs to be tamed before it can breed
     * @default true
     */
    require_tame: boolean;
    /**
     * The breed item will transform to this item on successful interaction
     */
    transform_to_item: string;
}

/**
 * Defines the way an entity can be bribed
 */
interface Bribeable {
    /**
     * Time in seconds before the entity can be bribed again
     * @default 2.0
     */
    bribe_cooldown: number;
    /**
     * List of items that can be used to bribe the entity
     */
    bribe_items: string[];
}

/**
 * Enables an entity to float on the specified liquid blocks
 */
interface Buoyant {
    /**
     * Applies gravity each tick. Causes more of a wave simulation but will cause more gravity to be applied outside liquids. Will override `gravity: false` on the `minecraft:physics` component
     * @default true
     */
    apply_gravity: boolean;
    /**
     * Base buoyancy used to calculate how much an entity will float
     * @default 1.0
     */
    base_buoyancy: number;
    /**
     * Probability for a big wave hitting the entity. Only used if `siumulate_waves` is true
     * @default 0.03
     */
    big_wave_probability: number;
    /**
     * Multiplier for the speed to make a big wave
     * @default 10.0
     */
    big_wave_speed: number;
    /**
     * How much an actor will be dragged down when this component is removed
     * @default 0.0
     */
    drag_down_on_buoyancy_removed: number;
    /**
     * List of blocks this entity can float on. Must be a liquid block
     */
    liquid_blocks: string[];
    /**
     * Should the movement simulate waves going through
     * @default true
     */
    simulate_waves: boolean;
}

/**
 * Specifies if a mob burns in daylight
 */
interface BurnsInDaylight {}

/**
 * Determines if this entity can join an existing raid
 */
interface CanJoinRaid {}

/**
 * Specifies hunt celebration behavior
 */
interface CelebrateHunt {
    /**
     * If true, celebration will be broadcast to other entities in radius
     * @default true
     */
    broadcast: boolean;
    /**
     * The list of conditions that the target of a hunt must satisfy to initiate a celebration
     */
    celebration_targets: ServerFilters|ServerFilters[];
    /**
     * The sound event to play when the entity celebrates
     */
    celebrate_sound: string;
    /**
     * Duration in seconds of the celebration
     * @default 4
     */
    duration: number;
    /**
     * If `broadcast` is enabled, this specifies the radius in which it will notify other entities.
     * @default 16
     */
    radius: number;
    /**
     * The range of time in seconds to randomly wait before playning the sound again
     * @default [0,0]
     */
    sound_interval: [number, number];
}