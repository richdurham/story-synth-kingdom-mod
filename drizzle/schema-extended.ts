import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * EXTENDED SCHEMA FOR KINGDOM COUNCIL GAME
 * 
 * This file contains additional tables for:
 * - Map regions with dynamic variables
 * - NPCs that can move between regions
 * - Regent's hidden attitudes
 * - Event triggers based on game state
 * - Role-specific information
 */

/**
 * Map regions representing different areas of the kingdom.
 * Each region has its own set of variables that change based on events and decisions.
 */
export const mapRegions = mysqlTable("map_regions", {
  id: int("id").autoincrement().primaryKey(),
  regionId: varchar("regionId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Position on the map grid
  gridRow: int("gridRow").notNull(), // Row position in brick pattern
  gridCol: int("gridCol").notNull(), // Column position in brick pattern
  
  // Regional variables (0-100 scale)
  happiness: int("happiness").default(50).notNull(), // Local happiness/satisfaction
  unrest: int("unrest").default(0).notNull(), // Civil unrest level
  economicLevel: int("economicLevel").default(50).notNull(), // Economic prosperity
  churchPower: int("churchPower").default(50).notNull(), // Influence of the church
  militaryPower: int("militaryPower").default(50).notNull(), // Military presence/strength
  brigandPresence: int("brigandPresence").default(0).notNull(), // Bandit/criminal activity
  
  // Regional characteristics
  primaryProduction: varchar("primaryProduction", { length: 64 }), // e.g., "farming", "mining", "trade", "fishing"
  population: int("population").default(1000).notNull(), // Population size
  terrain: varchar("terrain", { length: 64 }), // e.g., "plains", "mountains", "forest", "coastal"
  
  // Visual representation
  color: varchar("color", { length: 32 }).default("#8B7355"), // Hex color for map display
  icon: varchar("icon", { length: 64 }), // Icon identifier for the region
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MapRegion = typeof mapRegions.$inferSelect;
export type InsertMapRegion = typeof mapRegions.$inferInsert;

/**
 * Role-specific information about map regions.
 * Different roles see different details about the same region.
 */
export const regionRoleInfo = mysqlTable("region_role_info", {
  id: int("id").autoincrement().primaryKey(),
  regionId: varchar("regionId", { length: 64 }).notNull(), // References mapRegions.regionId
  roleId: varchar("roleId", { length: 64 }).notNull(), // References gameRoles.roleId
  
  // Role-specific information
  title: varchar("title", { length: 255 }), // Role-specific title for this info
  information: text("information").notNull(), // What this role knows about this region
  priority: int("priority").default(0), // Higher priority info shown first
  
  // Metadata
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RegionRoleInfo = typeof regionRoleInfo.$inferSelect;
export type InsertRegionRoleInfo = typeof regionRoleInfo.$inferInsert;

/**
 * NPCs (Named characters) that exist in the game world.
 * NPCs can move between regions and have their own attitudes and agendas.
 */
export const npcs = mysqlTable("npcs", {
  id: int("id").autoincrement().primaryKey(),
  npcId: varchar("npcId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }), // e.g., "Duke of Westwood", "Merchant Prince"
  description: text("description"),
  
  // Current location
  currentRegionId: varchar("currentRegionId", { length: 64 }), // References mapRegions.regionId
  
  // NPC characteristics
  loyalty: int("loyalty").default(50).notNull(), // Loyalty to the crown (0-100)
  influence: int("influence").default(50).notNull(), // Political influence (0-100)
  wealth: int("wealth").default(50).notNull(), // Economic power (0-100)
  
  // NPC attitudes (hidden from players, influence events)
  militaristic: int("militaristic").default(50).notNull(), // Preference for military solutions
  religious: int("religious").default(50).notNull(), // Religious devotion
  diplomatic: int("diplomatic").default(50).notNull(), // Preference for diplomacy
  
  // NPC type and behavior
  npcType: varchar("npcType", { length: 64 }), // e.g., "noble", "merchant", "religious_leader", "military_commander"
  agenda: text("agenda"), // JSON string describing NPC's goals and motivations
  
  // Status
  isAlive: boolean("isAlive").default(true).notNull(),
  canMove: boolean("canMove").default(true).notNull(), // Can this NPC move between regions?
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NPC = typeof npcs.$inferSelect;
export type InsertNPC = typeof npcs.$inferInsert;

/**
 * NPC movement history.
 * Tracks when NPCs move between regions.
 */
export const npcMovements = mysqlTable("npc_movements", {
  id: int("id").autoincrement().primaryKey(),
  npcId: varchar("npcId", { length: 64 }).notNull(), // References npcs.npcId
  fromRegionId: varchar("fromRegionId", { length: 64 }), // References mapRegions.regionId
  toRegionId: varchar("toRegionId", { length: 64 }).notNull(), // References mapRegions.regionId
  reason: text("reason"), // Why did they move?
  round: int("round").notNull(), // Which game round did this happen?
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NPCMovement = typeof npcMovements.$inferSelect;
export type InsertNPCMovement = typeof npcMovements.$inferInsert;

/**
 * The Regent's hidden attitudes and preferences.
 * These influence how the Regent responds to council recommendations.
 */
export const regentAttitudes = mysqlTable("regent_attitudes", {
  id: int("id").autoincrement().primaryKey(),
  attitudeId: varchar("attitudeId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Current value (0-100 scale, higher = stronger preference)
  currentValue: int("currentValue").default(50).notNull(),
  
  // How much this attitude can shift per decision
  volatility: int("volatility").default(5).notNull(), // How easily this attitude changes
  
  // Attitude categories
  category: varchar("category", { length: 64 }), // e.g., "fiscal", "military", "religious", "diplomatic"
  
  // Visibility
  isHidden: boolean("isHidden").default(true).notNull(), // Hidden from players
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RegentAttitude = typeof regentAttitudes.$inferSelect;
export type InsertRegentAttitude = typeof regentAttitudes.$inferInsert;

/**
 * Event triggers define conditions that spawn new issues.
 * When conditions are met, the associated issue becomes active.
 */
export const eventTriggers = mysqlTable("event_triggers", {
  id: int("id").autoincrement().primaryKey(),
  triggerId: varchar("triggerId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // What issue does this trigger?
  triggeredIssueId: varchar("triggeredIssueId", { length: 64 }).notNull(), // References gameIssues.issueId
  
  // Trigger conditions (JSON string)
  // Example: {"treasury": {"operator": "<", "value": 20}, "unrest": {"operator": ">", "value": 50}}
  conditions: text("conditions").notNull(), // JSON string of conditions
  
  // Regional conditions (optional)
  // Example: {"regionId": "western_provinces", "brigandPresence": {"operator": ">", "value": 70}}
  regionalConditions: text("regionalConditions"), // JSON string of regional conditions
  
  // Trigger behavior
  priority: int("priority").default(0).notNull(), // Higher priority triggers fire first
  canTriggerMultipleTimes: boolean("canTriggerMultipleTimes").default(false).notNull(),
  cooldownRounds: int("cooldownRounds").default(0), // How many rounds before can trigger again?
  
  // Status
  isActive: boolean("isActive").default(true).notNull(),
  timesTriggered: int("timesTriggered").default(0).notNull(),
  lastTriggeredRound: int("lastTriggeredRound"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EventTrigger = typeof eventTriggers.$inferSelect;
export type InsertEventTrigger = typeof eventTriggers.$inferInsert;

/**
 * Player actions available to specific roles.
 * Each role has unique actions they can take during the game.
 */
export const playerActions = mysqlTable("player_actions", {
  id: int("id").autoincrement().primaryKey(),
  actionId: varchar("actionId", { length: 64 }).notNull().unique(),
  roleId: varchar("roleId", { length: 64 }).notNull(), // References gameRoles.roleId
  
  // Action details
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  buttonLabel: varchar("buttonLabel", { length: 128 }).notNull(), // Text on the action button
  
  // Action effects (JSON string)
  // Example: {"type": "reveal_info", "target": "spy_report_1"}
  // Example: {"type": "modify_variable", "variable": "treasury", "change": -10}
  effects: text("effects").notNull(), // JSON string of effects
  
  // Action costs/limits
  cooldownRounds: int("cooldownRounds").default(0), // Rounds before can use again
  usesPerGame: int("usesPerGame"), // Max uses per game (null = unlimited)
  
  // Status
  isActive: boolean("isActive").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PlayerAction = typeof playerActions.$inferSelect;
export type InsertPlayerAction = typeof playerActions.$inferInsert;

/**
 * Tracks when players use their role-specific actions.
 */
export const actionHistory = mysqlTable("action_history", {
  id: int("id").autoincrement().primaryKey(),
  actionId: varchar("actionId", { length: 64 }).notNull(), // References playerActions.actionId
  roleId: varchar("roleId", { length: 64 }).notNull(), // Who took the action
  round: int("round").notNull(), // When was it taken
  result: text("result"), // JSON string of what happened
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActionHistory = typeof actionHistory.$inferSelect;
export type InsertActionHistory = typeof actionHistory.$inferInsert;

/**
 * Historical events that have occurred in past rounds.
 * Used for the "past events" layer on the map.
 */
export const historicalEvents = mysqlTable("historical_events", {
  id: int("id").autoincrement().primaryKey(),
  eventId: varchar("eventId", { length: 64 }).notNull().unique(),
  regionId: varchar("regionId", { length: 64 }), // References mapRegions.regionId (null = kingdom-wide)
  
  // Event details
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  eventType: varchar("eventType", { length: 64 }), // e.g., "battle", "famine", "festival", "rebellion"
  
  // When did it occur?
  round: int("round").notNull(),
  
  // Significance
  importance: int("importance").default(50).notNull(), // How important is this event? (0-100)
  
  // Visibility
  isVisible: boolean("isVisible").default(true).notNull(), // Show on map?
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type HistoricalEvent = typeof historicalEvents.$inferSelect;
export type InsertHistoricalEvent = typeof historicalEvents.$inferInsert;
