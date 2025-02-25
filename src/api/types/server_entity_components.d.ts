// deno-lint-ignore-file no-empty-interface
import type { DamageType } from "./damage_type.d.ts";
import type { ServerFilters } from "./filters.d.ts";
import type { MobEffects } from "./mob_effects.d.ts";
import type { Molang } from "./molang.d.ts";

type PartialWithAdditionalProperties<T> = Partial<T> & {[key: string]: unknown};

export interface Components {
    "minecraft:behavior.admire_item"?: PartialWithAdditionalProperties<BehaviorAdmireItem>
    "minecraft:behavior.avoid_block"?: PartialWithAdditionalProperties<BehaviorAvoidBlock>
    "minecraft:behavior.avoid_mob_type"?: PartialWithAdditionalProperties<BehaviorAvoidMobType>
    "minecraft:behavior.barter"?: PartialWithAdditionalProperties<BehaviorBarter>
    "minecraft:behavior.beg"?: PartialWithAdditionalProperties<BehaviorBeg>
    "minecraft:behavior.break_door"?: PartialWithAdditionalProperties<BehaviorBreakDoor>
    "minecraft:behavior.breed"?: PartialWithAdditionalProperties<BehaviorBreed>
    "minecraft:behavior.celebrate"?: PartialWithAdditionalProperties<BehaviorCelebrate>
    "minecraft:behavior.celebrate_survive"?: PartialWithAdditionalProperties<BehaviorCelebrateSurvive>
    "minecraft:behavior.charge_attack"?: PartialWithAdditionalProperties<BehaviorChargeAttack>
    "minecraft:behavior.charge_held_item"?: PartialWithAdditionalProperties<BehaviorChargeHeldItem>
    "minecraft:behavior.circle_around_anchor"?: PartialWithAdditionalProperties<BehaviorCircleAroundAnchor>
    "minecraft:behavior.controlled_by_player"?: PartialWithAdditionalProperties<BehaviorControlledByPlayer>
    "minecraft:behavior.croak"?: PartialWithAdditionalProperties<BehaviorCroak>
    "minecraft:behavior.defend_trusted_target"?: PartialWithAdditionalProperties<BehaviorDefendTrustedTarget>
    "minecraft:behavior.defend_village_target"?: PartialWithAdditionalProperties<BehaviorDefendVillageTarget>
    "minecraft:behavior.delayed_attack"?: PartialWithAdditionalProperties<BehaviorDelayedAttack>
    "minecraft:behavior.dig"?: PartialWithAdditionalProperties<BehaviorDig>
    "minecraft:behavior.door_interact"?: PartialWithAdditionalProperties<BehaviorDoorInteract>
    "minecraft:behavior.dragonchargeplayer"?: PartialWithAdditionalProperties<BehaviorDragonChargePlayer>
    "minecraft:behavior.dragondeath"?: PartialWithAdditionalProperties<BehaviorDragonDeath>
    "minecraft:behavior.dragonflaming"?: PartialWithAdditionalProperties<BehaviorDragonFlaming>
    "minecraft:behavior.dragonholdingpattern"?: PartialWithAdditionalProperties<BehaviorDragonHoldingPattern>
    "minecraft:behavior.dragonlanding"?: PartialWithAdditionalProperties<BehaviorDragonLanding>
    "minecraft:behavior.dragonscanning"?: PartialWithAdditionalProperties<BehaviorDragonScanning>
    "minecraft:behavior.dragonstrafeplayer"?: PartialWithAdditionalProperties<BehaviorDragonStrafePlayer>
    "minecraft:behavior.dragontakeoff"?: PartialWithAdditionalProperties<BehaviorDragonTakeOff>
    "minecraft:behavior.drink_milk"?: PartialWithAdditionalProperties<BehaviorDrinkMilk>
    "minecraft:behavior.drink_potion"?: PartialWithAdditionalProperties<BehaviorDrinkPotion>
    "minecraft:behavior.drop_item_for"?: PartialWithAdditionalProperties<BehaviorDropItemFor>
    "minecraft:behavior.eat_block"?: PartialWithAdditionalProperties<BehaviorEatBlock>
    "minecraft:behavior.eat_carried_item"?: PartialWithAdditionalProperties<BehaviorEatCarriedItem>
    "minecraft:behavior.eat_mob"?: PartialWithAdditionalProperties<BehaviorEatMob>
    "minecraft:behavior.emerge"?: PartialWithAdditionalProperties<BehaviorEmerge>
    "minecraft:behavior.enderman_leave_block"?: PartialWithAdditionalProperties<BehaviorEndermanLeaveBlock>
    "minecraft:behavior.enderman_take_block"?: PartialWithAdditionalProperties<BehaviorEndermanTakeBlock>
    "minecraft:behavior.equip_item"?: PartialWithAdditionalProperties<BehaviorEquipItem>
    "minecraft:behavior.explore_outskirts"?: PartialWithAdditionalProperties<BehaviorExploreOutskirts>
    "minecraft:behavior.fertilize_farm_block"?: PartialWithAdditionalProperties<BehaviorFertilizeFarmBlock>
    "minecraft:behavior.find_cover"?: PartialWithAdditionalProperties<BehaviorFindCover>
    "minecraft:behavior.find_mount"?: PartialWithAdditionalProperties<BehaviorFindMount>
    "minecraft:behavior.find_underwater_treasure"?: PartialWithAdditionalProperties<BehaviorFindUnderwaterTreasure>
    "minecraft:behavior.fire_at_target"?: PartialWithAdditionalProperties<BehaviorFireAtTarget>
    "minecraft:behavior.flee_sun"?: PartialWithAdditionalProperties<BehaviorFleeSun>
    "minecraft:behavior.float"?: PartialWithAdditionalProperties<BehaviorFloat>
    "minecraft:behavior.float_wander"?: PartialWithAdditionalProperties<BehaviorFloatWander>
    "minecraft:behavior.follow_caravan"?: PartialWithAdditionalProperties<BehaviorFollowCaravan>
    "minecraft:behavior.follow_mob"?: PartialWithAdditionalProperties<BehaviorFollowMob>
    "minecraft:behavior.follow_owner"?: PartialWithAdditionalProperties<BehaviorFollowOwner>
    "minecraft:behavior.follow_parent"?: PartialWithAdditionalProperties<BehaviorFollowParent>
    "minecraft:behavior.follow_target_captain"?: PartialWithAdditionalProperties<BehaviorFollowTargetCaptain>
    "minecraft:behavior.go_and_give_items_to_noteblock"?: PartialWithAdditionalProperties<BehaviorGoAndGiveItemsToNoteblock>
    "minecraft:behavior.go_and_give_items_to_owner"?: PartialWithAdditionalProperties<BehaviorGoAndGiveItemsToOwner>
    "minecraft:behavior.go_home"?: PartialWithAdditionalProperties<BehaviorGoHome>
    "minecraft:behavior.guardian_attack"?: PartialWithAdditionalProperties<BehaviorGuardianAttack>
    "minecraft:behavior.harvest_farm_block"?: PartialWithAdditionalProperties<BehaviorHarvestFarmBlock>
    "minecraft:behavior.hide"?: PartialWithAdditionalProperties<BehaviorHide>
    "minecraft:behavior.hold_ground"?: PartialWithAdditionalProperties<BehaviorHoldGround>
    "minecraft:behavior.hurt_by_target"?: PartialWithAdditionalProperties<BehaviorHurtByTarget>
    "minecraft:behavior.inspect_bookshelf"?: PartialWithAdditionalProperties<BehaviorInspectBookshelf>
    "minecraft:behavior.investigate_suspicious_location"?: PartialWithAdditionalProperties<BehaviorInvestigateSuspiciousLocation>
    "minecraft:behavior.jump_around_target"?: PartialWithAdditionalProperties<BehaviorJumpAroundTarget>
    "minecraft:behavior.jump_to_block"?: PartialWithAdditionalProperties<BehaviorJumpToBlock>
    "minecraft:behavior.knockback_roar"?: PartialWithAdditionalProperties<BehaviorKnockbackRoar>
    "minecraft:behavior.lay_down"?: PartialWithAdditionalProperties<BehaviorLayDown>
    "minecraft:behavior.lay_egg"?: PartialWithAdditionalProperties<BehaviorLayEgg>
    "minecraft:behavior.leap_at_target"?: PartialWithAdditionalProperties<BehaviorLeapAtTarget>
    "minecraft:behavior.look_at_entity"?: PartialWithAdditionalProperties<BehaviorLookAtEntity>
    "minecraft:behavior.look_at_player"?: PartialWithAdditionalProperties<BehaviorLookAtPlayer>
    "minecraft:behavior.look_at_target"?: PartialWithAdditionalProperties<BehaviorLookAtTarget>
    "minecraft:behavior.look_at_trading_player"?: PartialWithAdditionalProperties<BehaviorLookAtTradingPlayer>
    "minecraft:behavior.make_love"?: PartialWithAdditionalProperties<BehaviorMakeLove>
    "minecraft:behavior.melee_attack"?: PartialWithAdditionalProperties<BehaviorMeleeAttack>
    "minecraft:behavior.melee_box_attack"?: PartialWithAdditionalProperties<BehaviorMeleeBoxAttack>
    "minecraft:behavior.mingle"?: PartialWithAdditionalProperties<BehaviorMingle>
    "minecraft:behavior.mount_pathing"?: PartialWithAdditionalProperties<BehaviorMountPathing>
    "minecraft:behavior.move_around_target"?: PartialWithAdditionalProperties<BehaviorMoveAroundTarget>
    "minecraft:behavior.move_indoors"?: PartialWithAdditionalProperties<BehaviorMoveIndoors>
    "minecraft:behavior.move_outdoors"?: PartialWithAdditionalProperties<BehaviorMoveOutdoors>
    "minecraft:behavior.move_through_village"?: PartialWithAdditionalProperties<BehaviorMoveThroughVillage>
    "minecraft:behavior.move_to_block"?: PartialWithAdditionalProperties<BehaviorMoveToBlock>
    "minecraft:behavior.move_to_land"?: PartialWithAdditionalProperties<BehaviorMoveToLand>
    "minecraft:behavior.move_to_lava"?: PartialWithAdditionalProperties<BehaviorMoveToLava>
    "minecraft:behavior.move_to_liquid"?: PartialWithAdditionalProperties<BehaviorMoveToLiquid>
    "minecraft:behavior.move_to_poi"?: PartialWithAdditionalProperties<BehaviorMoveToPOI>
    "minecraft:behavior.move_to_random_block"?: PartialWithAdditionalProperties<BehaviorMoveToRandomBlock>
    "minecraft:behavior.move_to_village"?: PartialWithAdditionalProperties<BehaviorMoveThroughVillage>
    "minecraft:behavior.move_to_water"?: PartialWithAdditionalProperties<BehaviorMoveToWater>
    "minecraft:behavior.move_towards_dwelling_restriction"?: PartialWithAdditionalProperties<BehaviorMoveTowardsDwellingRestriction>
    "minecraft:behavior.move_towards_home_restriction"?: PartialWithAdditionalProperties<BehaviorMoveTowardsHomeRestriction>
    "minecraft:behavior.move_towards_target"?: PartialWithAdditionalProperties<BehaviorMoveTowardsTarget>
    "minecraft:behavior.nap"?: PartialWithAdditionalProperties<BehaviorNap>
    "minecraft:behavior.nearest_attackable_target"?: PartialWithAdditionalProperties<BehaviorNearestAttackableTarget>
    "minecraft:behavior.nearest_prioritized_attackable_target"?: PartialWithAdditionalProperties<BehaviorNearestPrioritizedAttackableTarget>
    "minecraft:behavior.ocelot_sit_on_block"?: PartialWithAdditionalProperties<BehaviorOcelotSitOnBlock>
    "minecraft:behavior.ocelotattack"?: PartialWithAdditionalProperties<BehaviorOcelotAttack>
    "minecraft:behavior.offer_flower"?: PartialWithAdditionalProperties<BehaviorOfferFlower>
    "minecraft:behavior.open_door"?: PartialWithAdditionalProperties<BehaviorOpenDoor>
    "minecraft:behavior.owner_hurt_by_target"?: PartialWithAdditionalProperties<BehaviorOwnerHurtByTarget>
    "minecraft:behavior.owner_hurt_target"?: PartialWithAdditionalProperties<BehaviorOwnerHurtTarget>
    "minecraft:behavior.panic"?: PartialWithAdditionalProperties<BehaviorPanic>
    "minecraft:behavior.pet_sleep_with_owner"?: PartialWithAdditionalProperties<BehaviorPetSleepWithOwner>
    "minecraft:behavior.pickup_items"?: PartialWithAdditionalProperties<BehaviorPickupItems>
    "minecraft:behavior.play"?: PartialWithAdditionalProperties<BehaviorPlay>
    "minecraft:behavior.play_dead"?: PartialWithAdditionalProperties<BehaviorPlayDead>
    "minecraft:behavior.player_ride_tamed"?: PartialWithAdditionalProperties<BehaviorPlayerRideTamed>
    "minecraft:behavior.raid_garden"?: PartialWithAdditionalProperties<BehaviorRaidGarden>
    "minecraft:behavior.ram_attack"?: PartialWithAdditionalProperties<BehaviorRamAttack>
    "minecraft:behavior.random_breach"?: PartialWithAdditionalProperties<BehaviorRandomBreach>
    "minecraft:behavior.random_fly"?: PartialWithAdditionalProperties<BehaviorRandomFly>
    "minecraft:behavior.random_hover"?: PartialWithAdditionalProperties<BehaviorRandomHover>
    "minecraft:behavior.random_look_around"?: PartialWithAdditionalProperties<BehaviorRandomLookAround>
    "minecraft:behavior.random_look_around_and_sit"?: PartialWithAdditionalProperties<BehaviorRandomLookAroundAndSit>
    "minecraft:behavior.random_search_and_dig"?: PartialWithAdditionalProperties<BehaviorRandomSearchAndDig>
    "minecraft:behavior.random_sitting"?: PartialWithAdditionalProperties<BehaviorRandomSitting>
    "minecraft:behavior.random_stroll"?: PartialWithAdditionalProperties<BehaviorRandomStroll>
    "minecraft:behavior.random_swim"?: PartialWithAdditionalProperties<BehaviorRandomSwim>
    "minecraft:behavior.ranged_attack"?: PartialWithAdditionalProperties<BehaviorRangedAttack>
    "minecraft:behavior.receive_love"?: PartialWithAdditionalProperties<BehaviorReceiveLove>
    "minecraft:behavior.restrict_open_door"?: PartialWithAdditionalProperties<BehaviorRestrictOpenDoor>
    "minecraft:behavior.restrict_sun"?: PartialWithAdditionalProperties<BehaviorRestrictSun>
    "minecraft:behavior.rise_to_liquid_level"?: PartialWithAdditionalProperties<BehaviorRiseToLiquidLevel>
    "minecraft:behavior.roar"?: PartialWithAdditionalProperties<BehaviorRoar>
    "minecraft:behavior.roll"?: PartialWithAdditionalProperties<BehaviorRoll>
    "minecraft:behavior.run_around_like_crazy"?: PartialWithAdditionalProperties<BehaviorRunAroundLikeCrazy>
    "minecraft:behavior.scared"?: PartialWithAdditionalProperties<BehaviorScared>
    "minecraft:behavior.send_event"?: PartialWithAdditionalProperties<BehaviorSendEvent>
    "minecraft:behavior.share_items"?: PartialWithAdditionalProperties<BehaviorShareItems>
    "minecraft:behavior.silverfish_merge_with_stone"?: PartialWithAdditionalProperties<BehaviorSilverfishMergeWithStone>
    "minecraft:behavior.silverfish_wake_up_friends"?: PartialWithAdditionalProperties<BehaviorSilverfishWakeUpFriends>
    "minecraft:behavior.skeleton_horse_trap"?: PartialWithAdditionalProperties<BehaviorSkeletonHorseTrap>
    "minecraft:behavior.sleep"?: PartialWithAdditionalProperties<BehaviorSleep>
    "minecraft:behavior.slime_attack"?: PartialWithAdditionalProperties<BehaviorSlimeAttack>
    "minecraft:behavior.slime_float"?: PartialWithAdditionalProperties<BehaviorSlimeFloat>
    "minecraft:behavior.slime_keep_on_jumping"?: PartialWithAdditionalProperties<BehaviorSlimeKeepOnJumping>
    "minecraft:behavior.slime_random_direction"?: PartialWithAdditionalProperties<BehaviorSlimeRandomDirection>
    "minecraft:behavior.snacking"?: PartialWithAdditionalProperties<BehaviorSnacking>
    "minecraft:behavior.sneeze"?: PartialWithAdditionalProperties<BehaviorSneeze>
    "minecraft:behavior.sniff"?: PartialWithAdditionalProperties<BehaviorSniff>
    "minecraft:behavior.sonic_boom"?: PartialWithAdditionalProperties<BehaviorSonicBoom>
    "minecraft:behavior.squid_dive"?: PartialWithAdditionalProperties<BehaviorSquidDive>
    "minecraft:behavior.squid_flee"?: PartialWithAdditionalProperties<BehaviorSquidFlee>
    "minecraft:behavior.squid_idle"?: PartialWithAdditionalProperties<BehaviorSquidIdle>
    "minecraft:behavior.squid_move_away_from_ground"?: PartialWithAdditionalProperties<BehaviorSquidMoveAwayFromGround>
    "minecraft:behavior.squid_out_of_water"?: PartialWithAdditionalProperties<BehaviorSquidOutOfWater>
    "minecraft:behavior.stalk_and_pounce_on_target"?: PartialWithAdditionalProperties<BehaviorStalkAndPounceOnTarget>
    "minecraft:behavior.stay_near_noteblock"?: PartialWithAdditionalProperties<BehaviorStayNearNoteblock>
    "minecraft:behavior.stay_while_sitting"?: PartialWithAdditionalProperties<BehaviorStayWhileSitting>
    "minecraft:behavior.stomp_attack"?: PartialWithAdditionalProperties<BehaviorStompAttack>
    "minecraft:behavior.stomp_turtle_egg"?: PartialWithAdditionalProperties<BehaviorStompTurtleEgg>
    "minecraft:behavior.stroll_towards_village"?: PartialWithAdditionalProperties<BehaviorStrollTowardsVillage>
    "minecraft:behavior.summon_entity"?: PartialWithAdditionalProperties<BehaviorSummonEntity>
    "minecraft:behavior.swell"?: PartialWithAdditionalProperties<BehaviorSwell>
    "minecraft:behavior.swim_idle"?: PartialWithAdditionalProperties<BehaviorSwimIdle>
    "minecraft:behavior.swim_up_for_breath"?: PartialWithAdditionalProperties<BehaviorSwimUpForBreath>
    "minecraft:behavior.swim_wander"?: PartialWithAdditionalProperties<BehaviorSwimWander>
    "minecraft:behavior.swim_with_entity"?: PartialWithAdditionalProperties<BehaviorSwimWithEntity>
    "minecraft:behavior.swoop_attack"?: PartialWithAdditionalProperties<BehaviorSwoopAttack>
    "minecraft:behavior.take_flower"?: PartialWithAdditionalProperties<BehaviorTakeFlower>
    "minecraft:behavior.teleport_to_owner"?: PartialWithAdditionalProperties<BehaviorTeleportToOwner>
    "minecraft:behavior.tempt"?: PartialWithAdditionalProperties<BehaviorTempt>
    "minecraft:behavior.timer_flag_1"?: PartialWithAdditionalProperties<BehaviorTimerFlag1>
    "minecraft:behavior.timer_flag_2"?: PartialWithAdditionalProperties<BehaviorTimerFlag2>
    "minecraft:behavior.timer_flag_3"?: PartialWithAdditionalProperties<BehaviorTimerFlag3>
    "minecraft:behavior.trade_interest"?: PartialWithAdditionalProperties<BehaviorTradeInterest>
    "minecraft:behavior.trade_with_player"?: PartialWithAdditionalProperties<BehaviorTradeWithPlayer>
    "minecraft:behavior.vex_copy_owner_target"?: PartialWithAdditionalProperties<BehaviorVexCopyOwnerTarget>
    "minecraft:behavior.vex_random_move"?: PartialWithAdditionalProperties<BehaviorVexRandomMove>
    "minecraft:behavior.wither_random_attack_pos_goal"?: PartialWithAdditionalProperties<BehaviorWitherRandomAttackPosGoal>
    "minecraft:behavior.wither_target_highest_damage"?: PartialWithAdditionalProperties<BehaviorWitherTargetHighestDamage>
    "minecraft:behavior.work"?: PartialWithAdditionalProperties<BehaviorWork>
    "minecraft:behavior.work_composter"?: PartialWithAdditionalProperties<BehaviorWorkComposter>
    "minecraft:attack"?: PartialWithAdditionalProperties<Attack>
    "minecraft:spell_effects"?: PartialWithAdditionalProperties<SpellEffects>
    "minecraft:strength"?: PartialWithAdditionalProperties<Strength>
    "minecraft:addrider"?: PartialWithAdditionalProperties<AddRider>
    "minecraft:admire_item"?: PartialWithAdditionalProperties<AdmireItem>
    "minecraft:ageable"?: PartialWithAdditionalProperties<Ageable>
    "minecraft:anger_level"?: PartialWithAdditionalProperties<AngerLevel>
    "minecraft:angry"?: PartialWithAdditionalProperties<Angry>
    "minecraft:annotation.break_door"?: PartialWithAdditionalProperties<AnnotationBreakDoor>
    "minecraft:annotation.open_door"?: PartialWithAdditionalProperties<AnnotationOpenDoor>
    "minecraft:area_attack"?: PartialWithAdditionalProperties<AreaAttack>
    "minecraft:attack_cooldown"?: PartialWithAdditionalProperties<AttackCooldown>
    "minecraft:barter"?: PartialWithAdditionalProperties<Barter>
    "minecraft:block_climber"?: PartialWithAdditionalProperties<BlockClimber>
    "minecraft:block_sensor"?: PartialWithAdditionalProperties<BlockSensor>
    "minecraft:boostable"?: PartialWithAdditionalProperties<Boostable>
    "minecraft:boss"?: PartialWithAdditionalProperties<Boss>
    "minecraft:break_blocks"?: PartialWithAdditionalProperties<BreakBlocks>
    "minecraft:breathable"?: PartialWithAdditionalProperties<Breathable>
    "minecraft:breedable"?: PartialWithAdditionalProperties<Breedable>
    "minecraft:bribeable"?: PartialWithAdditionalProperties<Bribeable>
    "minecraft:buoyant"?: PartialWithAdditionalProperties<Buoyant>
    "minecraft:burns_in_daylight"?: PartialWithAdditionalProperties<BurnsInDaylight>
    "minecraft:can_join_raid"?: PartialWithAdditionalProperties<CanJoinRaid>
    "minecraft:celebrate_hunt"?: PartialWithAdditionalProperties<CelebrateHunt>
    "minecraft:collision_box"?: PartialWithAdditionalProperties<CollisionBox>
    "minecraft:combat_regeneration"?: PartialWithAdditionalProperties<CombatRegeneration>
    "minecraft:conditional_bandwidth_optimization"?: PartialWithAdditionalProperties<ConditionalBandwidthOptimization>
    "minecraft:custom_hit_test"?: PartialWithAdditionalProperties<CustomHitTest>
    "minecraft:damage_over_time"?: PartialWithAdditionalProperties<DamageOverTime>
    "minecraft:damage_sensor"?: PartialWithAdditionalProperties<DamageSensor>
    "minecraft:dash"?: PartialWithAdditionalProperties<Dash>
    "minecraft:despawn"?: PartialWithAdditionalProperties<Despawn>
    "minecraft:dimension_bound"?: PartialWithAdditionalProperties<DimensionBound>
    "minecraft:drying_out_timer"?: PartialWithAdditionalProperties<DryingOutTimer>
    "minecraft:economy_trade_table"?: PartialWithAdditionalProperties<EconomyTradeTable>
    "minecraft:entity_armor_equipment_slot_mapping"?: PartialWithAdditionalProperties<EntityArmorEquipmentSlotMapping>
    "minecraft:entity_sensor"?: PartialWithAdditionalProperties<EntitySensor>
    "minecraft:environment_sensor"?: PartialWithAdditionalProperties<EnvironmentSensor>
    "minecraft:equip_item"?: PartialWithAdditionalProperties<EquipItem>
    "minecraft:equippable"?: PartialWithAdditionalProperties<Equippable>
    "minecraft:exhaustion_values"?: PartialWithAdditionalProperties<ExhaustionValues>
    "minecraft:experience_reward"?: PartialWithAdditionalProperties<ExperienceReward>
    "minecraft:explode"?: PartialWithAdditionalProperties<Explode>
    "minecraft:flocking"?: PartialWithAdditionalProperties<Flocking>
    "minecraft:game_event_movement_tracking"?: PartialWithAdditionalProperties<GameEventMovementTracking>
    "minecraft:genetics"?: PartialWithAdditionalProperties<Genetics>
    "minecraft:giveable"?: PartialWithAdditionalProperties<Giveable>
    "minecraft:group_size"?: PartialWithAdditionalProperties<GroupSize>
    "minecraft:grows_crop"?: PartialWithAdditionalProperties<GrowsCrop>
    "minecraft:healable"?: PartialWithAdditionalProperties<Healable>
    "minecraft:heartbeat"?: PartialWithAdditionalProperties<Heartbeat>
    "minecraft:home"?: PartialWithAdditionalProperties<Home>
    "minecraft:hurt_on_condition"?: PartialWithAdditionalProperties<HurtOnCondition>
    "minecraft:inside_block_notifier"?: PartialWithAdditionalProperties<InsideBlockNotifier>
    "minecraft:insomnia"?: PartialWithAdditionalProperties<Insomnia>
    "minecraft:instant_despawn"?: PartialWithAdditionalProperties<InstantDespawn>
    "minecraft:interact"?: PartialWithAdditionalProperties<Interact>
    "minecraft:inventory"?: PartialWithAdditionalProperties<Inventory>
    "minecraft:item_hopper"?: PartialWithAdditionalProperties<ItemHopper>
    "minecraft:jump.dynamic"?: PartialWithAdditionalProperties<JumpDynamic>
    "minecraft:jump.static"?: PartialWithAdditionalProperties<JumpStatic>
    "minecraft:leashable"?: PartialWithAdditionalProperties<Leashable>
    "minecraft:looked_at"?: PartialWithAdditionalProperties<LookedAt>
    "minecraft:managed_wandering_trader"?: PartialWithAdditionalProperties<ManagedWanderingTrader>
    "minecraft:mob_effect"?: PartialWithAdditionalProperties<MobEffect>
    "minecraft:mob_effect_immunity"?: PartialWithAdditionalProperties<MobEffectImmunity>
    "minecraft:movement.amphibious"?: PartialWithAdditionalProperties<MovementAmphibious>
    "minecraft:movement.basic"?: PartialWithAdditionalProperties<MovementBasic>
    "minecraft:movement.fly"?: PartialWithAdditionalProperties<MovementFly>
    "minecraft:movement.generic"?: PartialWithAdditionalProperties<MovementGeneric>
    "minecraft:movement.hover"?: PartialWithAdditionalProperties<MovementHover>
    "minecraft:movement.jump"?: PartialWithAdditionalProperties<MovementJump>
    "minecraft:movement.skip"?: PartialWithAdditionalProperties<MovementSkip>
    "minecraft:movement.sway"?: PartialWithAdditionalProperties<MovementSway>
    "minecraft:nameable"?: PartialWithAdditionalProperties<Nameable>
    "minecraft:navigation.climb"?: PartialWithAdditionalProperties<NavigationClimb>
    "minecraft:navigation.float"?: PartialWithAdditionalProperties<NavigationFloat>
    "minecraft:navigation.fly"?: PartialWithAdditionalProperties<NavigationFly>
    "minecraft:navigation.generic"?: PartialWithAdditionalProperties<NavigationGeneric>
    "minecraft:navigation.hover"?: PartialWithAdditionalProperties<NavigationHover>
    "minecraft:navigation.swim"?: PartialWithAdditionalProperties<NavigationSwim>
    "minecraft:navigation.walk"?: PartialWithAdditionalProperties<NavigationWalk>
    "minecraft:npc"?: PartialWithAdditionalProperties<NPC>
    "minecraft:out_of_control"?: PartialWithAdditionalProperties<OutOfControl>
    "minecraft:peek"?: PartialWithAdditionalProperties<Peek>
    "minecraft:persistent"?: PartialWithAdditionalProperties<Persistent>
    "minecraft:physics"?: PartialWithAdditionalProperties<Physics>
    "minecraft:preferred_path"?: PartialWithAdditionalProperties<PreferredPath>
    "minecraft:projectile"?: PartialWithAdditionalProperties<Projectile>
    "minecraft:pushable"?: PartialWithAdditionalProperties<Pushable>
    "minecraft:raid_trigger"?: PartialWithAdditionalProperties<RaidTrigger>
    "minecraft:rail_movement"?: PartialWithAdditionalProperties<RailMovement>
    "minecraft:rail_sensor"?: PartialWithAdditionalProperties<RailSensor>
    "minecraft:ravager_blocked"?: PartialWithAdditionalProperties<RavagerBlocked>
    "minecraft:reflect_projectiles"?: PartialWithAdditionalProperties<ReflectProjectiles>
    "minecraft:rideable"?: PartialWithAdditionalProperties<Rideable>
    "minecraft:scale_by_age"?: PartialWithAdditionalProperties<ScaleByAge>
    "minecraft:scheduler"?: PartialWithAdditionalProperties<Scheduler>
    "minecraft:shareables"?: PartialWithAdditionalProperties<Shareables>
    "minecraft:shooter"?: PartialWithAdditionalProperties<Shooter>
    "minecraft:sittable"?: PartialWithAdditionalProperties<Sittable>
    "minecraft:spawn_entity"?: PartialWithAdditionalProperties<SpawnEntity>
    "minecraft:suspect_tracking"?: PartialWithAdditionalProperties<SuspectTracking>
    "minecraft:tameable"?: PartialWithAdditionalProperties<Tameable>
    "minecraft:tamemount"?: PartialWithAdditionalProperties<TameMount>
    "minecraft:target_nearby_sensor"?: PartialWithAdditionalProperties<TargetNearbySensor>
    "minecraft:teleport"?: PartialWithAdditionalProperties<Teleport>
    "minecraft:tick_world"?: PartialWithAdditionalProperties<TickWorld>
    "minecraft:timer"?: PartialWithAdditionalProperties<Timer>
    "minecraft:trade_table"?: PartialWithAdditionalProperties<TradeTable>
    "minecraft:trail"?: PartialWithAdditionalProperties<Trail>
    "minecraft:transformation"?: PartialWithAdditionalProperties<Transformation>
    "minecraft:transient"?: PartialWithAdditionalProperties<Transient>
    "minecraft:trusting"?: PartialWithAdditionalProperties<Trusting>
    "minecraft:variable_max_auto_step"?: PartialWithAdditionalProperties<VariableMaxAutoStep>
    "minecraft:vibration_damper"?: PartialWithAdditionalProperties<VibrationDamper>
    "minecraft:vibration_listener"?: PartialWithAdditionalProperties<VibrationListener>
    "minecraft:water_movement"?: PartialWithAdditionalProperties<WaterMovement>
    "minecraft:ambient_sound_interval"?: PartialWithAdditionalProperties<AmbientSoundInterval>
    "minecraft:body_rotation_blocked"?: PartialWithAdditionalProperties<BodyRotationBlocked>
    "minecraft:can_climb"?: PartialWithAdditionalProperties<CanClimb>
    "minecraft:can_fly"?: PartialWithAdditionalProperties<CanFly>
    "minecraft:can_power_jump"?: PartialWithAdditionalProperties<CanPowerJump>
    "minecraft:cannot_be_attacked"?: PartialWithAdditionalProperties<CannotBeAttacked>
    "minecraft:color"?: PartialWithAdditionalProperties<Color>
    "minecraft:color2"?: PartialWithAdditionalProperties<Color2>
    "minecraft:default_look_angle"?: PartialWithAdditionalProperties<DefaultLookAngle>
    "minecraft:equipment"?: PartialWithAdditionalProperties<Equipment>
    "minecraft:fire_immune"?: PartialWithAdditionalProperties<FireImmune>
    "minecraft:floats_in_liquid"?: PartialWithAdditionalProperties<FloatsInLiquid>
    "minecraft:flying_speed"?: PartialWithAdditionalProperties<FlyingSpeed>
    "minecraft:friction_modifier"?: PartialWithAdditionalProperties<FrictionModifier>
    "minecraft:ground_offset"?: PartialWithAdditionalProperties<GroundOffset>
    "minecraft:ignore_cannot_be_attacked"?: PartialWithAdditionalProperties<IgnoreCannotBeAttacked>
    "minecraft:input_ground_controlled"?: PartialWithAdditionalProperties<InputGroundControlled>
    "minecraft:is_baby"?: PartialWithAdditionalProperties<IsBaby>
    "minecraft:is_charged"?: PartialWithAdditionalProperties<IsCharged>
    "minecraft:is_chested"?: PartialWithAdditionalProperties<IsChested>
    "minecraft:is_dyeable"?: PartialWithAdditionalProperties<IsDyeable>
    "minecraft:is_hidden_when_invisible"?: PartialWithAdditionalProperties<IsHiddenWhenInvisible>
    "minecraft:is_ignited"?: PartialWithAdditionalProperties<IsIgnited>
    "minecraft:is_illager_captain"?: PartialWithAdditionalProperties<IsIllagerCaptain>
    "minecraft:is_pregnant"?: PartialWithAdditionalProperties<IsPregnant>
    "minecraft:is_saddled"?: PartialWithAdditionalProperties<IsSaddled>
    "minecraft:is_shaking"?: PartialWithAdditionalProperties<IsShaking>
    "minecraft:is_sheared"?: PartialWithAdditionalProperties<IsSheared>
    "minecraft:is_stackable"?: PartialWithAdditionalProperties<IsStackable>
    "minecraft:is_stunned"?: PartialWithAdditionalProperties<IsStunned>
    "minecraft:is_tamed"?: PartialWithAdditionalProperties<IsTamed>
    "minecraft:item_controllable"?: PartialWithAdditionalProperties<ItemControllable>
    "minecraft:loot"?: PartialWithAdditionalProperties<Loot>
    "minecraft:mark_variant"?: PartialWithAdditionalProperties<MarkVariant>
    "minecraft:movement_sound_distance_offset"?: PartialWithAdditionalProperties<MovementSoundDistanceOffset>
    "minecraft:push_through"?: PartialWithAdditionalProperties<PushThrough>
    "minecraft:renders_when_invisible"?: PartialWithAdditionalProperties<RendersWhenInvisible>
    "minecraft:scale"?: PartialWithAdditionalProperties<Scale>
    "minecraft:skin_id"?: PartialWithAdditionalProperties<SkinID>
    "minecraft:sound_volume"?: PartialWithAdditionalProperties<SoundVolume>
    "minecraft:type_family"?: PartialWithAdditionalProperties<TypeFamily>
    "minecraft:variant"?: PartialWithAdditionalProperties<Variant>
    "minecraft:walk_animation_speed"?: PartialWithAdditionalProperties<WalkAnimationSpeed>
    "minecraft:wants_jockey"?: PartialWithAdditionalProperties<WantsJockey>
    "minecraft:on_death"?: PartialWithAdditionalProperties<OnDeath>
    "minecraft:on_friendly_anger"?: PartialWithAdditionalProperties<OnFriendlyAnger>
    "minecraft:on_hurt"?: PartialWithAdditionalProperties<OnHurt>
    "minecraft:on_hurt_by_player"?: PartialWithAdditionalProperties<OnHurtByPlayer>
    "minecraft:on_ignite"?: PartialWithAdditionalProperties<OnIgnite>
    "minecraft:on_start_landing"?: PartialWithAdditionalProperties<OnStartLanding>
    "minecraft:on_start_takeoff"?: PartialWithAdditionalProperties<OnStartTakeoff>
    "minecraft:on_target_acquired"?: PartialWithAdditionalProperties<OnTargetAcquired>
    "minecraft:on_target_escape"?: PartialWithAdditionalProperties<OnTargetEscape>
    "minecraft:on_wake_with_owner"?: PartialWithAdditionalProperties<OnWakeWithOwner>
}

type EventTarget = "block"|"damager"|"self"|"other"|"player"|"parent"|"target";

export interface Trigger {
    /**
     * The list of conditions for this trigger to fire
     */
    filters?: ServerFilters|ServerFilters[];
    /**
     * The target who will fire the event
     * @default "self"
     */
    target?: EventTarget;
    /**
     * The event to fire when the conditions are met
     */
    event?: string;
}

export interface EntityType {
    /**
     * The amount of time in seconds to wait before selecting a target of the same type again
     * @default 0
     */
    cooldown: number;
    /**
     * Conditions that make this entry valid
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Max distance away this entity can be from the target to be selected
     * @default 16
     */
    max_dist: number;
    /**
     * If true, potential target must be visible to be selected
     * @default false
     */
    must_see: boolean;
    /**
     * The amount of time in seconds before the entity forgets the target that it can no longer see
     * @default 3
     */
    must_see_forget_duration: number;
    /**
     * If true, the target will be dropped if it no longer meets the conditions
     * @default false
     */
    reevaluate_description: boolean;
    /**
     * Multiplier for the running speed
     * @default 1.0
     */
    sprint_speed_multiplier: number;
    /**
     * Multiplier for the walking speed
     * @default 1.0
     */
    walk_speed_multiplier: number;
}

// #region Attributes

/**
 * Defines the entity's melee attack and any additional effects
 */
export interface Attack {
    /**
     * Range of random damage to deal, negative values can heal the target
     */
    damage: number|[number, number];
    /**
     * The effect to apply to the target
     */
    effect_name: MobEffects;
    /**
     * The duration of the effect in seconds
     */
    effect_duration: number;
}

/**
 * Defines what mob effects to add/remove when this component is added
 */
export interface SpellEffects {
    /**
     * List of effects to add
     */
    add_effects: {
        /**
         * The id of the effect
         */
        effect: MobEffect;
        /**
         * The duration of the effect in seconds
         */
        duration: number;
        /**
         * The amplifier of the effect
         */
        amplifier: number;
        /**
         * If true, the effect will be displayed on the screen
         */
        display_on_screen_animation: boolean;
    }[];
    /**
     * A list of effect ids to remove
     */
    remove_effects: string[];
}

/**
 * Defines the entity's strength to carry items
 */
export interface Strength {
    /**
     * The max strength of the entity
     */
    max: number;
    /**
     * The initial value of the strength
     */
    value: number;
}

// #endregion

// #region Behaviors

/**
 * Can cause entity to admire items configured as admireable, requires {@link AdmireItem}
 */
export interface BehaviorAdmireItem {
    /**
     * The sound event to play when admiring the item
     */
    admire_item_sound: string;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval: [number, number];
}

/**
 * Can cause this entity to avoid certain blocks
 */
export interface BehaviorAvoidBlock {
    /**
     * The sound event to play when avoiding the block
     */
    avoid_block_sound: string;
    /**
     * The event trigger to fire when escaping
     */
    on_escape: Trigger;
    /**
     * Max block distance on the y axis to search
     * @default 0
     */
    search_height: number;
    /**
     * Max block distance on the x and z axis to search
     * @default 0
     */
    search_range: number;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     * @default [3.0,8.0]
     */
    sound_interval: [number, number];
    /**
     * Modifier for sprint speed
     * @default 1.0
     */
    sprint_speed_modifier: number;
    /**
     * List of blocks to avoid
     */
    target_blocks: string[];
    /**
     * Block search method
     * @default "nearest"
     */
    target_selection_method: "nearest"|"random";
    /**
     * Interval for starting to search for a new block to avoid
     * @default 1
     */
    tick_interval: number;
    /**
     * Modifier for walk speed
     * @default 1.0
     */
    walk_speed_modifier: number;
}

/**
 * Can cause the entity to run away from other entities that match the criteria
 */
export interface BehaviorAvoidMobType {
    /**
     * The sound event to play when avoiding the mob
     */
    avoid_mob_sound: string;
    /**
     * The x and z axis distance to avoid the target
     * @default 16
     */
    avoid_target_xz: number;
    /**
     * The y axis distance to avoid the target
     * @default 7
     */
    avoid_target_y: number;
    /**
     * Conditions to determine if the entity should avoid the target
     */
    entity_types: EntityType[];
    /**
     * If true, ignore whether the entity has a direct line of sight to the target
     * @default false
     */
    ignore_visibility: boolean;
    /**
     * Maximum distance to look for an avoid target
     * @default 3
     */
    max_dist: number;
    /**
     * How many blocks from the avoid target the entity must be to stop fleeing
     * @default 10
     */
    max_flee: number;
    /**
     * Event trigger to fire when escaping from a mob
     */
    on_escape_event: Trigger;
    /**
     * Percent chance the entity will stop avoiding another based on that entity's strength, where 0 is 0% and 1 is 100%
     * @default 1.0
     */
    probability_per_strength: number;
    /**
     * If true, the entity's target is removed when it starts fleeing
     * @default false
     */
    remove_target: boolean;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     * @default [3.0,8.0]
     */
    sound_interval: [number, number];
    /**
     * How many blocks within range of its avoid target the entity must be for it to begin sprinting away from the avoid target
     * @default 7.0
     */
    sprint_distance: number;
    /**
     * Multiplier for sprint speed
     * @default 1.0
     */
    sprint_speed_multiplier: number;
    /**
     * Multiplier for walk speed
     * @default 1.0
     */
    walk_speed_multiplier: number;
}

/**
 * Can cause the entity to barter. Requires {@link Barter}
 */
export interface BehaviorBarter {}

/**
 * Can cause the entity to look at and follow a player holding certain items
 */
export interface BehaviorBeg {
    /**
     * List of items the mob likes
     */
    items: string[];
    /**
     * Distance in blocks the entity will beg from
     * @default 8.0
     */
    look_distance: number;
    /**
     * The range of time in seconds this mob will stare at the player
     * @default [2.0,4.0]
     */
    look_time: [number, number];
}

/**
 * Can cause the entity to break doors
 */
export interface BehaviorBreakDoor {}

/**
 * Can cause the entity to breed. Requires {@link Breedable}
 */
export interface BehaviorBreed {
    /**
     * Multiplier for movement speed
     * @default 1.0
     */
    speed_multiplier: number;
}

/**
 * Can cause the entity to celebrate surviving a raid with sounds and jumping
 */
export interface BehaviorCelebrate {
    /**
     * The sound event to play when celebrating
     */
    celebrate_sound: string;
    /**
     * Duration in seconds that the celebration lasts
     * @default 30.0
     */
    duration: number;
    /**
     * Random range in seconds between jumps
     * @default [1.0,3.5]
     */
    jump_interval: [number, number];
    /**
     * The trigger to fire when the goal's duration expires
     */
    on_celebration_end_event: Trigger;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     * @default [2.0,7.0]
     */
    sound_interval: [number, number];
}

/**
 * Can cause the entity to celebrate surviving a raid by shooting fireworks
 */
export interface BehaviorCelebrateSurvive {
    /**
     * Duration in seconds that the celebration lasts
     * @default 30.0
     */
    duration: number;
    /**
     * Random range in seconds between fireworks
     * @default [10.0,20.0]
     */
    fireworks_interval: [number, number];
    /**
     * The trigger to fire when the goal's duration expires
     */
    on_celebration_end_event: Trigger;
}

/**
 * Can cause the entity to damage a target by using a charging attack
 */
export interface BehaviorChargeAttack {
    /**
     * The max distance the entity can be from its target to start this behavior
     * @default 3.0
     */
    max_distance: number;
    /**
     * The min distance the entity can be from its target to start this behavior
     * @default 2.0
     */
    min_distance: number;
    /**
     * Multiplier for movement speed
     * @default 1.0
     */
    speed_multiplier: number;
    /**
     * Percant chance the entity will charge if not already attacking, where 0 is 0% and 1 is 100%
     * @default 0.1428
     */
    success_rate: number;
}

/**
 * Can cause the entity to charge and use their held item
 */
export interface BehaviorChargeHeldItem {
    items: string[];
}

/**
 * Causes an entity to circle around an anchor point placed near a point or target
 */
export interface BehaviorCircleAroundAnchor {
    /**
     * Number of degrees to change this entity's facing by when it selects its next anchor point
     * @default 15
     */
    angle_change: number;
    /**
     * Max distance from the anchor-point in which the entity considers itself to have reached the anchor point
     * @default 0.5
     */
    goal_radius: number;
    /**
     * The number of blocks above the target that the next anchor point can be set
     * @default [0,0]
     */
    height_above_target_range: [number, number];
    /**
     * Percent chance to determine how often to increase or decrease the current height around the anchor point. 0 is 0% and 1 is 100%
     */
    height_adjustment_chance: number;
    /**
     * @deprecated use `height_adjustment_chance` instead
     */
    height_offset_range: [number, number];
    /**
     * Percent chance to determine how often to increase the size of the current movement radius around the anchor point. 0 is 0% and 1 is 100%
     * @default 0.004
     */
    radius_adjustment_chance: number;
    /**
     * Vertical distance from the anchor point this entity must stay within, upon a successful height adjustment
     * @default [0,0]
     */
    radius_offset_range: number;
    /**
     * Number of blocks to increase the current movement radius upon successful `radius_adjustment_chance`
     * @default 1
     */
    radius_change: number;
    /**
     * Horizontal distance from the anchor point this entity must stay within
     * @default [5.0,15.0]
     */
    radius_range: [number, number];
    /**
     * Multiplier for movement speed
     * @default 1.0
     */
    speed_multiplier: number;
}

/**
 * Can cause the entity to be controlled by the player using an item. Requires {@link Rideable} and {@link ItemControllable}
 */
export interface BehaviorControlledByPlayer {
    /**
     * The entity will attempt to rate to face where the player is facing each tick, a normalized range where 1 matches the player's facing exactly
     * @default 0.5
     */
    fractional_rotation: number;
    /**
     * Limits the total degrees the entity can rotate per tick
     * @default 5.0
     */
    fractional_rotation_limit: number;
    /**
     * Speed multiplier for movement when controlled by the player
     * @default 1.0
     */
    mount_speed_multiplier: number;
}

/**
 * Can cause the entity to croak at a random inverval
 */
export interface BehaviorCroak {
    /**
     * Random duration in seconds after which croaking stops
     * @default 4.5
     */
    duration: [number, number]|number;
    /**
     * Conditions for starting and running the behavior
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Random range in seconds between runs of this behavior
     * @default [10.0,20.0]
     */
    interval: [number, number];
}

/**
 * Can cause the entity to target another entity that hurts an entity it trusts
 */
export interface BehaviorDefendTrustedTarget {
    /**
     * Sound event to play while defending
     */
    aggro_sound: string;
    /**
     * Time in seconds between attacks
     * @default 0
     */
    attack_interval: number;
    /**
     * Options to use under certain conditions
     */
    entity_types: EntityType[];
    /**
     * If true, only entities in viewing range can be selected as targets
     * @default false
     */
    must_see: boolean;
    /**
     * Determines the amount of time in seconds before the entity forgets the target that it can no longer see
     * @default 3.0
     */
    must_see_forget_duration: number;
    /**
     * Event trigger to fire when the entity starts defending
     */
    on_defend_start: Trigger;
    /**
     * Distance in blocks the target can be within in order to attack
     * @default 0
     */
    within_radius: number;
}

/**
 * Can cause the entity to stay in a village and defend it from aggressors
 */
export interface BehaviorDefendVillageTarget {
    /**
     * Percent chance of attacking aggressors, where 0 is 0% and 1 is 100%
     * @default 0.05
     */
    attack_chance: number;
}

/**
 * Can cause the entity to attack while delaying the damage dealing in order to sync it with an animation
 */
export interface BehaviorDelayedAttack {
    attack_duration: number;
    attack_once: boolean;
    attack_types: string[];
    can_spread_on_fire: boolean;
    hit_delay_pct: number;
    inner_boundary_time_increase: number;
    max_dist: number;
    max_path_time: number;
    melee_fov: number;
    min_path_time: number;
    on_attack: Trigger;
    outer_boundary_time_increase: number;
    path_fail_time_increase: number;
    path_innter_boundary: number;
    path_outer_boundary: number;
    random_stop_interval: number;
    reach_multiplier: number;
    require_complete_path: boolean;
    set_persistent: boolean;
    speed_multiplier: number;
    target_dist: number;
    track_target: boolean;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to dig into the ground before despawning
 */
export interface BehaviorDig {
    allow_dig_when_named: boolean;
    digs_in_daylight: boolean;
    duration: number;
    idle_time: number;
    on_start: Trigger;
    suspicion_is_disturbance: boolean;
    vibration_is_disturbance: boolean;
}

/**
 * Can cause the enity to open and close doors
 */
export interface BehaviorDoorInteract {}

/**
 * Can cause the entity to attack by charging. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonChargePlayer {
    active_speed: number;
    continue_charge_threshold_time: number;
    flight_speed: number;
    target_zone: [number, number];
    turn_speed: number;
}

/**
 * Can cause the entity to use a special death animation. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonDeath {}

/**
 * Can cause the entity to shoot flame-breath. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonFlaming {}

/**
 * Can cause the entity to circle in a holding platform. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonHoldingPattern {}

/**
 * Can cause the entity to transition into perch. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonLanding {}

/**
 * Can cause the entity to look for a player while perched. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonScanning {}

/**
 * Can cause the entity to look for player while flying. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonStrafePlayer {
    active_speed: number;
    fireball_range: number;
    flight_speed: number;
    switch_direction_probability: number;
    target_in_range_and_in_view_time: number;
    target_zone: [number, number];
    turn_speed: number;
    view_angle: number;
}

/**
 * Can cause the entity to transition out of perch. Can only be used by `minecraft:ender_dragon`
 */
export interface BehaviorDragonTakeOff {}

/**
 * Can cause the entity to drink milk under certain conditions
 */
export interface BehaviorDrinkMilk {
    cooldown_seconds: number;
    filters: ServerFilters|ServerFilters[];
}

/**
 * Can cause the entity to drink potions under certain conditions
 */
export interface BehaviorDrinkPotion {
    potions: {
        chance: number;
        filters: ServerFilters|ServerFilters[];
        id: number;
    }[];
    speed_modifier: number;
}

/**
 * Can cause the entity to move towards a target and drop an item near them
 */
export interface BehaviorDropItemFor {
    cooldown: number;
    drop_item_chance: number;
    entity_types: ServerFilters|ServerFilters[];
    goal_radius: number;
    loot_table: string;
    max_head_look_at_height: number;
    minimum_teleport_distance: number;
    offering_distance: number;
    on_drop_attempt: Trigger;
    search_count: number;
    search_height: number;
    search_range: number;
    seconds_before_pickup: number;
    speed_multiplier: number;
    target_range: [number, number];
    teleport_offset: [number, number, number];
    time_of_day_range: [number, number];
}

/**
 * Can cause the entity to consume a block, replacing it with another block
 */
export interface BehaviorEatBlock {
    eat_and_replace_block_pairs: {
        eat_block: string;
        replace_block: string;
    }[];
    on_eat: Trigger;
    success_chance: Molang;
    time_until_eat: number;
}

/**
 * Can cause the entity to eat food it is carrying
 */
export interface BehaviorEatCarriedItem {
    delay_before_eating: number;
}

/**
 * Can cause the entity to eat another entity
 */
export interface BehaviorEatMob {
    eat_animation_time: number;
    eat_mob_sound: string;
    loot_table: string;
    pull_in_force: number;
    reach_mob_distance: number;
    run_speed: number;
}

/**
 * Can cause the entity to emerge from the ground
 */
export interface BehaviorEmerge {
    cooldown_time: number;
    duration: number;
    on_done: Trigger;
}

/**
 * Can cause the entity to leave blocks. Can only be used by `minecraft:enderman`
 */
export interface BehaviorEndermanLeaveBlock {}

/**
 * Can cause the entity to take blocks. Can only be used by `minecraft:enderman`
 */
export interface BehaviorEndermanTakeBlock {}

/**
 * Can cause the entity to put on desired equipment
 */
export interface BehaviorEquipItem {}

/**
 * Can cause the entity to first travel to a random point on the village outskirts. Requires {@link Dweller} and {@link SharedNavigation}
 */
export interface BehaviorExploreOutskirts {
    dist_from_boundary: [number, number, number];
    explore_dist: number;
    max_travel_time: number;
    max_wait_time: number;
    min_dist_from_target: number;
    min_perimeter: number;
    min_wait_time: number;
    next_xz: number;
    next_y: number;
    speed_multiplier: number;
    timer_ratio: number;
}

/**
 * Can cause the entity to search wiehin an area for growable crops that they will fertilize
 */
export interface BehaviorFertilizeFarmBlock {
    goal_radius: number;
    max_fertilizer_usage: number;
    search_cooldown_max_seconds: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to seek shade
 */
export interface BehaviorFindCover {
    cooldown_time: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to look for a mount
 */
export interface BehaviorFindMount {
    avoid_water: boolean;
    mount_distance: number;
    start_delay: number;
    target_needed: boolean;
    within_radius: number;
}

/**
 * Can cause the entity to move towards the nearest underwater ruin or shipwreck
 */
export interface BehaviorFindUnderwaterTreasure {
    search_range: number;
    speed_multiplier: number;
    stop_distance: number;
}

/**
 * Can cause the entity to attack by firing a shot with a delay
 */
export interface BehaviorFireAtTarget {
    attack_cooldown: number;
    attack_range: [number, number];
    filters: ServerFilters|ServerFilters[];
    max_head_rotation_x: number;
    max_head_rotation_y: number;
    owner_anchor: number;
    owner_offset: [number, number, number];
    post_shoot_delay: number;
    pre_shoot_delay: number;
    projectile_def: string;
    ranged_fov: number;
    target_anchor: number;
    target_offset: [number, number, number];
}

/**
 * Can cause the entity to run from direct sunlight and seek shade
 */
export interface BehaviorFleeSun {
    speed_multiplier: number;
}

/**
 * Can cause the mob to stay afloat while swimming
 */
export interface BehaviorFloat {
    sink_with_passengers: boolean;
}

/**
 * Can cause the mob to float like a Ghast
 */
export interface BehaviorFloatWander {
    float_duration: [number, number];
    must_reach: boolean;
    random_reselect: boolean;
    xz_dist: number;
    y_dist: number;
    y_offset: number;
}

/**
 * Can cause the entity to follow a caravan
 */
export interface BehaviorFollowCaravan {
    entity_count: number;
    entity_types: EntityType[];
    speed_multiplier: number;
}

/**
 * Can cause the entity to follow other mobs
 */
export interface BehaviorFollowMob {
    search_range: number;
    speed_multiplier: number;
    stop_distance: number;
}

/**
 * Can cause the entity to follow the owning player
 */
export interface BehaviorFollowOwner {
    can_teleport: boolean;
    ignore_vibration: boolean;
    max_distance: number;
    post_teleport_distance: number;
    speed_multiplier: number;
    start_distance: number;
    stop_distance: number;
}

/**
 * Can cause the entity to follow its parent
 */
export interface BehaviorFollowParent {
    can_teleport: boolean;
    ignore_vibration: boolean;
    max_distance: number;
    post_teleport_distance: number;
    speed_multiplier: number;
    start_distance: number;
    stop_distance: number;
}

/**
 * Can cause the entity to follow its current target captain
 */
export interface BehaviorFollowTargetCaptain {
    follow_distance: number;
    within_radius: number;
}

/**
 * Can cause the entity to toss the items from its inventory to a recently played Noteblock
 */
export interface BehaviorGoAndGiveItemsToNoteblock {
    listen_time: number;
    on_item_throw: Trigger;
    reach_block_distance: number;
    run_speed: number;
    throw_force: number;
    throw_sound: string;
    vertical_throw_mul: number;
}

/**
 * Can cause the entity to toss items from its inventory to its owner
 */
export interface BehaviorGoAndGiveItemsToOwner {
    on_item_throw: Trigger;
    reach_block_distance: number;
    run_speed: number;
    throw_force: number;
    throw_sound: string;
    vertical_throw_mul: number;
}

/**
 * Can cause the entity to go to the location where they were spawned. Requires {@link Home}
 */
export interface BehaviorGoHome {
    calculate_new_path_radius: number;
    goal_radius: number;
    interval: number;
    on_failed: Trigger;
    on_home: Trigger;
    speed_multiplier: number;
}

/**
 * Can cause the entity to use a laser beam attack. Can only be used by `minecraft:guardian` and `minecraft:elder_guardian`
 */
export interface BehaviorGuardianAttack {
    elder_extra_magic_damage: number;
    hard_mode_extra_magic_damage: number;
    magic_damage: number;
    min_distance: number;
    sound_delay_time: number;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to search within an area for valid farmland to till. Requires {@link Inventory} and {@link SharedNavigation}
 */
export interface BehaviorHarvestFarmBlock {
    goal_radius: number;
    max_seconds_before_search: number;
    search_cooldown_max_seconds: number;
    search_count: number;
    search_height: number;
    search_range: number;
    seconds_until_new_task: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to attempt to move to and hide at a POI
 */
export interface BehaviorHide {
    duration: number;
    poi_type: string;
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to freeze and look at their target
 */
export interface BehaviorHoldGround {
    broadcast: boolean;
    broadcast_range: number;
    min_radius: number;
    within_radius_event: string;
}

/**
 * Can cause the entity to target a mob that hurt them
 */
export interface BehaviorHurtByTarget {
    alert_same_type: boolean;
    entity_types: EntityType[];
    hurt_owner: boolean
}

/**
 * Can cause the entity to inspect bookshelves
 */
export interface BehaviorInspectBookshelf {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move towards a suspicious position. Requires {@link SuspectTracking}
 */
export interface BehaviorInvestigateSuspiciousLocation {
    goal_radius: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to jump around a target
 */
export interface BehaviorJumpAroundTarget {
    check_collision: boolean;
    entity_bounding_box_scale: number;
    filters: ServerFilters|ServerFilters[];
    jump_angles: number[];
    jump_cooldown_duration: number;
    landing_distance_from_target: [number, number];
    landing_position_spread_degrees: number;
    last_hurt_duration: number;
    line_of_sight_obstruction_height_ignore: number;
    max_jump_velocity: number;
    prepare_jump_duration: number;
    required_vertical_space: number;
    snap_to_surface_block_range: number;
    valid_distance_to_target: [number, number];
}

/**
 * Can cause the entity to jump to another random block
 */
export interface BehaviorJumpToBlock {
    cooldown_range: [number, number];
    forbidden_blocks: string[];
    max_velocity: number;
    minimum_distance: number;
    minimum_path_length: number;
    preferred_blocks: string[];
    preferred_blocks_chance: number;
    scale_factor: number;
    search_height: number;
    search_width: number;
}

/**
 * Can cause the entity to perform a damaging knockback attack
 */
export interface BehaviorKnockbackRoar {
    attack_time: number;
    cooldown_time: number;
    damage_filters: ServerFilters|ServerFilters[];
    duration: number;
    knockback_damage: number;
    knockback_filters: ServerFilters|ServerFilters[];
    knockback_height_cap: number;
    knockback_horizontal_strength: number;
    knockback_range: number;
    knockback_vertical_strength: number;
    on_roar_end: Trigger;
}

/**
 * Can cause the entity to lay down
 */
export interface BehaviorLayDown {
    interval: number;
    random_stop_interval: number;
}

/**
 * Can cause the entity to lay egg blocks if pregnant
 */
export interface BehaviorLayEgg {
    allow_laying_from_below: boolean;
    egg_type: string;
    goal_radius: number;
    lay_egg_sound: string;
    lay_seconds: number;
    on_lay: Trigger;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    target_blocks: string[];
    target_materials_above_block: "Air"|"Water"|"Lava"[];
    use_default_animation: boolean;
}

/**
 * Can cause the entity to jump at and attack their target
 */
export interface BehaviorLeapAtTarget {
    must_be_on_ground: boolean;
    set_persistent: boolean;
    yd: number;
}

/**
 * Can cause the entity to look at a nearby entity
 */
export interface BehaviorLookAtEntity {
    angle_of_view_horizontal: number;
    angle_of_view_vertical: number;
    filters: ServerFilters|ServerFilters[];
    look_distance: number;
    look_time: [number, number];
    probability: number;
}

/**
 * Can cause the entity to look at a nearby player
 */
export interface BehaviorLookAtPlayer {
    angle_of_view_horizontal: number;
    angle_of_view_vertical: number;
    look_distance: number;
    look_time: [number, number];
    probability: number;
}

/**
 * Can cause the entity to look at a nearby target
 */
export interface BehaviorLookAtTarget {
    angle_of_view_horizontal: number;
    angle_of_view_vertical: number;
    look_distance: number;
    look_time: [number, number];
    probability: number;
}

/**
 * Can cause the entity to look at a the player they are trading with
 */
export interface BehaviorLookAtTradingPlayer {
    angle_of_view_horizontal: number;
    angle_of_view_vertical: number;
    look_distance: number;
    look_time: [number, number];
    probability: number;
}

/**
 * Allows the entity to look for a mate. Can only be used by `minecraft:villager`
 */
export interface BehaviorMakeLove {}

/**
 * Can cause the entity to perform a melee attack
 */
export interface BehaviorMeleeAttack {
    attack_once: boolean;
    attack_types: string[];
    can_spread_on_fire: boolean;
    cooldown_time: number;
    inner_boundary_time_increase: number;
    max_dist: number;
    max_path_time: number;
    melee_fov: number;
    min_path_time: number;
    on_attack: Trigger;
    outer_boundary_time_increase: number;
    path_fail_time_increase: number;
    path_inner_boundary: number;
    path_outer_boundary: number;
    random_stop_interval: number;
    reach_multiplier: number;
    require_complete_path: boolean;
    set_persistent: boolean;
    speed_multiplier: number;
    target_dist: number;
    track_target: boolean;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to perform a melee attack based on bounding box calculations
 */
export interface BehaviorMeleeBoxAttack {
    attack_once: boolean;
    attack_types: string[];
    can_spread_on_fire: boolean;
    cooldown_time: number;
    inner_boundary_time_increase: number;
    max_dist: number;
    max_path_time: number;
    melee_fov: number;
    min_path_time: number;
    on_attack: Trigger;
    outer_boundary_time_increase: number;
    path_fail_time_increase: number;
    path_inner_boundary: number;
    path_outer_boundary: number;
    random_stop_interval: number;
    reach_multiplier: number;
    require_complete_path: boolean;
    set_persistent: boolean;
    speed_multiplier: number;
    target_dist: number;
    track_target: boolean;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to go to the village bell and mingle
 */
export interface BehaviorMingle {
    cooldown_time: number;
    duration: number;
    mingle_distance: number;
    mingle_partner_type: string[];
    speed_multiplier: number;
}

/**
 * Can cause the entity to move around on its own while mounted seeking a target to attack
 */
export interface BehaviorMountPathing {
    speed_multiplier: number;
    target_dist: number;
    track_target: boolean;
}

/**
 * Can cause the entity to move around a target
 */
export interface BehaviorMoveAroundTarget {
    destination_pos_search_spread_degrees: number;
    destination_position_range: [number, number];
    filters: ServerFilters|ServerFilters[];
    height_difference_limit: number;
    horizontal_search_distance: number;
    movement_speed: number;
    vertical_search_distance: number;
}

/**
 * Can cause the entity to move indoors
 */
export interface BehaviorMoveIndoors {
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to move outdoors
 */
export interface BehaviorMoveOutdoors {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to move to a block
 */
export interface BehaviorMoveToBlock {
    goal_radius: number;
    on_reach: Trigger;
    on_stay_completed: Trigger;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    start_chance: number;
    stay_duration: number;
    target_blocks: string[];
    target_offset: [number, number, number];
    target_selection_method: "nearest"|"random";
    tick_interval: number;
}

/**
 * Can cause the entity to move to ground
 */
export interface BehaviorMoveToLand {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move into lava
 */
export interface BehaviorMoveToLava {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move into a liquid
 */
export interface BehaviorMoveToLiquid {
    goal_radius: number;
    material_type: "Any"|"Water"|"Lava";
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to move to a POI
 */
export interface BehaviorMoveToPOI {
    poi_type: string;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move towards a random block
 */
export interface BehaviorMoveToRandomBlock {
    block_distance: number;
    within_radius: number;
}

/**
 * Can cause the entity to move to a random location within a village
 */
export interface BehaviorMoveThroughVillage {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    cooldown_time: number;
}

/**
 * Can cause the entity to move to water
 */
export interface BehaviorMoveToWater {
    goal_radius: number;
    search_count: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to move towards their dwelling. Requires {@link Dweller} and {@link SharedNavigation}
 */
export interface BehaviorMoveTowardsDwellingRestriction {
    speed_multiplier: number;
}

/**
 * Can cause the entity to move towards their home. Requires {@link Home} and {@link SharedNavigation}
 */
export interface BehaviorMoveTowardsHomeRestriction {
    speed_multiplier: number;
}

/**
 * Can cause the entity to move towards its target
 */
export interface BehaviorMoveTowardsTarget {
    within_radius: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move towards home bed
 */
export interface BehaviorMoveTowardsDwellingRestriction {
    within_radius: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to take naps
 */
export interface BehaviorNap {
    cooldown_max: number;
    cooldown_min: number;
    mob_detect_dist: number;
    mob_detect_height: number;
}

/**
 * Can cause the entity to attack the closest target that matches the conditions
 */
export interface BehaviorNearestAttackableTarget {
    attack_interval: number;
    attack_interval_min: number;
    attack_owner: boolean;
    entity_types: EntityType[];
    must_reach: boolean;
    must_see: boolean;
    must_see_forget_duration: number;
    persist_time: number;
    reselect_targets: boolean;
    scan_interval: number;
    set_persistent: boolean;
    target_invisible_multiplier: number;
    target_search_height: number;
    target_sneak_visibility_multiplier: number;
    within_radius: number;
}

/**
 * Can cause the entity to attack the highest priority target that matches the conditions
 */
export interface BehaviorNearestPrioritizedAttackableTarget {
    attack_interval: number;
    attack_interval_min: number;
    attack_owner: boolean;
    entity_types: (EntityType & {priority: number})[];
    must_reach: boolean;
    must_see: boolean;
    must_see_forget_duration: number;
    persist_time: number;
    reselect_targets: boolean;
    scan_interval: number;
    set_persistent: boolean;
    target_invisible_multiplier: number;
    target_search_height: number;
    target_sneak_visibility_multiplier: number;
    within_radius: number;
}

/**
 * Can cause the entity to sit in place like the Ocelot
 */
export interface BehaviorOcelotSitOnBlock {
    speed_multiplier: number;
}

/**
 * Can cause the entity to attack by sneaking and pouncing
 */
export interface BehaviorOcelotAttack {
    cooldown_time: number;
    max_distance: number;
    max_sneak_range: number;
    max_sprint_range: number;
    reach_multiplier: number;
    sneak_speed_multiplier: number;
    sprint_speed_multiplier: number;
    walk_speed_multiplier: number;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to offer a flower to a mob with {@link BehaviorTakeFlower}
 */
export interface BehaviorOfferFlower {
    chance_to_start: number;
    filters: ServerFilters|ServerFilters[];
    max_head_rotation_y: number;
    max_offer_flower_duration: number;
    max_rotation_x: number;
    search_area: [number, number, number];
}

/**
 * Can cause the entity to open doors if allowed by their navigation
 */
export interface BehaviorOpenDoor {
    close_door_after: boolean;
}

/**
 * Can cause the entity to target entities that hurt their owner
 */
export interface BehaviorOwnerHurtByTarget {
    entity_types: EntityType[];
}

/**
 * Can cause the entity to target entities that is hurt by their owner
 */
export interface BehaviorOwnerHurtTarget {
    entity_types: EntityType[];
}

/**
 * Can cause the entity to enter a panic state, running form the damage source that made it enter the state
 */
export interface BehaviorPanic {
    damage_sources: MobEffect[];
    force: boolean;
    ignore_mob_damage: boolean;
    prefer_water: boolean;
    speed_multiplier: number;
}

/**
 * Can cause the entity as a pet to sleep in the bed with the owner
 */
export interface BehaviorPetSleepWithOwner {
    goal_radius: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to pick up items on the ground
 */
export interface BehaviorPickupItems {
    can_pickup_any_item: boolean;
    can_pickup_to_hand_or_equipment: boolean;
    excluded_items: string[];
    goal_radius: number;
    max_dist: number;
    pickup_based_on_chance: boolean;
    speed_multiplier: number;
    track_target: boolean;
}

/**
 * Can cause the entity to play with other entities by chasing them and moving randomly
 */
export interface BehaviorPlay {
    chance_to_start: number;
    follow_distance: number;
    friend_search_area: [number, number, number];
    friend_types: string[];
    max_play_duration_seconds: number;
    random_pos_search_height: number;
}

/**
 * Can cause the entity to pretend to be dead to avoid being attacked
 */
export interface BehaviorPlayDead {
    apply_regeneration: boolean;
    damage_sources: DamageType[];
    duration: number;
    filters: ServerFilters|ServerFilters[];
    force_below_health: number;
    random_damage_range: [number, number];
    random_start_chance: number;
}

/**
 * Can cause the entity to be ridden by the player after being tamed
 */
export interface BehaviorPlayerRideTamed {}

/**
 * Can cause the entity to raid crops out of farms while hungry
 */
export interface BehaviorRaidGarden {
    blocks: string[];
    eat_delay: number;
    full_delay: number;
    goal_radius: number;
    initial_eat_delay: number;
    max_to_eat: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to attack by ramming
 */
export interface BehaviorRamAttack {
    baby_knockback_modifier: number;
    cooldown_range: [number, number];
    knockback_force: number;
    knockback_height: number;
    min_ram_distance: number;
    on_start: Trigger;
    pre_ram_sound: string;
    ram_distance: number;
    ram_impact_sound: string;
    ram_speed: number;
    run_speed: number;
}

/**
 * Can cause the entity to randomly breach the surface of water
 */
export interface BehaviorRandomBreach {
    cooldown_time: number;
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
}

/**
 * Can cause the entity to randomly fly around
 */
export interface BehaviorRandomFly {
    can_land_on_trees: boolean;
    cooldown_time: number;
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
}

/**
 * Can cause the entity to randomly hover around
 */
export interface BehaviorRandomHover {
    can_land_on_trees: boolean;
    cooldown_time: number;
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
}

/**
 * Can cause the entity to randomly hover around
 */
export interface BehaviorRandomBreach {
    cooldown_time: number;
    hover_height: [number, number];
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
    y_offset: number;
}

/**
 * Can cause the entity to randomly look around
 */
export interface BehaviorRandomLookAround {
    look_time: [number, number];
    max_angle_of_view_horizontal: number;
    max_angle_of_view_vertical: number;
}

/**
 * Can cause the entity to randomly sit and look around
 */
export interface BehaviorRandomLookAroundAndSit {
    continue_if_leashed: boolean;
    continue_sitting_on_reload: boolean;
    max_angle_of_view_horizontal: number;
    max_look_count: number;
    max_look_time: number;
    min_angle_of_view_horizontal: number;
    min_look_count: number;
    min_look_time: number;
    probability: number;
    random_look_around_cooldown: number;
}

/**
 * Can cause the entity to randomly move to a block and dig up an item
 */
export interface BehaviorRandomSearchAndDig {
    cooldown_range: [number, number];
    digging_duration_range: [number, number];
    find_valid_position_retries: number;
    goal_radius: number;
    item_table: string;
    on_digging_start: Trigger;
    on_fail_during_digging: Trigger;
    on_fail_during_searching: Trigger;
    on_item_found: Trigger;
    on_searching_start: Trigger;
    on_success: Trigger;
    search_range_xz: number;
    search_range_y: number;
    spawn_item_after_seconds: number;
    spawn_item_pos_offset: number;
    speed_multiplier: number;
    target_blocks: string[];
    target_dig_position_offset: number;
}

/**
 * Can cause the entity to randomly sit for a duration
 */
export interface BehaviorRandomSitting {
    cooldown_time: number;
    min_sit_time: number;
    start_chance: number;
    stop_chance: number;
}

/**
 * Can cause the entity to randomly stroll around
 */
export interface BehaviorRandomStroll {
    cooldown_time: number;
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
}

/**
 * Can cause the entity to randomly swim through water
 */
export interface BehaviorRandomSwim {
    cooldown_time: number;
    interval: number;
    speed_multiplier: number;
    xz_dist: number;
    y_dist: number;
}

/**
 * Can cause the entity to attack using ranged shots
 */
export interface BehaviorRangedAttack {
    attack_interval: number;
    attack_interval_max: number;
    attack_interval_min: number;
    attack_radius: number;
    attack_radius_min: number;
    burst_interval: number;
    burst_shots: number;
    charge_charged_trigger: number;
    charge_shoot_trigger: number;
    ranged_fov: number;
    set_persistent: boolean;
    speed_multiplier: number;
    swing: boolean;
    target_in_sight_time: number;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to stop and mate with another entity. Can only be used by `minecraft:villager`
 */
export interface BehaviorReceiveLove {}

/**
 * Can cause the entity to stay indoors during night time
 */
export interface BehaviorRestrictOpenDoor {}

/**
 * Can cause the entity to avoid the direct sunlight
 */
export interface BehaviorRestrictSun {}

/**
 * Can cause the entity to stay at a certain level in liquid
 */
export interface BehaviorRiseToLiquidLevel {
    liquid_y_offset: number;
    rise_delta: number;
    sink_delta: number;
}

/**
 * Can cause the entity to roar based on {@link AngerLevel}
 */
export interface BehaviorRoar {
    duration: number;
}

/**
 * Can cause the entity to roll forward
 */
export interface BehaviorRoll {
    probability: number;
}

/**
 * Can cause the entity to run around aimlessly
 */
export interface BehaviorRunAroundLikeCrazy {
    speed_multiplier: number;
}

/**
 * Can cause the entity to become scared when the weather is thundering
 */
export interface BehaviorScared {
    sound_interval: number;
}

/**
 * Can cause the entity to send an event to another mob
 */
export interface BehaviorSendEvent {
    cast_duration: number;
    look_at_target: boolean;
    sequence: {
        base_delay: number;
        event: string;
        sound_event: string;
    }[];
}

/**
 * Can cause the entity to give its items to others
 */
export interface BehaviorShareItems {
    entity_types: EntityType[];
    goal_radius: number;
    max_dist: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to merge into stone. Can only be used by `minecraft:silverfish`
 */
export interface BehaviorSilverfishMergeWithStone {}

/**
 * Can cause the entity to alert nearby entities in blocks. Can only be used by `minecraft:silverfish`
 */
export interface BehaviorSilverfishWakeUpFriends {}

/**
 * Can cause the entity to be horse traps
 */
export interface BehaviorSkeletonHorseTrap {
    duration: number;
    within_radius: number;
}

/**
 * Can cause the entity to move to and sleep in its village bed
 */
export interface BehaviorSleep {
    can_sleep_while_riding: boolean;
    cooldown_time: number;
    sleep_collider_height: number;
    sleep_collider_width: number;
    sleep_y_offset: number;
    speed_multiplier: number;
    timeout_cooldown: number;
}

/**
 * Can cause the entity to perfom a slime attack
 */
export interface BehaviorSlimeAttack {
    set_persistent: boolean;
    speed_multiplier: number;
    x_max_rotation: number;
    y_max_rotation: number;
}

/**
 * Can cause the entity to float in water or lava. Can only be used by `minecraft:slime`
 */
export interface BehaviorSlimeFloat {
    jump_chance_percentage: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to jump around. Can only be used by `minecraft:slime`
 */
export interface BehaviorSlimeKeepOnJumping {
    speed_multiplier: number;
}

/**
 * Can cause the entity to move in random directions. Can only be used by `minecraft:slime`
 */
export interface BehaviorSlimeRandomDirection {
    add_random_time_range: number;
    min_change_direction_time: number;
    turn_range: number;
}

/**
 * Can cause the entity to take a load off and snack on food that it fond nearby
 */
export interface BehaviorSnacking {
    items: string[];
    snacking_cooldown: number;
    snacking_cooldown_min: number;
    snacking_stop_chance: number;
}

/**
 * Can cause the entity to stop and sneeze
 */
export interface BehaviorSneeze {
    cooldown_time: number;
    drop_item_chance: number;
    entity_types: EntityType[];
    loot_table: string;
    prepare_sound: string;
    prepare_time: number;
    probability: number;
    sound: string;
    within_radius: number;
}

/**
 * Can cause the entity to sniff around
 */
export interface BehaviorSniff {
    cooldown_range: [number, number];
    duration: number;
    sniffing_radius: number;
    suspicion_radius_horizontal: number;
    suspicion_radius_vertical: number;
}

/**
 * Can cause the entity to perform a sonic boom
 */
export interface BehaviorSonicBoom {
    attack_cooldown: number;
    attack_damage: number;
    attack_range_horizontal: number;
    attack_range_vertical: number;
    attack_sound: string;
    charge_sound: string;
    duration: number;
    duration_until_attack_sound: number;
    knockback_height_cap: number;
    knockback_horizontal_strength: number;
    knockback_vertical_strength: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to dive. Can only be used by `minecraft:squid`
 */
export interface BehaviorSquidDive {}

/**
 * Allows the entity to swim away. Can only be used by `minecraft:squid`
 */
export interface BehaviorSquidFlee {}

/**
 * Can cause the entity to swim in place. Can only be used by `minecraft:squid`
 */
export interface BehaviorSquidIdle {}

/**
 * Can cause the entity to move back to water. Can only be used by `minecraft:squid`
 */
export interface BehaviorSquidMoveAwayFromGround {}

/**
 * Can cause the entity to stick to the ground outside water. Can only be used by `minecraft:squid`
 */
export interface BehaviorSquidOutOfWater {}

/**
 * Can cause the entity to stalk, then pounce on a target
 */
export interface BehaviorStalkAndPounceOnTarget {
    interest_time: number;
    leap_distance: number;
    leap_height: number;
    max_stalk_dist: number;
    pounce_max_dist: number;
    set_persistent: boolean;
    stalk_speed: number;
    strike_dist: number;
    struck_time: number;
}

/**
 * Can cause the entity to attempt to toss the items from its inventory to a recently played Noteblock
 */
export interface BehaviorStayNearNoteblock {
    listen_time: number;
    speed: number;
    start_distance: number;
    stop_distance: number;
}

/**
 * Can cause the entity to stay put while sitting
 */
export interface BehaviorStayWhileSitting {}

/**
 * Can cause the entity to attack using stop AoE damage
 */
export interface BehaviorStompAttack {
    attack_once: boolean;
    attack_types: string[];
    can_spread_on_fire: boolean;
    cooldown_time: number;
    inner_boundary_time_increase: number;
    max_dist: number;
    max_path_time: number;
    min_path_time: number;
    no_damage_range_multiplier: number;
    on_attack: Trigger;
    outer_boundary_time_increase: number;
    path_fail_time_increase: number;
    path_inner_boundary: number;
    path_outer_boundary: number;
    random_stop_interval: number;
    reach_multiplier: number;
    require_complete_path: boolean;
    set_persistent: boolean;
    speed_multiplier: number;
    stomp_range_multiplier: number;
    target_dist: number;
    track_target: boolean;
    x_max_rotation: number;
    y_max_head_rotation: number;
}

/**
 * Can cause the entity to stomp turtle eggs
 */
export interface BehaviorStompTurtleEgg {
    goal_radius: number;
    interval: number;
    search_height: number;
    search_range: number;
    speed_multiplier: number;
}

/**
 * Can cause the entity to move to a random location within a village
 */
export interface BehaviorStrollTowardsVillage {
    cooldown_time: number;
    goal_radius: number;
    search_range: number;
    speed_multiplier: number;
    start_chance: number;
}

/**
 * Can cause the entity to summon other entities
 */
export interface BehaviorSummonEntity {
    summon_choices: {
        cast_duration: number;
        cooldown_time: number;
        co_casting: boolean;
        filters: ServerFilters|ServerFilters[];
        max_activation_range: number;
        min_activation_range: number;
        particle_color: number;
        sequence: {
            base_delay: number;
            delay_per_summon: number;
            entity_lifespan: number;
            entity_type: string;
            num_entities_spawned: number;
            shape: "circle"|"line";
            size: number;
            sound_event: string;
            summon_cap: number;
            summon_cap_radius: number;
            summon_event: string;
            target: EventTarget;
        }[];
        start_sound_event: string;
        weight: number;
    }[];
}

/**
 * Can cause the entity to swell when a player is nearby. Can only be used by `minecraft:creeper`
 */
export interface BehaviorSwell {
    start_distance: number;
    stop_distance: number;
}

/**
 * Can cause the entity to go idle while swimming
 */
export interface BehaviorSwimIdle {
    idle: number;
    success_rate: number;
}

/**
 * Can cause the entity to move to the surface when out of breath. Requires {@link Breathable}
 */
export interface BehaviorSwimUpForBreath {
    material_type: "any"|"water"|"lava";
    search_height: number;
    search_radius: number;
    speed_mod: number;
}

/**
 * Can cause the entity to wander while swimming
 */
export interface BehaviorSwimWander {
    interval: number;
    look_ahead: number;
    speed_multiplier: number;
    wander_time: number;
}

/**
 * Can cause the entity to follow another swimming entity
 */
export interface BehaviorSwimWithEntity {
    catch_up_multiplier: number;
    catch_up_threshold: number;
    chance_to_stop: number;
    entity_types: EntityType[];
    match_direction_threshold: number;
    search_range: number;
    speed_multiplier: number;
    state_check_interval: number;
    stop_distance: number;
    success_rate: number;
}

/**
 * Can cause the entity to perform a swoop attack
 */
export interface BehaviorSwoopAttack {
    damage_reach: number;
    delay_range: [number, number];
    speed_multiplier: number;
}

/**
 * Can cause the entity to accept flowers from another mob with the {@link BehaviorOfferFlower}
 */
export interface BehaviorTakeFlower {
    filters: ServerFilters|ServerFilters[];
    max_head_rotation_y: number;
    max_rotation_x: number;
    max_wait_time: number;
    min_distance_to_target: number;
    min_wait_time: number;
    search_area: [number, number, number];
    speed_multiplier: number;
}

/**
 * Can cause the entity to teleport to its owner
 */
export interface BehaviorTeleportToOwner {
    cooldown: number;
    filters: ServerFilters|ServerFilters[];
}

/**
 * Can cause the entity to be tempted by certain items
 */
export interface BehaviorTempt {
    can_get_scared: boolean;
    can_tempt_vertically: boolean;
    can_tempt_while_ridden: boolean;
    items: string[];
    sound_interval: [number, number];
    speed_multiplier: number;
    tempt_sound: string;
    within_radius: number;
}

/**
 * Timer based event
 */
export interface SharedBehaviorTimer {
    cooldown_range: [number, number];
    duration_range: [number, number];
    on_end: Trigger;
    on_start: Trigger;
}

export interface BehaviorTimerFlag1 extends SharedBehaviorTimer {}

export interface BehaviorTimerFlag2 extends SharedBehaviorTimer {}

export interface BehaviorTimerFlag3 extends SharedBehaviorTimer {}

/**
 * Can cause the entity to look at a player holding a tradeable item
 */
export interface BehaviorTradeInterest {
    carried_item_switch_time: number;
    cooldown: number;
    interest_time: number;
    remove_item_time: number;
    within_radius: number;
}

/**
 * Can cause the entity to trade with a player
 */
export interface BehaviorTradeWithPlayer {
    filters: ServerFilters|ServerFilters[];
    max_distance_from_player: number;
}

/**
 * Can cause the entity to target the same entity its owner is targeting
 */
export interface BehaviorVexCopyOwnerTarget {
    entity_types: EntityType[];
}

/**
 * Can cause the entity to move around randomly like a Vex
 */
export interface BehaviorVexRandomMove {}

/**
 * Can cause the entity to launch random attacks. Only used by `minecraft:wither`
 */
export interface BehaviorWitherRandomAttackPosGoal {}

/**
 * Can cause the entity to focus its attack on the entity that's done the most damage to it. Only used by `minecraft:wither`
 */
export interface BehaviorWitherTargetHighestDamage {
    entity_types: EntityType[];
}

/**
 * Can cause the entity to work at a POI
 */
export interface BehaviorWork {
    active_time: number;
    can_work_in_rain: boolean;
    goal_cooldown: number;
    on_arrival: Trigger;
    sound_delay_max: number;
    sound_delay_min: number;
    speed_multiplier: number;
    work_in_rain_tolerance: number;
}

/**
 * Can cause the entity use a Composter POI to convert seeds into bone meal
 */
export interface BehaviorWorkComposter {
    active_time: number;
    block_interaction_max: number;
    can_empty_composter: boolean;
    can_fill_composter: boolean;
    can_work_in_rain: boolean;
    goal_cooldown: number;
    items_per_use_max: number;
    min_item_count: number;
    on_arrival: Trigger;
    speed_multiplier: number;
    use_block_max: number;
    use_block_min: number;
    work_in_rain_tolerance: number;
}

// #endregion

// #region Components

/**
 * Adds a rider to the entity. Requires `minecraft:rideable`
 */
export interface AddRider {
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
export interface AdmireItem {
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
export interface Ageable {
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

/**
 * Allows this entity to track anger towards a set of nuisances
 */
export interface AngerLevel {
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
export interface Angry {
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
export interface AnnotationBreakDoor {
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
export interface AnnotationOpenDoor {}

/**
 * Allows the entity to deal damage to other entities within range
 */
export interface AreaAttack {
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
 * Adds an attack cooldown to a mob to prevent it from attempting to aquire new targets
 */
export interface AttackCooldown {
    attack_cooldown_complete_event: string;
    attack_cooldown_time: [number, number];
}

/**
 * Enables the entity to drop an item as a barter exchange
 */
export interface Barter {
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
export interface BlockClimber {}

/**
 * Fires an event when a block is broken in range
 */
export interface BlockSensor {
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
export interface Boostable {
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
export interface Boss {
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
export interface BreakBlocks {
    /**
     * A list of the blocks that can be broken when the entity moves
     */
    breakable_blocks: string[];
}

/**
 * Defines what blocks the entity can breathe in and gives them the ability to suffocate
 */
export interface Breathable {
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
export interface Breedable {
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
export interface Bribeable {
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
export interface Buoyant {
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
export interface BurnsInDaylight {}

/**
 * Determines if this entity can join an existing raid
 */
export interface CanJoinRaid {}

/**
 * Specifies hunt celebration behavior
 */
export interface CelebrateHunt {
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
export interface CollisionBox {
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
export interface CombatRegeneration {
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
export interface ConditionalBandwidthOptimization {
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
export interface CustomHitTest {
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
export interface DamageOverTime {
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
export interface DamageSensor {
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
        on_damage: Trigger;
        /**
         * Defines what sound to playe when the `on_damage` filters are met
         */
        on_damage_sound_event: string;
    }[];
}

/**
 * Ability for a rideable entity to dash
 */
export interface Dash {
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
export interface Despawn {
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
export interface DimensionBound {}

/**
 * Adds a timer for drying out that will count down and fire `dried_out_event`, or stop counting down and fire `stopped_drying_out_event` if in rain or water
 */
export interface DryingOutTimer {
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
 * Defines the entity's dwelling
 */
export interface Dweller {
    dwelling_type: "village";
    dweller_role: "hostile"|"inhabitant"|"defender"
    update_interval_base: number;
    update_interval_variant: number;
    can_find_poi: boolean;
    can_migrate: boolean;
    first_founding_reward: number;
}

/**
 * Defines the entity's ability to trade with players
 */
export interface EconomyTradeTable {
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
export interface EntityArmorEquipmentSlotMapping {
    armor_slot: string;
}

/**
 * Defines events fired when a set of conditions are met by entities within range
 */
export interface EntitySensor {
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
export interface EnvironmentSensor {
    /**
     * A list of triggers that fire when the conditions match the given filter criteria
     */
    triggers: Trigger[];
}

/**
 * Defines the items the entity can equip
 */
export interface EquipItem {
    /**
     * List of items the entity should not equip
     */
    excluded_items: string[];
}

/**
 * Defines how the entity equips items
 */
export interface Equippable {
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
export interface ExhaustionValues {
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
export interface ExperienceReward {
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
export interface Explode {
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
export interface Flocking {
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
export interface GameEventMovementTracking {
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
export interface Genetics {
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
export interface Giveable {
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
export interface GroupSize {
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
export interface GrowsCrop {
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
export interface Healable {
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
export interface Heartbeat {
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
export interface Home {
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
export interface HurtOnCondition {
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
export interface InsideBlockNotifier {
    /**
     * List of blocks monitored to see if the entity is inside
     */
    block_list: string[];
}

/**
 * Adds a timer since last rested to see if phantoms should spawn
 */
export interface Insomnia {
    /**
     * Number of days the mob has to stay up for the insomnia effect to begin
     * @default 3.0
     */
    days_until_insomnia: number;
}

/**
 * Despawns the entity immediately
 */
export interface InstantDespawn {
    /**
     * If true, linked entities (i.e. leashed) will also be despawned
     * @default false
     */
    remove_child_entities: boolean;
}

/**
 * Defines interactions with this entity
 */
export interface Interact {
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
export interface Inventory {
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

/**
 * Defines that this entity is an item hopper
 */
export interface ItemHopper {}

/**
 * Defines a dynamic jump type based on the entity's movement speed
 */
export interface JumpDynamic {}

/**
 * Defines the entity's ability to jump
 */
export interface JumpStatic {
    /**
     * The initial vertical velocity for the jump
     * @default 0.42
     */
    jump_power: number;
}

/**
 * Defines this entity's leashing properties
 */
export interface Leashable {
    /**
     * If true, players can leash this entity even if already leashed to another mob
     * @default false
     */
    can_be_stolen: boolean;
    /**
     * Distance in blocks at which the leash stiffens, restricting movement
     * @default 6
     */
    hard_distance: number;
    /**
     * Distance in blocks at which the leash breaks
     * @default 10
     */
    max_distance: number;
    /**
     * Event to fire when the entity is leashed
     */
    on_leash: string;
    /**
     * Event to fire when the entity is unleashed
     */
    on_unleash: string;
    /**
     * Distance in blocks at which the `spring` effect starts acting to keep this entity close to the entity it is leashed to
     * @default 4
     */
    soft_distance: number;
}

/**
 * Defines the behavior when the entity is looked at
 */
export interface LookedAt {
    /**
     * The FOV in degrees that the entity can be looked at
     * @default 26
     */
    field_of_view: number;
    /**
     * The list of filters that must be satisfied for the entity to be looked at
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Limits the search to only the nearest player that meets the `filters` rather than all nearby entities
     * @default false
     */
    find_players_only: boolean;
    /**
     * Defines the type of block shape used to check for line of sight obstructions
     * TODO: Find out what these are
     * @default "collision"
     */
    line_of_sight_obstruction_type: "outline"|"collision"|"collision_for_camera";
    /**
     * A list of locations at which the line of sight checks are made. At least one location must be unobstructed for the entity to be considered looked at
     */
    look_at_locations: string[];
    /**
     * Specifies the range fo the random number of seconds between checks
     * @default [0,0]
     */
    looked_at_cooldown: [number, number];
    /**
     * The event to fire when the entity is looked at
     */
    looked_at_event: string;
    /**
     * Defines the minimum continuous an entity must be looking at this entity to be considered looked at
     * @default 0
     */
    min_looked_at_duration: number;
    /**
     * Defines the event to trigger when the entity is not being looked at
     * TODO: find out if this fires every frame or just once
     */
    not_looked_at_event: string;
    /**
     * If true, the FOV narrows as the looking entity gets closer to this entity
     * @default true
     */
    scale_fov_by_distance: boolean;
    /**
     * Maximum distance this entity will look for looking entities
     * @default 10
     */
    search_radius: number;
    /**
     * Defines if and how the owner entity will set entities that are looking at it as its combat targets
     * - `never` - Looking entities are never set as targets, but events are fired
     * - `once_and_stop_scanning` - The first entity that looks at this entity is set as the target and scanning stops
     * - `once_and_keep_scanning` - The first entity that looks at this entity is set as the target and scanning continues
     */
    set_target: "never"|"once_and_stop_scanning"|"once_and_keep_scanning";
}

/**
 * Defines that the entity should use wandering trader behavior
 */
export interface ManagedWanderingTrader {}

/**
 * Defines how mob effects might be applied to nearby entities
 */
export interface MobEffect {
    /**
     * Time in seconds between effect applications
     * @default 0.0
     */
    cooldown_time: number;
    /**
     * How close an entity must be to have the effect applied
     * @default 0.2
     */
    effect_range: number;
    /**
     * How long the applied mob effect lasts in seconds
     * @default 10
     */
    effect_time: number;
    /**
     * Filters to determine which entities are affected by the mob effect
     */
    entity_filter: ServerFilters|ServerFilters[];
    /**
     * The effect to apply
     */
    mob_effect: MobEffects;
}

/**
 * Defines the entity's mob effect immunities
 */
export interface MobEffectImmunity {
    /**
     * List of mob effects that the entity is immune to
     */
    mob_effects: MobEffects[];
}

export interface SharedMovement {
    /**
     * The maximum number in degrees the entity can turn per tick
     * @default 30.0
     */
    max_turn: number;
}

/**
 * Allows the entity to swim in water and on land
 */
export interface MovementAmphibious extends SharedMovement {}

/**
 * Accentsthe movement of an entity
 */
export interface MovementBasic extends SharedMovement {}

/**
 * Allows the entity to fly
 */
export interface MovementFly extends SharedMovement {}

/**
 * Allows the entity to fly, swim, climb, etc.
 */
export interface MovementGeneric extends SharedMovement {}

/**
 * Allows the entity to hover
 */
export interface MovementHover extends SharedMovement {}

/**
 * Allows the entity to hop as it moves (i.e. Slimes)
 */
export interface MovementJump extends SharedMovement {}

/**
 * UNDOCUMENTED
 */
export interface MovementSkip extends SharedMovement {}

/**
 * Allows the entity to sway side to side giving the impression of swimming
 */
export interface MovementSway extends SharedMovement {}

/**
 * Allows the entity to be named
 */
export interface Nameable {
    /**
     * If true, the entity can be renamed with a name tag
     * @default true
     */
    allow_name_tag_renaming: boolean;
    /**
     * If true, the name will always be shown
     * @default false
     */
    always_show: boolean;
    /**
     * Event to fire when the entity is named
     */
    default_trigger: string;
    /**
     * Defines special names for this entity and the events to fire when named these
     */
    name_actions: {
        /**
         * List of special names to fire the `on_named` event
         */
        name_filter: string[];
        /**
         * Event to fire when the entity is named one of the names in `name_filter`
         */
        on_named: string;
    }
}

export interface SharedNavigation {
    /**
     * Tells the pathfinder to avoid blocks that cause damage
     * @default false
     */
    avoid_damage_blocks: boolean;
    /**
     * Tells the pathfinder to avoid portals
     * @default false
     */
    avoid_portals: boolean;
    /**
     * Tells the pahtfinder to avoid tiles exposed to the sun
     * @default false
     */
    avoid_sun: boolean;
    /**
     * Tells the pathfinder to avoid water
     * @default false
     */
    avoid_water: boolean;
    /**
     * Tells the pathfinder to avoid these blocks
     */
    blocks_to_avoid: string[];
    /**
     * Tells the pathfinder it can jump out of water
     * @default false
     */
    can_breach: boolean;
    /**
     * Tells the pathfinder it can break doors and pass through them
     * @default false
     */
    can_break_doors: boolean;
    /**
     * Tells the pathfinder it can jump up on blocks
     * @default true
     */
    can_jump: boolean;
    /**
     * Tells the pathfinder it can path through a closed door
     * @default false
     */
    can_open_doors: boolean;
    /**
     * Tells the pathfinder it can path through a closed iron door
     * @default false
     */
    can_open_iron_doors: boolean;
    /**
     * Tells the pathfinder it can path through open doors
     * @default true
     */
    can_pass_doors: boolean;
    /**
     * Tells the pathfinder it can pathfind from the air
     * @default false
     */
    can_path_from_air: boolean;
    /**
     * Tells the pathfinder it can path over the surface of lava
     * @default false
     */
    can_path_over_lava: boolean;
    /**
     * Tells the pathfinder it can path of the surface of water
     * @default false
     */
    can_path_over_water: boolean;
    /**
     * Tells the pathfinder it will be pulled down by gravity while in water
     * @default true
     */
    can_sink: boolean;
    /**
     * Tells the pathfinder it can path from anywhere through water
     * @default false
     */
    can_swim: boolean;
    /**
     * Tells the pathfinder it can walk on the ground outside of water
     * @default true
     */
    can_walk: boolean;
    /**
     * Tells the pathfinder it can travel in lava like walking on the ground
     * @default false
     */
    can_walk_in_lava: boolean;
    /**
     * Tells the pathfinder it can walk on the ground underwater
     * @default false
     */
    is_amphibious: boolean;
}

/**
 * Allows this entity to generate paths that include vertical walls like a Spider
 */
export interface NavigationClimb extends SharedNavigation {}

/**
 * Allows this entity to generate paths while floating through the air like a Ghast
 */
export interface NavigationFloat extends SharedNavigation {}

/**
 * Allows this entity to generate paths while floating through the air like a Parrot
 */
export interface NavigationFly extends SharedNavigation {}

/**
 * Allows this entity to generate paths by walking, swimming, flying, climbing, and jumping
 */
export interface NavigationGeneric extends SharedNavigation {}

/**
 * Allows this entity to generate paths while in the air like a Bee
 */
export interface NavigationHover extends SharedNavigation {}

/**
 * Allows this entity to generate paths in water
 */
export interface NavigationSwim extends SharedNavigation {}

/**
 * Allows this entity to generate paths by walking around
 */
export interface NavigationWalk extends SharedNavigation {}

/**
 * Allows the entity to be interacted with as an NPC with a dialogue window
 */
export interface NPC {
    npc_data: {
        portait_offsets: {
            translate: [number, number, number];
            scale: [number, number, number];
        };
        picker_offsets: {
            translate: [number, number, number];
            scale: [number, number, number];
        };
        skin_list: {
            variant: number;
        }[];
    };
}

/**
 * Defines the entity's "out of control" state
 */
export interface OutOfControl {}

/**
 * Defines the entity's peek behavior
 */
export interface Peek {
    /**
     * Event to call when the entity is done peeking
     */
    on_close: string;
    /**
     * Event to call when the entity starts peeking
     */
    on_open: string;
    /**
     * Event to call when the entity's target entity starts peeking
     */
    on_target_open: string;
}

/**
 * Defines that an entity should be persistent in the game world
 */
export interface Persistent {}

/**
 * Defines physics properties of an entity
 */
export interface Physics {
    /**
     * If true, the entity will collide with things
     * @default true
     */
    has_collision: boolean;
    /**
     * If true, the entity will be affected by gravity
     * @default true
     */
    has_gravity: boolean;
    /**
     * If true, the entity should be pushed towards the nearest open area when stuck inside a block
     * @default false
     */
    push_towards_closest_space: boolean;
}

/**
 * Defines the cost information for the entity to walk on preferred blocks
 */
export interface PreferredPath {
    /**
     * The cost of non-preferred blocks
     * @default 0
     */
    default_block_cost: number;
    /**
     * Addec cost for jumping up a node
     * @default 0
     */
    jump_cost: number;
    /**
     * Distance mob can fall without taking damage
     * @default 3
     */
    max_fall_blocks: number;
    /**
     * A list of blocks with their associated cost
     */
    preferred_path_blocks: {
        /**
         * The pathfinding cost of these blocks
         */
        cost: number;
        /**
         * The list of blocks to apply the cost to
         */
        blocks: string[];
    };
}

/**
 * Defines the entity as a fireable projectile
 */
export interface Projectile {
    /**
     * Determines the angel at which the projectile is fired
     * @default 0
     */
    angle_offset: number;
    /**
     * If true, the hit entity will be set on fire
     * @default false
     */
    catch_fire: boolean;
    /**
     * If true, the projectile will produce addditional particles when a critical hit happens
     * @default false
     */
    crit_particle_on_hurt: boolean;
    /**
     * If true, this entity will be destroyed if hurt
     * @default false
     */
    destroy_on_hurt: boolean;
    /**
     * The entity defined here can't be hurt by the projectile
     */
    filter: string;
    /**
     * If true, the projectile's ability to cause fire is dictated by the mob griefing game rule
     * @default false
     */
    fire_affect_by_griefing: boolean;
    /**
     * The gravity applied to the entity when fired, higher values make the entity fall faster
     * @default 0.05
     */
    gravity: number;
    /**
     * If true, when hitting a vehicle with at least one passanger, the damage will be applied to the nearest passanger
     * @default false
     */
    hit_nearest_passenger: boolean;
    /**
     * The sound that plays when the projectile hits something
     */
    hit_sound: string;
    /**
     * If true, the projectile homes in
     * @default false
     */
    homing: boolean;
    /**
     * An array of entities that the projectile will ignore
     */
    ignored_entities: string[];
    /**
     * The fraction of the projectile's speed maintained every frame in air
     * @default 0.99
     */
    inertia: number;
    /**
     * If true, the projectile will be treated as dangerous to players
     * @default false
     */
    is_dangerous: boolean;
    /**
     * If true, the projectile will knock back the entity it hits
     * @default true
     */
    knockback: boolean;
    /**
     * If true, hit entities will be struck by lightning
     * @default false
     */
    lightning: boolean;
    /**
     * The fraction of the projectile's speed maintained every frame in liquid
     * @default 0.6
     */
    liquid_inertia: number;
    /**
     * If true, the projectile can hit multiple entities per flight
     * @default true
     */
    multiple_targets: boolean;
    /**
     * The offset from the entity's anchor where the projectile will spawn
     * @default [0,0,0]
     */
    offset: [number, number, number];
    /**
     * Time in seconds that the entity hit will be on fire for
     * @default 5.0
     */
    on_fire_time: number;
    /**
     * Particle to use on collision
     * @default "iconcrack"
     */
    particle: string;
    /**
     * Defines the effect the projectile will apply to the hit entity
     * @default -1
     */
    potion_effect: number;
    /**
     * Determines the velocity of the projectile
     * @default 1.3
     */
    power: number;
    /**
     * During the specified time, in seconds, the projectile cannot be reflected by being hit
     * @default 0
     */
    reflect_immunity: number;
    /**
     * If true, the entity will be reflected back when hit
     * @default false
     */
    reflect_on_hurt: boolean;
    /**
     * If true, damage will be randomized based on damage and speed
     * @default false
     */
    semi_random_diff_damaage: boolean;
    /**
     * The sound that plays when the projectile is shot
     */
    shoot_sound: string;
    /**
     * If true, the projectile will be shot toward the target of the entity firing it
     * @default true
     */
    shoot_target: boolean;
    /**
     * If true, the projectile will bounce on hit
     * @default false
     */
    should_bounce: boolean;
    /**
     * If true, the projectile will be treated like a splash potion
     * @default false
     */
    splash_potion: boolean;
    /**
     * Radius in blocks of the "splash" effect
     * @default 4
     */
    splash_range: number;
    /**
     * The base accuracy. Accuracy is determined by the formula `uncertaintyBase` - `difficultyLevel` * `uncertaintyMultiplier`
     * @default 0
     */
    uncertainty_base: number;
    /**
     * Determines how much difficulty affects accuracy. Accuracy is determined by the formula `uncertaintyBase` - `difficultyLevel` * `uncertaintyMultiplier`
     * @default 0
     */
    uncertainty_multiplier: number;
}

/**
 * Defines the entity's ability to be pushed
 */
export interface Pushable {
    /**
     * If true, this entity can be pushed by other entities
     * @default true
     */
    is_pushable: boolean;
    /**
     * If true, this entity can be pushed by pistons
     * @default true
     */
    is_pushable_by_piston: boolean;
}

/**
 * Attempts to trigger a raid at the entity's location
 */
export interface RaidTrigger {
    /**
     * Event to fire when a raid is triggered on a village
     */
    triggered_event: string;
}

/**
 * Defines the entity's moveent on rails. An entity with this component is **only** allowed to move on rails
 */
export interface RailMovement {
    /**
     * Maximum speed this entity will move when on rails
     * @default 0.4
     */
    max_speed: number;
}

/**
 * TODO: Find out what this component is for, assuming something to do with minecarts and sensor rails
 */
export interface RailSensor {
    /**
     * If true, this entity will trigger its `on_deactivate` behavior
     * @default false
     */
    check_block_types: boolean;
    /**
     * If true, this entity will eject all of its riders when it passes over an active Activator Rail
     * @default true
     */
    eject_on_activate: boolean;
    /**
     * If true, this entity will eject all of its riders when it passes over a deactive Activator Rail
     * @default false
     */
    eject_on_deactivate: boolean;
    /**
     * Event to fire when the rail is activated
     */
    on_activate: string;
    /**
     * Event to fire when the rail is deactivated
     */
    on_deactivate: string;
    /**
     * If true, command blocks will start ticking when passing over an activated rail
     * @default true
     */
    tick_command_block_on_activate: boolean;
    /**
     * If true, command blocks will stop ticking when passing over a deactivated rail
     * TODO: verify this description is correct
     * @default false
     */
    tick_command_block_on_deactivate: boolean;
}

/**
 * Defines the Ravager's response to their melee attack being blocked
 */
export interface RavagerBlocked {
    /**
     * The strength with which blocking entities should be knocked back
     * @default 3.0
     */
    knockback_strength: number;
    /**
     * A list of weighted responses to the block
     */
    reaction_choices: {
        weight: number;
        value: Trigger;
    }[];
}

/**
 * [EXPERIMENTAL] Allows an entity to reflect projectiles
 */
export interface ReflectProjectiles {
    /**
     * [EXPERIMENTAL] A Molang expression defining the angle in degreees to add to the projectile's y axis rotation
     * @default "0"
     */
    azimuth_angle: Molang;
    /**
     * [EXPERIMENTAL] A Molang expression defining the angle in degrees to add to the projectile's x axis rotation
     * @default "0"
     */
    elevation_angle: Molang;
    /**
     * [EXPERIMENTAL] The list of projectiles that can be reflected
     */
    reflected_projectiles: string[];
    /**
     * [EXPERIMENTAL] A Molang expression defining the velocity of the reflected projectiles. Values below 1.0 will slow the projectile down and values above 1.0 will speed it up
     * @default "1.0"
     */
    reflection_scale: Molang;
    /**
     * [EXPERIMENTAL] The sound event to be played when the projectile is reflected
     * @default "reflect"
     */
    reflection_sound: string;
}

/**
 * Defines the entity's ability to be ridden
 */
export interface Rideable {
    /**
     * The seat index designating the driver
     * @default 0
     */
    controlling_seat: number;
    /**
     * If true, this entity can't be interacted with if the interactor is crouching
     * @default true
     */
    crouching_skip_interact: boolean;
    /**
     * List of entity family types that can ride this entity
     */
    family_types: string[];
    /**
     * Text to display when the player can interact with the ntity when playing with Touch controls
     */
    interact_text: string;
    /**
     * The max width a mob can be to be a passenger. A value of 0 ignores this parameter
     * @default 0
     */
    passenger_max_width: number;
    /**
     * @deprecated
     */
    priority: number;
    /**
     * If true, the entity will pull in entities that are of the correct `family_type` into an available seat
     * @default false
     */
    pull_in_entities: boolean;
    /**
     * If true, the rider can still interact with this entity
     * @default false
     */
    rider_can_interact: boolean;
    /**
     * The number of riders that can ride this entity simultaneously
     * @default 1
     */
    seat_count: number;
    /**
     * Defines data for individual seats
     */
    seats: {
        /**
         * Angle in degrees that a rider is allowed to rotate while riding this entity
         * @default 181
         */
        lock_rider_rotation: number;
        /**
         * Defines the maximum number of riders that can be riding this entity for this seat to be valid
         * @default index
         */
        max_rider_count: number;
        /**
         * Defines the minimum number of riders that must be riding this entity for this seat to be valid
         * @default 0
         */
        min_rider_count: number;
        /**
         * Position of this seat origin relative to this entity's origin
         * @default [0,0,0]
         */
        position: [number, number, number];
        /**
         * Offset to rotate riders by
         * @default "0"
         */
        rotate_rider_by: Molang;
    }[];
}

/**
 * Defines the entity's size interpolation based on the entity's age
 */
export interface ScaleByAge {
    /**
     * Ending scale of the entity when it's fully grown
     * @default 1
     */
    end_scale: number;
    /**
     * Initial scale of the newborn entity
     * @default 1
     */
    start_scale: number;
}

/**
 * Fires of events at scheduled times
 */
export interface Scheduler {
    /**
     * UNKNOWN
     */
    min_delay_secs: number;
    /**
     * UNKNOWN
     */
    max_delay_secs: number;
    /**
     * The events to fire off when the filters are met
     */
    scheduled_events: Trigger[];
}

/**
 * Defines a list of items the mob wants to share or pick up
 */
export interface Shareables {
    /**
     * If true, all items not specified in `items` will also be shareable, but with lower priority than those in `items`
     * @default false
     */
    all_items: boolean;
    /**
     * Maximum number of this item the entity will hold
     * @default -1
     */
    all_items_max_amount: number;
    /**
     * Number of this item considered "extra" that the entity wants to share
     * @default -1
     */
    all_items_surplus_amount: number;
    /**
     * Number of this item the entity wants to share
     * @default -1
     */
    all_items_want_amount: number;
    /**
     * List of items the entity wants to share
     */
    items: {
        /**
         * If true and the entity has the {@link AdmireItem} component and the Admire goal, the mob will admire the item after picking it up by looking at it
         */
        admire: boolean;
        /**
         * If true and the entity has the {@link Barter} component and the Barter goal, the entity will barter for the item after picking it up
         */
        barter: boolean;
        /**
         * If true, the entity will consume the item
         */
        consume_item: boolean;
        /**
         * Defines the item this entity wants to craft with the `item`
         */
        craft_into: string;
        /**
         * The name of the item. Aux value can be specified, for instance `minecraft:skull:1
         */
        item: string;
        /**
         * Maximum number of this item the entity will hold
         */
        max_amount: number;
        /**
         * Maximum number of this item the entity will pick up during a single goal tick
         */
        pickup_limit: number;
        /**
         * If true, the entity can only pick up the item and not drop it
         */
        pickup_only: boolean;
        /**
         * Prioritizes which items the entity prefers. 0 is the highest priority
         */
        priority: number;
        /**
         * If true and the entity has the {@link Inventory} component and the item cannot be equipped, the mob will try to put the item in its inventory
         */
        stored_in_inventory: boolean;
        /**
         * Number of this item considered "extra" that the entity wants to share
         */
        surplus_amount: number;
        /**
         * Number of this item the entity wants to have
         */
        want_amount: number;
    }[];
    /**
     * If true, the entity is able to pick up more of the same item if it is already holding that item
     * @default false
     */
    singular_pickup: boolean;
}

/**
 * Defines the entity's abiltity to shoot projectiles. Required by the {@link BehaviorRangedAttack} component
 */
export interface Shooter {
    /**
     * ID of the Potion effect for the default projectile to be applied on hit
     * @default -1
     */
    aux_val: number;
    /**
     * The entity id of the projectile to shoot, the entity must have the {@link Projectile} component
     */
    def: string;
    /**
     * If true, the projectiles are flagged as "magic" which prevents other "magic" being used at the same time, i.e. {@link BehaviorDrinkPotion}
     * @default false
     */
    magic: boolean;
    /**
     * Velocity with which the projectiles will be shot, a power of 0 will use the {@link Projectile.power} instead
     * @default 0
     */
    power: number;
    /**
     * List of projectiles that can be used by the shooter, using the first valid projectile
     * TODO: Figure out what the syntax expected here is
     */
    projectiles: string[];
    /**
     * Sound that is played when this entity shoots a projectile
     */
    sound: string;
}

/**
 * Defines the entity's "sit" state
 */
export interface Sittable {
    /**
     * Event to fire when the entity enters the "sit" state
     */
    sit_event: string;
    /**
     * Event to fire when the entity exits the "sit" state
     */
    stand_event: string;
}

/**
 * Defines the ability for the entity to spawn another entity or item on a timer
 */
export interface SpawnEntity {
    /**
     * Filters determining of the entity can perform a spawn
     */
    filters: ServerFilters|ServerFilters[];
    /**
     * Maximum amount of time to randomly wait in seconds before another entity is spawned
     * @default 600
     */
    max_wait_time: number;
    /**
     * Minimum amount of time to randomly wait in seconds before another entity is spawned
     * @default 300
     */
    min_wait_time: number;
    /**
     * The number of entities to spawn each time that this triggers
     * @default 1
     */
    num_to_spawn: number;
    /**
     * If true, spawned entities will be leashed to this entity
     * @default false
     */
    should_leash: boolean;
    /**
     * If true, this component will only ever spawn an entity once
     * @default false
     */
    single_use: boolean;
    /**
     * Identifier of the entity to spawn, leave empty to use `spawn_item` instead
     */
    spawn_entity: string;
    /**
     * Event to fire on the spawned entity
     * @default "minecraft:entity_born"
     */
    spawn_event: string;
    /**
     * Identifier of the item to spawn, leave empty to use `spawn_entity` instead
     * @default "minecraft:egg"
     */
    spawn_item: string;
    /**
     * Event to fire on this entity when it spawns an item
     */
    spawn_item_event: string;
    /**
     * Method used to spawn the entity
     * @default "born"
     */
    spawn_method: string;
    /**
     * The sound effect to play when the entity is spawned
     * @default "plop"
     */
    spawn_sound: string;
}

/**
 * Allows the entity to remember suspicious locations
 */
export interface SuspectTracking {}

/**
 * Defines the entity's ability to be tamed
 */
export interface Tameable {
    /**
     * The chance of taming the entity with each item use, 0.0 is 0% and 1.0 is 100%
     * @default 1.0
     */
    probability: number;
    /**
     * The event to fire when the entity is tamed
     */
    tame_event: string;
    /**
     * The list of items that can be used to tame the entity
     */
    tame_items: string[];
}

/**
 * Allows the entity to be tamed by mounting it
 */
export interface TameMount {
    /**
     * The amount the entity's temper will be modified by when a player attempts to tame it
     * @default 5
     */
    attempt_temper_mod: number;
    /**
     * The list of items that, if used to interact with the entity, will anger it
     */
    auto_reject_items: {
        /**
         * The rejected item name
         */
        item: string;
    }[];
    /**
     * The list of items that can be used to lower the entity's temper and speed up the taming
     */
    feed_items: {
        /**
         * The item that lowers temper
         */
        item: string;
        /**
         * The amount of temper reduced when fed this item
         * @default 0
         */
        temper_mod: number;
    }[];
    /**
     * Text to be displayed when attempting to feed the entity on touch controls
     */
    feed_text: string;
    /**
     * The maximum for the random starting temper
     * @default 100
     */
    max_temper: number;
    /**
     * The minimum for the random starting temper
     * @default 0
     */
    min_temper: number;
    /**
     * Text to be displayed when attempting to ride the entity on touch controls
     */
    ride_text: string;
    /**
     * The event to fire when the entity is tamed
     */
    tame_event: string;
}

/**
 * Defines the entity's range within which it can sense other entities to target
 */
export interface TargetNearbySensor {
    /**
     * Max distance in blocks that another entity will be considered `inside` the range
     * @default 1
     */
    inside_range: number;
    /**
     * If true, the entity will only target entities that it can see
     * @default false
     */
    must_see: boolean;
    /**
     * Event to fire when an entity is inside the range
     */
    on_inside_range: Trigger|string;
    /**
     * Event to fire when an entity is inside the range
     */
    on_outside_range: Trigger|string;
    /**
     * Event to fire when an entity exits the visual range
     */
    on_vision_lost_inside_range: Trigger|string;
    /**
     * Max distance in blocks that another entity will be considered `outside` the range
     * @default 5
     */
    outside_range: number;
}

/**
 * Defines an entity's teleporting behavior
 */
export interface Teleport {
    /**
     * The percentage chance that the entity will teleport while in darkness
     * @default 0.01
     */
    dark_teleport_chance: number;
    /**
     * The percentage chance that the entity will teleport while in daylight
     * @default 0.01
     */
    light_teleport_chance: number;
    /**
     * Max time in seconds between random teleports
     * @default 20
     */
    max_random_teleport_time: number;
    /**
     * Min time in seconds between random teleports
     * @default 0
     */
    min_random_teleport_time: number;
    /**
     * Entity will teleport to a random location within this cube
     * @default [32,16,32]
     */
    random_teleport_cube: [number, number, number];
    /**
     * If true, the entity will teleport randomly
     * @default true
     */
    random_teleports: boolean;
    /**
     * Max distance the entity will teleport when chasing a target
     * @default 16
     */
    target_distance: number;
    /**
     * The chance that the entity will teleport, 0.0 is 0% and 1.0 is 100%
     * @default 1.0
     */
    target_teleport_chance: number;
}

/**
 * Defines if the entity ticks the world around it
 */
export interface TickWorld {
    /**
     * The distance at whih the closest player has to be before this entity dispawns, ignored if `never_despawn` is true. Minimum is 128
     * @default 128
     */
    distance_to_players: number;
    /**
     * If true, the entity will not despawn even if players are far away
     * @default true
     */
    never_despawn: boolean;
    /**
     * The area around the entity to tick
     * TODO: determine if this radius in in blocks or chunks
     * @default 2
     */
    radius: 2|3|4|5|6;
}

/**
 * Defines a timer which fires an event after counting down
 */
export interface Timer {
    /**
     * If true, the timer will restart every time it fires
     * @default true
     */
    looping: boolean;
    /**
     * If true, the amount of time on the timer will be random between the min and max in `time`
     * @default true
     */
    randomInterval: boolean;
    /**
     * A list of times that will be randomly selected from
     * TODO: determine what syntax is expected here
     * @default []
     */
    random_time_choices: number[];
    /**
     * Amount of time in seconds for the timer, incompatible with `random_time_choices`
     */
    time: [number, number]|number;
    /**
     * Event to fire when the timer is done
     */
    time_down_event: string|Trigger;
}

/**
 * Defines the entity's ability to trade with players
 */
export interface TradeTable {
    /**
     * If true, the trades are converted when the entity transforms into one that has an {@link EconomyTradeTable} component
     * @default false
     */
    convert_trades_economy: boolean;
    /**
     * Name to be displayed while trading with this entity
     */
    display_name: string;
    /**
     * If true, will use the new UI trade screen
     * @default false
     */
    new_screen: boolean;
    /**
     * If true, the trades persist if the enity transforms
     * @default false
     */
    persist_trades: boolean;
    /**
     * File path relative to the behavior pack root for this entity's trades
     */
    table: string;
}

/**
 * Causes an entity to leave a trail of blocks as it moves around the world
 */
export interface Trail {
    /**
     * The type of block left by the entity as a trail. Solid blocks may not be spawned at an offset of `[0,0,0]`
     * @default "minecraft:air"
     */
    block_type: string;
    /**
     * The filter conditions that must be met in order to spawn blocks
     */
    spawn_filter: ServerFilters|ServerFilters[];
    /**
     * The distance from the entity's origin to spawn the block, capped at 16 blocks distance
     * @default [0,0,0]
     */
    spawn_offset: [number, number, number];
}

/**
 * Defines an entity's transformation into another
 */
export interface Transformation {
    /**
     * List of component groups to add to the entity after transform
     */
    add: {
        /**
         * Names of component groups to add to the entity
         */
        component_groups: string[];
    };
    /**
     * Sound to play when the entity begins transforming
     */
    begin_transform_sound: string;
    /**
     * Defines the properties of the delay for the transformation
     */
    delay: {
        /**
         * Chance that the entity will look for nearby blocks that can speed up the transformation, 0.0 is 0% and 1.0 is 100%
         * @default 0.0
         */
        block_assist_chance: number;
        /**
         * Chance that, once a block is found it will speed up the transformation, 0.0 is 0% and 1.0 is 100%
         * @default 0.0
         */
        block_chance: number;
        /**
         * Max number of blocks the entity will look for to speed up the transformation
         * @default `block_radius`
         */
        block_max: number;
        /**
         * Distance in blocks the entity will search for blocks to speed up the transformation
         * @default 0
         */
        block_radius: number;
        /**
         * List of blocks that can speed up the transformation
         */
        block_types: string[];
        /**
         * Max random time in seconds before the entity can transform
         * @default 0
         */
        range_max: number;
        /**
         * Min random time in seconds before the entity can transform
         * @default 0
         */
        range_min: number;
        /**
         * Time in seconds before the entity can transform
         * @default 0
         */
        value: number;
    };
    /**
     * If true, the entity drops all equipment on transform
     * @default false
     */
    drop_equipment: boolean;
    /**
     * If true, the entity drops all inventory on transform
     * @default false
     */
    drop_inventory: boolean;
    /**
     * The entity identifier to transform into
     */
    into: string;
    /**
     * If true, the entity will keep its trade levels
     * @default false
     */
    keep_level: boolean;
    /**
     * If true and the entity is owned, the owner will be kept
     * @default false
     */
    keep_owner: boolean;
    /**
     * If true, the entity will keep its equipment on transform
     * @default false
     */
    preserve_equipment: boolean;
    /**
     * The sound to play when the entity is done transforming
     */
    transform_sound: string;
}

/**
 * Defines that the entity will not be saved, despawning when unloaded
 */
export interface Transient {}

/**
 * Defines the entity's ability to trust players
 */
export interface Trusting {
    /**
     * The chance of the entity trusting with each item use, 0.0 is 0% and 1.0 is 100%
     * @default 1.0
     */
    probability: number;
    /**
     * Event to fire when the entity trusts a player
     */
    trust_event: string;
    /**
     * The list of items that can be used by players to gain the entity's trust
     */
    trust_items: string[];
}

/**
 * Entities with this component wil have a max auto step height depending on if the block they stand on prevents jumping
 */
export interface VariableMaxAutoStep {
    /**
     * The max auto step height when on any block that does not prevent jumping
     * @default 0.5625
     */
    base_value: number;
    /**
     * The max auto step height when on any block that does not prevent jumping and controlled by the player
     * @default 0.5625
     */
    controlled_value: number;
    /**
     * The max auto step height when on any block that prevents jumping
     * @default 0.5625
     */
    jump_prevented_value: number;
}

/**
 * Vibrations emitted by the entity will be ignored
 */
export interface VibrationDamper {}

/**
 * Vibrations will be detected by the entity
 */
export interface VibrationListener {}

/**
 * Defines water movement properties for the entity
 */
export interface WaterMovement {
    /**
     * Drag factor to determine movement speed when in water
     * @default 0.8
     */
    drag_factor: number;
}

// #endregion

// #region Properties

/**
 * Defines the entity's ambient sound and its intervals
 */
export interface AmbientSoundInterval {
    /**
     * Random max time in seconds between ambient sound events
     * @default 16.0
     */
    value: number;
    /**
     * Random min time in seconds between ambient sound events
     * @default 8.0
     */
    range: number;
    /**
     * Sound event to be played as the ambient sound
     * @default "ambient"
     */
    event_name: string;
    /**
     * List of dynamic sounds events with conditions to play them
     */
    event_names: {
        /**
         * The sound event to play
         */
        event_name: string;
        /**
         * The conditions that must be met to play the event
         */
        condition: ServerFilters|ServerFilters[];
    }[];
}

/**
 * When set, the entity will no longer visually rotate their body to match their facing direction
 */
export interface BodyRotationBlocked {}

/**
 * Allows this entity to climb ladders
 */
export interface CanClimb {}

/**
 * Marks the entity as being able to fly for the pathfinder
 */
export interface CanFly {}

/**
 * Allows the entity to power jump like Horses
 */
export interface CanPowerJump {}

/**
 * When set, blocks entities from attacking the owner unless they have the {@link IgnoreCannotBeAttacked} component
 */
export interface CannotBeAttacked {}

/**
 * Defines the entity's color. Requires specific materials on the client entity
 */
export interface Color {
    /**
     * The palette color index
     * @default 0
     */
    value: number;
}

/**
 * Defines the entity's secondary color. Only works with `runtime_identifier: "tropicalfish"`
 */
export interface Color2 {
    /**
     * The palette color index
     * @default 0
     */
    value: number;
}

/**
 * Sets the entity's default head rotation angle
 */
export interface DefaultLookAngle {
    /**
     * Angle, in degrees
     * @default 0
     */
    value: number;
}

/**
 * Sets the equipment table to use for the entity
 */
export interface Equipment {
    /**
     * A list of slots with the chance to drop an equipped item from that slot
     */
    slot_drop_chance: string[];
    /**
     * The file path to the equipment table, relative to the behavior pack root
     */
    table: string;
}

/**
 * Marks the entity as not being able to set on fire or taking fire damage
 */
export interface FireImmune {}

/**
 * Sets that this entity can float in liquid blocks
 */
export interface FloatsInLiquid {}

/**
 * Speed in blocks the mob flies at
 */
export interface FlyingSpeed {
    /**
     * Speed in blocks per tick
     * @default 0.02
     */
    value: number;
}

/**
 * Defines how much friction affects this entity
 */
export interface FrictionModifier {
    /**
     * The amount of friction to apply to the entity
     * @default 1.0
     */
    value: number;
}

/**
 * Sets the offset from the ground that the entity is actually at
 */
export interface GroundOffset {
    /**
     * The value of the entity's offset from the ground, in blocks
     * @default 0
     */
    value: number;
}

/**
 * Defines exceptions to the {@link CannotBeAttacked} component
 */
export interface IgnoreCannotBeAttacked {
    /**
     * Defines which entities are exceptions and are allowed to be attacked by the owner entity, potentially attacked entity is `subject: "other"`
     */
    filters: ServerFilters|ServerFilters[];
}

/**
 * Allows the entity to be controlled by the rider's input if the have the {@link Rideable} component
 */
export interface InputGroundControlled {}

/**
 * Defines the entity as a baby
 */
export interface IsBaby {}

/**
 * Defines the entity as charged
 */
export interface IsCharged {}

/**
 * Defines the entity as carrying a chest
 */
export interface IsChested {}

/**
 * Defines the entity as able to change color with dyes
 */
export interface IsDyeable {
    /**
     * The text displayed when interacting with Touch controls
     */
    interact_text: string;
}

/**
 * Defines the entity as can hide from hostile mobs while invisible
 */
export interface IsHiddenWhenInvisible {}

/**
 * Defines the entity as currently on fire
 */
export interface IsIgnited {}

/**
 * Defines the entity as an Illager Captain
 */
export interface IsIllagerCaptain {}

/**
 * Defines the entity as pregnant
 */
export interface IsPregnant {}

/**
 * Defines the entity as wearing a saddle
 */
export interface IsSaddled {}

/**
 * Defines the entity as currently shaking
 */
export interface IsShaking {}

/**
 * Defines the entity as sheared
 */
export interface IsSheared {}

/**
 * Defines the entity as stackable
 */
export interface IsStackable {}

/**
 * Defines the entity as stunned
 */
export interface IsStunned {}

/**
 * Defines the entity as tamed
 */
export interface IsTamed {}

/**
 * Defines what items can be used to control this entity while ridden
 */
export interface ItemControllable {
    /**
     * The list of items that can be used to control the entity
     */
    control_items: string[];
}

/**
 * Defines the entity's loot table dropped on death
 */
export interface Loot {
    /**
     * The file path to the loot table, relative to the behavior pack root
     */
    table: string;
}

/**
 * Defines the entity's auxiliary variant
 */
export interface MarkVariant {
    /**
     * The value of the entity's mark variant
     * @default 0
     */
    value: number;
}

/**
 * Defines the offset used to determine the next step distance to play a movement sound
 */
export interface MovementSoundDistanceOffset {
    /**
     * The higher the number, the less often the sound will play
     * @default 1.0
     */
    value: number;
}

/**
 * Defines the distance through which the entity can push through
 */
export interface PushThrough {
    /**
     * Value of the entity's push-through, in blocks
     * @default 0
     */
    value: number;
}

/**
 * Defines the entity as rendering even when invisible, allowing it to be handled by the client entity
 */
export interface RendersWhenInvisible {}

/**
 * Defines the entity's scale, both for rendering and hitbox
 */
export interface Scale {
    /**
     * The scale of the entity
     * @default 1.0
     */
    value: number;
}

/**
 * Defines the entity's skin id
 */
export interface SkinID {
    /**
     * The value of the entity's skin id
     * @default 0
     */
    value: number;
}

/**
 * Defines the entity's base volume for sound effects
 */
export interface SoundVolume {
    /**
     * The value of the entity's sound volume
     * @default 1.0
     */
    value: number;
}

/**
 * Defines the families this entity belongs to
 */
export interface TypeFamily {
    /**
     * The family types of the entity
     */
    family: string[];
}

/**
 * Defines the entity's variant
 */
export interface Variant {
    /**
     * The value of the entity's variant
     * @default 0
     */
    value: number;
}

/**
 * Sets the speed multiplier for this entity's walk animation
 */
export interface WalkAnimationSpeed {
    /**
     * The speed multiplier for the entity's walk animation
     * @default 1.0
     */
    value: number;
}

/**
 * Defines the entity as wanting to become a jockey
 */
export interface WantsJockey {}

// #endregion

// #region Triggers

/**
 * Only usable by `minecraft:ender_dragon`. Adds a trigger to fire on the entity's death
 */
export interface OnDeath extends Trigger {}

/**
 * Adds a trigger that will fire when a nearby entity of the same type becomes angry
 */
export interface OnFriendlyAnger extends Trigger {}

/**
 * Adds a trigger that will fire when the entity takes damage
 */
export interface OnHurt extends Trigger {}

/**
 * Adds a trigger that will fire when the entity is attacked by a player
 */
export interface OnHurtByPlayer extends Trigger {}

/**
 * Adds a trigger that will fire when the entity is set on fire
 */
export interface OnIgnite extends Trigger {}

/**
 * Only usable by `minecraft:ender_dragon`. Adds a trigger to fire when the entity lands
 */
export interface OnStartLanding extends Trigger {}

/**
 * Only usable by `minecraft:ender_dragon`. Adds a trigger to fire when the entity starts flying
 */
export interface OnStartTakeoff extends Trigger {}

/**
 * Adds a trigger that will fire when the entity finds a target
 */
export interface OnTargetAcquired extends Trigger {}

/**
 * Adds a trigger that will fire when the entity loses its target
 */
export interface OnTargetEscape extends Trigger {}

/**
 * Adds a trigger that will fire when this pet's owner wakes after sleeping with the pet
 */
export interface OnWakeWithOwner extends Trigger {}

// #endregion