// deno-lint-ignore-file no-empty-interface
import type { DamageType } from "./damage_type.d.ts";
import type { ServerFilters } from "./filters.d.ts";
import type { MobEffect } from "./mob_effects.d.ts";
import { Molang } from "./molang.d.ts";

interface ComponentEvent {
    filters?: ServerFilters|ServerFilters[];
    target?: "block"|"damager"|"self"|"other"|"player"|"parent"|"target";
    event?: string;
}

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

/**
 * Sets the width and height of the entity's collision box
 */
interface CollisionBox {
    /**
     * Height of the collision box in blocks
     */
    height: number;
    /**
     * Width of the collision box in blocks
     */
    width: number;
}

/**
 * Gives Regeneration and removes Mining Fatigue from the mob that kills the entity's attack target
 */
interface CombatRegeneration {
    /**
     * Determines if the entity will grant entities of the same type effects if they kill the target
     * @default false
     */
    apply_to_family: boolean;
    /**
     * Determines if the entity will grant itself effects if it kills the target
     * @default false
     */
    apply_to_self: boolean;
    /**
     * The duration in seconds of regeneration added to the entity
     * @default 5
     */
    regeneration_duration: number
}

/**
 * Defines the conditional spatial bandwidth optimizations for this entity
 */
interface ConditionalBandwidthOptimization {
    conditional_values: {
        /**
         * Conditions that must be met for these optimization values to be used
         */
        conditional_values: ServerFilters|ServerFilters[];
        /**
         * In relation to the optimization value, determines the maximum ticks spatial update packets can be sent
         */
        max_dropped_ticks: number;
        /**
         * The maximum distance considered during bandwidth optimizations. Any value below the max is interpolated to find optimization. Any value greater or equal results in max optimization
         */
        max_optimized_distance: number;
        /**
         * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent but with less data. This should be used when actors are traveling very quickly or teleporting to prevent visual oddities
         */
        use_motion_prediction_hints: boolean;
    }[];
    default_values: {
        /**
         * In relation to the optimization value, determines the maximum ticks spatial update packets can be sent
         */
        max_dropped_ticks: number;
        /**
         * The maximum distance considered during bandwidth optimizations. Any value below the max is interpolated to find optimization. Any value greater or equal results in max optimization
         */
        max_optimized_distance: number;
        /**
         * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent but with less data. This should be used when actors are traveling very quickly or teleporting to prevent visual oddities
         */
        use_motion_prediction_hints: boolean;
    };
}

/**
 * List of hitboxes for damage or interactions
 */
interface CustomHitTest {
    /**
     * List of AABB hitboxes that do not rotate with the entity
     */
    hitboxes: {
        /**
         * The width of the hitbox in blocks
         */
        width: number;
        /**
         * The height of the hitbox in blocks
         */
        height: number;
        /**
         * The origin of the hitbox relative to the entity's position
         */
        pivot: [number, number, number];
    }[];
}

/**
 * Applies damage at specified intervals to the entity
 */
interface DamageOverTime {
    /**
     * Amount of damage applied per interval
     * @default 1
     */
    damage_per_hurt: number;
    /**
     * Time in seconds between damage
     * @default 0.0
     */
    time_between_hurt: number;
}

/**
 * Handles and responds to damage
 */
interface DamageSensor {
    /**
     * List of triggers with events to call when taking specific types of damage. Iterates top to bottom until a trigger matches all `on_damage` filters then stops evaluating
     */
    triggers: {
        /**
         * The type of damage that triggers the events
         */
        cause: DamageType;
        /**
         * A modifier that adds/removes the base damage received. It does not cause negative damage.
         * @default 0.0
         */
        damage_modifier: number;
        /**
         * A multiplier that modifies the base damage received.
         * @default 1.0
         */
        damage_multiplier: number;
        /**
         * Defines how the entity receives damage.
         * - `yes` - The entity receives damage
         * - `no` - The entity does not receive damage
         * - `no_but_side_effects_apply` - The entity does not receive damage, but side effects apply (e.g. weapon durability loss, enchantment effects, etc.)
         * @default "yes"
         */
        deals_damage: "yes"|"no"|"no_but_side_effects_apply";
        /**
         * Defines event triggers and damage filters. All filters must pass for the event to trigger
         */
        on_damage: ComponentEvent;
        /**
         * Defines what sound to playe when the `on_damage` filters are met
         */
        on_damage_sound_event: string;
    }[];
}

/**
 * Ability for a rideable entity to dash
 */
interface Dash {
    /**
     * The dash cooldown in seconds.
     * @default 1.0
     */
    cooldown_time: number;
    /**
     * Horizontal momentum of the dash
     * @default 1.0
     */
    horizontal_momentum: number;
    /**
     * Vertical momentum of the dash
     * @default 1.0
     */
    vertical_momentum: number;
}

/**
 * Despawns the entity when the despawn rules or filters evaluate to true. Does not apply to entities created via the `/summon` command
 */
interface Despawn {
    /**
     * Determines if `min_range_random_chance` is used in the standard despawn rules
     * @default true
     */
    despawn_from_chance: boolean;
    /**
     * Specifies the `min_distance` and `max_distance` for the standard despawn rules
     */
    despawn_from_distance: {
        /**
         * Maximum distance for standard despawn rules
         * @default 128
         */
        max_distance: number;
        /**
         * Minimum distance for standard despawn rules
         * @default 32
         */
        min_distance: number;
    };
    /**
     * Determines if the `min_range_inactivity_timer` is used in the standard despawn rules
     * @default true
     */
    despawn_from_inactivity: boolean;
    /**
     * Determines if the entity despawns when it reaches the edge of the simulation
     * @default true
     */
    despawn_from_simulation_edge: boolean;
    /**
     * List of conditions that must be satisfied for the entity to despawn. If filters are defined, standard despawn rules are ignored
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * The amount of time in seconds the mob must be inactive
     * @default 30
     */
    min_range_inactivity_timer: number;
    /**
     * A random chance between 1 and the given value
     * @default 800
     */
    min_range_random_chance: number;
    /**
     * If true, all linked entities (i.e. leashed) will also be despawned
     * @default false
     */
    remove_child_entities: boolean;
}

/**
 * Prevents the entity from changing dimension through portals
 */
interface DimensionBound {}

/**
 * Adds a timer for drying out that will count down and fire `dried_out_event`, or stop counting down and fire `stopped_drying_out_event` if in rain or water
 */
interface DryingOutTimer {
    /**
     * Event to fire when the drying out time runs out
     */
    dried_out_event: string;
    /**
     * Event to fire when entity was already dried out but recieved increase in water supply
     */
    recover_after_dried_out_event: string;
    /**
     * Event to fire when the entity stopped drying out, e.g. when it is raining or in water
     */
    stopped_drying_out_event: string;
    /**
     * Amount of time in seconds to fully dry out
     * @default 0.0
     */
    total_time: number;
    /**
     * Optional amount of additional time in seconds given by using a splash water bottle on the entity
     * @default 0.0
     */
    water_bottle_refill_time: number;
}

/**
 * Defines the entity's ability to trade with players
 */
interface EconomyTradeTable {
    /**
     * Determines if trades should be coverted when the mob transforms
     * @default false
     */
    convert_trades_economy: boolean;
    /**
     * How much should the discount be modified by when the player has cured the Zombie Villager
     * @default [-25,-20]
     */
    cured_discount: [number, number];
    /**
     * Names to be displayed while trading with this entity
     */
    display_name: string;
    /**
     * Used in legacy prices to determine how much should the demand be modified when the player has the Hero of the Village effect
     * @default -4
     */
    hero_demand_discount: number;
    /**
     * The max the discount can be modified by when the player has cured the Zombie Villager
     * @default [-25,-20]
     */
    max_cured_discount: [number, number];
    /**
     * The max the discount can be modified by when the player has cured the Zombie Villager. Used in legacy prices
     * @default -200
     */
    max_nearby_cured_discount: number;
    /**
     * How much should the discount be modified when the player has cured a nearby Zombie Villager
     * @default -20
     */
    nearby_cured_discount: number;
    /**
     * If true, trading with the entity opens the new trade screen
     * @default false
     */
    new_screen: boolean;
    /**
     * Determines if the trades should persist when the mob transforms
     * @default false
     */
    persist_trades: boolean;
    /**
     * If true, the entity will show the in game trade screen on interact
     * @default true
     */
    show_trade_screen: boolean;
    /**
     * File path relative to the resource pack root for this entity's trades
     */
    table: string;
    /**
     * If true, the legacy price formula will be used
     * @default false
     */
    use_legacy_price_formula: boolean;
}

/**
 * Defines to which armor slot an item equiped to `minecraft:equippable`'s second slot should be equiped to.
 * @deprecated
 */
interface EntityArmorEquipmentSlotMapping {
    armor_slot: string;
}

/**
 * Defines events fired when a set of conditions are met by entities within range
 */
interface EntitySensor {
    /**
     * If true, the subsensors' range is additive to the entity's size
     */
    relative_range: boolean;
    /**
     * The list of subsensors which emit events when all their conditions are met
     */
    subsensors: {
        /**
         * How many seconds before the subsensor can sense for entities again. The cooldown is in addition to the base 1 tick. Negative values are treated as no cooldown
         * @default -1
         */
        cooldown: number;
        /**
         * Event to fire when conditions are met
         */
        event: string;
        /**
         * The list of conditions that must be met for the event to fire
         */
        event_filters: ServerFilters|ServerFilters[];
        /**
         * The maximum number of entities that must pass the filter conditions for the event to send
         * @default -1
         */
        maximum_count: number;
        /**
         * The minimum number of entities that must pass the filter conditions for the event to send
         * @default 1
         */
        minimum_count: number;
        /**
         * The max horizontal and vertical distance in blocks that entities must be within to trigger the event
         * @default [10,10]
         */
        range: [number, number];
        /**
         * If true, requires all nearby entities to pas the filter conditions for the event to fire
         * @default false
         */
        require_all: boolean;
    }[];
}

/**
 * Defines events to fire when the environment matches certain conditions
 */
interface EnvironmentSensor {
    /**
     * A list of triggers that fire when the conditions match the given filter criteria
     */
    triggers: ComponentEvent[];
}

/**
 * Defines the items the entity can equip
 */
interface EquipItem {
    /**
     * List of items the entity should not equip
     */
    excluded_items: string[];
}

/**
 * Defines how the entity equips items
 */
interface Equippable {
    /**
     * List of slots and the items that can be equipped to them
     */
    slots: {
        /**
         * The list of items that can be equipped to this slot
         */
        accepted_items: string[];
        /**
         * Text to be displayed when the entity can be equipped with this item when playing with Touch controls
         */
        interact_text: string;
        /**
         * Identifier of the item that can be equipped for this slot
         */
        item: string;
        /**
         * Event to fire when this entity is equipped with this item
         */
        on_equip: string;
        /**
         * Event to fire when this entity is unequipped with this item
         */
        on_unequip: string;
        /**
         * The slot number of this slot
         * @default 0
         */
        slot: number;
    }
}

/**
 * Defines how much exhaustion each player action should take
 */
interface ExhaustionValues {
    /**
     * Amount of exhaustion applied when attacking
     * @default 0.1
     */
    attack: number;
    /**
     * Amount of exhaustion applied when taking damage
     * @default 0.1
     */
    damage: number;
    /**
     * Amount of exhaustion applied when healed through food regeneration
     * @default 6.0
     */
    heal: number;
    /**
     * Amount of exhaustion applied when jumping
     * @default 0.05
     */
    jump: number;
    /**
     * Amount of exhaustion applied when mining
     * @default 0.005
     */
    mine: number;
    /**
     * Amount of exhaustion applied when sprinting
     * @default 0.01
     */
    sprint: number;
    /**
     * Amount of exhaustion applied when sprint jumping
     * @default 0.2
     */
    sprint_jump: number;
    /**
     * Amount of exhaustion applied when swimming
     * @default 0.01
     */
    swim: number;
    /**
     * Amount of exhaustion applied when walking
     * @default 0.0
     */
    walk: number;
}

/**
 * Defines the experience rewarded to players
 */
interface ExperienceReward {
    /**
     * The amount of experience rewarded to the player when the entity is bred
     * @default "0"
     */
    on_bred: Molang;
    /**
     * The amount of experience rewarded to the player when the entity dies
     * @default "0"
     */
    on_death: Molang;
}

/**
 * Defines how the entity explodes
 */
interface Explode {
    /**
     * If true, the explosion will affect blocks and entities underwater
     * @default false
     */
    allow_underwater: boolean;
    /**
     * If true, the explosion will destroy blocks in the radius
     * @default true
     */
    breaks_blocks: boolean;
    /**
     * If true, the explosion radius will be set on fire
     * @default false
     */
    causes_fire: boolean;
    /**
     * A scale factor applied to the damage. A value of 0 does no damage. Negative values will heal
     * @default 1.0
     */
    damage_scaling: number;
    /**
     * If true, block breaking will be affected by the mob griefing game rule
     * @default false
     */
    destroy_affected_by_griefing: boolean;
    /**
     * If true, fire will be affected by the mob griefing game rule
     * @default false
     */
    fire_affected_by_griefing: boolean;
    /**
     * The range for a random amount of time the fuse will be lit before exploding. Negative values will explode immediately
     * @default [0,0]
     */
    fuse_length: [number, number];
    /**
     * If true, the fuse is already lit when the component is added
     * @default false
     */
    fuse_lit: boolean;
    /**
     * A scale factor applied to the knockback force caused by the explosion
     * @default 1.0
     */
    knockback_scaling: number;
    /**
     * A block's explosion resistance will be capped at this value when the explosion occurs
     * @default Number.MAX_SAFE_INTEGER
     */
    max_resistance: number;
    /**
     * Defines whether the explosion should apply fall damage negation to entities above the point of collision
     * @default false
     */
    negates_fall_damage: boolean;
    /**
     * The name of the particle effect to use
     * @default "explosion"
     */
    particle_effect: "explosion"|"wind_burst"|"breeze_wind_burst";
    /**
     * The radius of the explosion and the damage the explosion deals
     * @default 3.0
     */
    power: number;
    /**
     * The name of the sound effect played when the explosion triggers
     * @default "explode"
     */
    sound_effect: string;
    /**
     * If true, the explosion will toggle blocks in the explosion radius
     * TODO: find out what this means
     * @default false
     */
    toggles_blocks: boolean;
}

/**
 * Defines how the entity flocks in groups in water
 */
interface Flocking {
    /**
     * The amount of blocks away the entity will look at to push away from
     * @default 0
     */
    block_distance: number;
    /**
     * The weight of the push back from blocks
     * @default 0
     */
    block_weight: number;
    /**
     * The amount of push back given to a flocker tht breaches out of the water
     * @default 0
     */
    breach_influence: number;
    /**
     * The threshold in which to start applying cohesion
     * @default 1
     */
    cohesion_threshold: number;
    /**
     * The weight applied for the cohesion steering of the flock
     * @default 1
     */
    cohesion_weight: number;
    /**
     * The weight on which to apply on the goal output
     * @default 0
     */
    goal_weight: number;
    /**
     * Determines the high bound amount of entities that can be allowed in the flock
     * @default 0
     */
    high_flock_limit: number;
    /**
     * Tells the flocking component if the entity exists in water
     * @default false
     */
    in_water: boolean;
    /**
     * The area around the entity that allows other to be added to the flock
     * @default 0
     */
    influence_radius: number;
    /**
     * The distance in which the flocker will stop allying cohesion
     * @default 0
     */
    inner_cohesion_threshold: number;
    /**
     * The percentage chance between 0-1 that a fish will spawn and not want to join flocks
     * @default 0
     */
    loner_chance: number;
    /**
     * Determines the low bound amount of entities that can be allowed in the flock
     * @default 0
     */
    low_flock_limit: number;
    /**
     * Tells the flockers that they can only match similar entities that also match the variant, mark variant, and color data of other flockers
     * @default false
     */
    match_variants: boolean;
    /**
     * The max height allowable in the air or water
     * @default 0
     */
    max_height: number;
    /**
     * The min height allowable in the air or water
     * @default 0
     */
    min_height: number;
    /**
     * The distance that is determined to be close to another flocking and to start applying separation
     * @default 2
     */
    separation_threshold: number;
    /**
     * The weight applied to the separation of the flock
     * @default 1
     */
    separation_weight: number;
    /**
     * Tells the flockers that they will follow flocks based on the center of mass
     * @default false
     */
    use_center_of_mass: boolean;
}

/**
 * Allows an entity to emit move, swim, and flap game events depending on the block the entity is moving through. It by default exists on all entities and can be overriden
 */
interface GameEventMovementTracking {
    /**
     * If true, the `flap` game event will be emitted when the entity moves through the air
     * @default false
     */
    emit_flap: boolean;
    /**
     * If true, the `move` game event will be emitted when the entity moves on ground or through a solid
     * @default true
     */
    emit_move: boolean;
    /**
     * If true, the `swim` game event will be emitted when the entity moves through water
     * @default true
     */
    emit_swim: boolean;
}

/**
 * Defines the way the entity's genes and alleles are passed on to the offspring
 */
interface Genetics {
    /**
     * The list of genes this entity has and will cross with a partner during breeding
     */
    genes: {
        /**
         * The range of positive integer allele values for this gene. Spawned mobs will have a random value in this range assigned to them
         */
        allele_range: {
            /**
             * Upper bound of allele values
             * @default 0
             */
            range_max: number;
            /**
             * Lower bound of allele values
             * @default 0
             */
            range_min: number;
        }
        /**
         * The list of genetic variants for this gene. These check for particular allele combinations and fire events when satisfied
         */
        genetic_variants: {
            /**
             * Event to run when this mob is created and matches the allele conditions
             */
            birth_event: string;
            /**
             * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both
             * @default -1
             */
            both_allele: number|[number, number];
            /**
             * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both
             * @default -1
             */
            either_allele: number|[number, number];
            /**
             * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both
             * @default -1
             */
            hidden_allele: number|[number, number];
            /**
             * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both
             * @default -1
             */
            main_allele: number|[number, number];
        }[];
        /**
         * If this value is non-negative, overrides the chance that an allele will be replaced with a random one insted of the parent's allele
         * @default -1
         */
        mutation_rate: number;
        /**
         * The name of the gene
         */
        name: string;
    }[];
    /**
     * Chance that an allele will be replaced with a random one instead of the parent's allele during birth
     * @default 0.03125
     */
    mutation_rate: number;
}

/**
 * Defines sets of items that can be used to trigger events when used on this entity. The item will be taken and added to the entity's inventory
 */
interface Giveable {
    /**
     * An optional cooldown in seconds to prevent spamming interactions
     * @default 0
     */
    cooldown: number;
    /**
     * The list of items that can be given to the entity to place in their inventory
     */
    items: string[];
    /**
     * Event to fire when the correct item is given
     */
    on_give: string;
}

/**
 * Keeps track of entity group size in the given radius
 */
interface GroupSize {
    /**
     * The list of conditions that must be satisfied for othe entities to be counted towards group size
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Radius from center of entity
     * @default 16
     */
    radius: number;
}

/**
 * Defines how the entity can grow crops when walking over them
 */
interface GrowsCrop {
    /**
     * Value between 0-1 defining change of success per tick
     * @default 0
     */
    chance: number;
    /**
     * Number of charges
     * @default 10
     */
    charges: number;
}

/**
 * Defines the interactions with this entity for healig it
 */
interface Healable {
    /**
     * The filter group that defines the conditions for using this item to heal the entity
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Determines if the item can be used regardless of the entity being at full health
     * @default false
     */
    force_use: boolean;
    /**
     * The array of items that can be used to heal the entity
     */
    items: {
        /**
         * The amount of health to gain
         * @default 1
         */
        heal_amount: number;
        /**
         * The item identifier that can be used to heal this entity
         */
        item: string;
    }[];
}

/**
 * Defines the entity's heartbeat
 */
interface Heartbeat {
    /**
     * A Molang expression defining the inter-beat interval in seconds
     * @default "1.0"
     */
    interval: Molang;
    /**
     * Sound event to be played as the heartbeat sound
     * @default "heartbeat"
     */
    sound_event: string;
}

/**
 * Saves a home position when the entity is spawned
 */
interface Home {
    /**
     * Optional list of blocks that can be considered a valid home
     */
    home_block_list: string[];
    /**
     * Optional radius that the entity will be restricted to in relation to its home
     * @default 0
     */
    restriction_radius: number;
    /**
     * Defines how the entity will be restricted to its home position
     * - `none` - No restrictions
     * - `random_movement` - Random movement within the restriction radius
     * - `all_movement` - No movement outside the restriction radius
     * @default "none"
     */
    restriction_type: "none"|"random_movement"|"all_movement";
}

/**
 * Defines a set of conditions under which an entity should take damage
 */
interface HurtOnCondition {
    /**
     * The list of conditions that must be met for the entity to take damage
     */
    damage_conditions: {
        /**
         * The kind of damage caused to the entity
         */
        cause: DamageType;
        /**
         * The amount of damage applied each tick the conditions are met
         */
        damage_per_tick: number;
        /**
         * The set of conditions that must be satisfied for the entity to take damage
         */
        filters: ServerFilters|ServerFilters[];
    }[];
}

/**
 * Verifies whether the entity is inside any of the listed blocks
 * TODO: Find out what this component is for, what is being notified?
 */
interface InsideBlockNotifier {
    /**
     * List of blocks monitored to see if the entity is inside
     */
    block_list: string[];
}

/**
 * Adds a timer since last rested to see if phantoms should spawn
 */
interface Insomnia {
    /**
     * Number of days the mob has to stay up for the insomnia effect to begin
     * @default 3.0
     */
    days_until_insomnia: number;
}

/**
 * Despawns the entity immediately
 */
interface InstantDespawn {
    /**
     * If true, linked entities (i.e. leashed) will also be despawned
     * @default false
     */
    remove_child_entities: boolean;
}

/**
 * Defines interactions with this entity
 */
interface Interact {
    /**
     * Loot tables with items to add to the player's inventory upon successful interaction
     */
    add_items: {
        /**
         * File path, relative to the behavior pack root pointing to the loot table file
         */
        table: string;
    };
    /**
     * Time in seconds before this entity can be interacted with again
     * @default 0
     */
    cooldown: number;
    /**
     * Time in seconds before this entity can be interacted with after being attacked
     * @default 0
     */
    cooldown_after_being_attacked: number;
    /**
     * The entity's slot to remove and drop the item from, if any, upon successful interaction
     */
    drop_item_slot: string;
    /**
     * The entity's slot to equip the item to, if any, upon successful interaction
     */
    equip_item_slot: string;
    /**
     * The amount of health to change upon successful interaction
     * @default 0
     */
    health_amount: number;
    /**
     * The amount of damage the item will take when used to interact with this entity
     * @default 0
     */
    hurt_item: number;
    /**
     * Text to show when the player is able to interact with this entity with Touch controls
     */
    interact_text: string;
    /**
     * Event to fire when the interaction occurs
     */
    on_interact: string;
    /**
     * Particle effect triggered at the start of the interaction
     */
    particle_on_start: {
        /**
         * Whether the particle should be offset towards the interactor
         */
        particle_offset_towards_interactor: boolean;
        /**
         * The type of particle to spawn
         */
        particle_type: string;
        /**
         * Will offset the particle in the y direction
         */
        particle_y_offset: number;
    };
    /**
     * List of sounds to play when the interaction occurs
     */
    play_sounds: string[];
    /**
     * Allows to repair one of the entity's items
     */
    repair_entity_item: {
        /**
         * How much durability to restore
         */
        amount: number;
        /**
         * The slot to repair the item containe within
         */
        slot: number;
    };
    /**
     * List of entities to spawn when the interaction occurs
     */
    spawn_entities: string;
    /**
     * Loot table with items to drop on the ground during successful interaction
     */
    spawn_items: {
        /**
         * File path, relative to the behavior pack root pointing to the loot table file
         */
        table: string;
    };
    /**
     * If true, the player will do the swing arm animation
     * @default false
     */
    swing: boolean;
    /**
     * The item used will transform into this item upon successful interaction
     */
    transform_to_item: string;
    /**
     * If true, the interaction will consume an item
     * @default false
     */
    use_item: boolean;
    /**
     * Vibration to emit when the interaction occurs
     * @default "entity_interact"
     */
    vibration: "none"|"shear"|"entity_die"|"entity_act"|"entity_interact";
}

/**
 * Defines this entity's inventory properties
 */
interface Inventory {
    /**
     * Number of slots that this entity can gain per extra strength
     * @default 0
     */
    additional_slots_per_strength: number;
    /**
     * If true, the contents of this inventory can be removed by a hopper
     * @default false
     */
    can_be_siphoned_from: boolean;
    /**
     * Type of container this entity has, dictates which UI is used
     */
    container_type: "horse"|"minecart_chest"|"chest_boat"|"minecart_hopper"|"inventory"|"container"|"hopper";
    /**
     * Number of slots in this entity's inventory
     * @default 5
     */
    inventory_size: number;
    /**
     * If true, the entity will not drop its inventory on death
     * @default false
     */
    private: boolean;
    /**
     * If true, the entity's inventory can only be accessed by its owner or itself
     * @default false
     */
    restrict_to_owner: boolean;
}