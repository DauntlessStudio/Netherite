import type { DamageType } from "./damage_type.d.ts";

export type ServerFilterSubject = "block"|"damager"|"other"|"parent"|"player"|"self"|"target";

interface ServerFilterBase {
    test: string;
    operator?: "!="|"<"|"<="|"<>"|"="|"=="|">"|">="|"equals"|"not";
    subject?: ServerFilterSubject;
    value?: unknown;
}

interface ActorHealthFilter extends ServerFilterBase {
    test: "actor_health";
    value: number;
}

interface AllSlotsEmptyFilter extends ServerFilterBase {
    test: "all_slots_empty";
    value: "any"|"armor"|"body"|"feet"|"hand"|"head"|"inventory"|"leg"|"torso";
}

interface AnySlotsEmptyFilter extends ServerFilterBase {
    test: "any_slots_empty";
    value: "any"|"armor"|"body"|"feet"|"hand"|"head"|"inventory"|"leg"|"torso";
}

interface BoolPropertyFilter extends ServerFilterBase {
    test: "bool_property";
    domain: string;
    value?: boolean;
}

interface ClockTimeFilter extends ServerFilterBase {
    test: "clock_time";
    value: number;
}

interface DistanceToNearestPlayerFilter extends ServerFilterBase {
    test: "distance_to_nearest_player";
    value: number;
}

interface EnumPropertyFilter extends ServerFilterBase {
    test: "enum_property";
    domain: string;
    value: string;
}

interface NumericPropertyFilter extends ServerFilterBase {
    test: "float_property"|"int_property";
    domain: string;
    value: number;
}

interface HasAbilityFilter extends ServerFilterBase {
    test: "has_ability";
    value: "flySpeed"|"flying"|"instabuild"|"invulnerable"|"lightning"|"mayfly"|"mute"|"noclip"|"walkSpeed"|"worldbuilder";
}

interface HasBiomeTagFilter extends ServerFilterBase {
    test: "has_biome_tag";
    value: string;
}

interface HasComponentFilter extends ServerFilterBase {
    test: "has_component";
    // value: keyof Component
}

interface HasContainerOpenFilter extends ServerFilterBase {
    test: "has_container_open";
    value?: boolean;
}

interface HasDamageFilter extends ServerFilterBase {
    test: "has_damage";
    value: DamageType;
}

interface HasDamagedEquipmentFilter extends ServerFilterBase {
    test: "has_damaged_equipment";
    value: string;
}

interface HasEquipmentFilter extends ServerFilterBase {
    test: "has_equipment";
	domain?: "hand"|"head"|"chest"|"legs"|"feet"|"offhand";
    value: string;
}

interface HasMobEffectFilter extends ServerFilterBase {
    test: "has_mob_effect";
    value: string;
}

interface HasNametagFilter extends ServerFilterBase {
    test: "has_nametag";
    value?: boolean;
}

interface HasPropertyFilter extends ServerFilterBase {
    test: "has_property";
    value: string;
}

interface HasRangedWeaponFilter extends ServerFilterBase {
    test: "has_ranged_weapon";
    value?: boolean;
}

interface HasSilkTouchFilter extends ServerFilterBase {
    test: "has_silk_touch";
    value?: boolean;
}

interface HasTagFilter extends ServerFilterBase {
    test: "has_tag";
    value: string;
}

interface HasTargetFilter extends ServerFilterBase {
    test: "has_target";
    value?: boolean;
}

interface HasTradeSupplyFilter extends ServerFilterBase {
    test: "has_trade_supply";
    value?: boolean;
}

interface HourlyClockTimeFilter extends ServerFilterBase {
    test: "hourly_clock_time";
    value: number;
}

interface OptionalBoolFilter extends ServerFilterBase {
    test: "in_clouds"|"in_contact_with_water"|"in_lava"|"in_nether"|"in_overworld"|"in_water"|"in_water_or_rain"|"is_avoiding_mobs"|"is_baby"|"is_climbing"|"is_daytime"|"is_humid"|"is_immobile"|"is_in_village"|"is_leashed"|"is_leashed_to"|"is_missing_health"|"is_moving"|"is_navigating"|"is_owner"|"is_panicking"|"is_persistent"|"is_raider"|"is_riding"|"is_sitting"|"is_sleeping"|"is_sneak_held"|"is_sneaking"|"is_snow_covered"|"is_sprinting"|"is_target"|"is_underground"|"is_underwater"|"is_visible"|"is_waterlogged"|"on_fire"|"on_ground"|"on_hot_block"|"on_ladder"|"surface_mob"|"taking_fire_damage"|"trusts"|"was_last_hurt_by"
    value?: boolean;
}

interface InBlockFilter extends ServerFilterBase {
    test: "in_block";
    value?: string;
}

interface InactivityTimerFilter extends ServerFilterBase {
    test: "inactivity_timer";
    value: number;
}

interface IsAltitudeFilter extends ServerFilterBase {
    test: "is_altitude";
    value: number;
}

interface IsBiomeFilter extends ServerFilterBase {
    test: "is_biome";
    value: string;
}

interface IsBlockFilter extends ServerFilterBase {
    test: "is_block";
    value: string;
}

interface IsBrightnessFilter extends ServerFilterBase {
    test: "is_brightness";
    value: number;
}

interface IsColorFilter extends ServerFilterBase {
    test: "is_color";
    value: "black"|"blue"|"brown"|"cyan"|"gray"|"green"|"light_blue"|"light_green"|"magenta"|"orange"|"pink"|"purple"|"red"|"silver"|"white"|"yellow";
}

interface IsDifficultyFilter extends ServerFilterBase {
    test: "is_difficulty";
    value: "easy"|"hard"|"normal"|"peaceful";
}

interface IsFamilyFilter extends ServerFilterBase {
    test: "is_family";
    value: string;
}

interface IsGameRuleFilter extends ServerFilterBase {
    test: "is_game_rule";
    domain: string;
    value?: boolean;
}

interface IsMarkVariantFilter extends ServerFilterBase {
    test: "is_mark_variant";
    value: number;
}

interface IsSkinId extends ServerFilterBase {
    test: "is_skin_id";
    value: number;
}

interface IsTemperatureTypeFilter extends ServerFilterBase {
    test: "is_temperature_type";
    value: "cold"|"mild"|"ocean"|"warm";
}

interface IsTemperatureValueFilter extends ServerFilterBase {
    test: "is_temperature_value";
    value: number;
}

interface IsVariantFilter extends ServerFilterBase {
    test: "is_variant";
    value: number;
}

interface LightLevelFilter extends ServerFilterBase {
    test: "light_level";
    value: number;
}

interface MoonIntensityFilter extends ServerFilterBase {
    test: "moon_intensity";
    value: number;
}

interface MoonPhaseFilter extends ServerFilterBase {
    test: "moon_phase";
    value: number;
}

interface OwnerDistanceFilter extends ServerFilterBase {
    test: "owner_distance";
    value: number;
}

interface RandomChanceFilter extends ServerFilterBase {
    test: "random_chance";
    value: number;
}

interface RiderCountFilter extends ServerFilterBase {
    test: "rider_count";
    value: number;
}

interface TargetDistanceFilter extends ServerFilterBase {
    test: "target_distance";
    value: number;
}

interface WeatherFilter extends ServerFilterBase {
    test: "weather";
    value: string;
}

interface WeatherAtPositionFilter extends ServerFilterBase {
    test: "weather_at_position";
    value: string;
}

type FilterTypes = ActorHealthFilter|AllSlotsEmptyFilter| AnySlotsEmptyFilter| BoolPropertyFilter| ClockTimeFilter| DistanceToNearestPlayerFilter| EnumPropertyFilter| NumericPropertyFilter| HasAbilityFilter| HasBiomeTagFilter| HasComponentFilter| HasContainerOpenFilter| HasDamageFilter| HasDamagedEquipmentFilter| HasEquipmentFilter| HasMobEffectFilter| HasNametagFilter| HasPropertyFilter| HasRangedWeaponFilter| HasSilkTouchFilter| HasTagFilter| HasTargetFilter| HasTradeSupplyFilter| HourlyClockTimeFilter| OptionalBoolFilter| InBlockFilter| InactivityTimerFilter| IsAltitudeFilter| IsBiomeFilter| IsBlockFilter| IsBrightnessFilter| IsColorFilter| IsDifficultyFilter| IsFamilyFilter| IsGameRuleFilter| IsMarkVariantFilter| IsSkinId| IsTemperatureTypeFilter| IsTemperatureValueFilter| IsVariantFilter| LightLevelFilter| MoonIntensityFilter| MoonPhaseFilter| OwnerDistanceFilter| RandomChanceFilter| RiderCountFilter| TargetDistanceFilter| WeatherFilter| WeatherAtPositionFilter;
export type ServerFilters = FilterTypes|{all_of: ServerFilters[]}|{any_of: ServerFilters[]}|{none_of: ServerFilters[]};