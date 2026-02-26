import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Game roles available in the current game.
 * Each role represents a player position (e.g., Regent, Treasury, Military).
 */
export const gameRoles = mysqlTable("game_roles", {
  id: int("id").autoincrement().primaryKey(),
  roleId: varchar("roleId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GameRole = typeof gameRoles.$inferSelect;
export type InsertGameRole = typeof gameRoles.$inferInsert;

/**
 * Game issues that players must resolve.
 * Each issue has multiple resolution options that lead to different narrative outcomes.
 */
export const gameIssues = mysqlTable("game_issues", {
  id: int("id").autoincrement().primaryKey(),
  issueId: varchar("issueId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 64 }), // e.g., "Militarism", "Economy"
  status: mysqlEnum("status", ["active", "resolved", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameIssue = typeof gameIssues.$inferSelect;
export type InsertGameIssue = typeof gameIssues.$inferInsert;

/**
 * Global game variables that track state (e.g., treasury_level, militarism_level).
 * These variables are updated based on player decisions and narrative outcomes.
 */
export const gameVariables = mysqlTable("game_variables", {
  id: int("id").autoincrement().primaryKey(),
  variableId: varchar("variableId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  currentValue: int("currentValue").default(0).notNull(),
  minValue: int("minValue"),
  maxValue: int("maxValue"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameVariable = typeof gameVariables.$inferSelect;
export type InsertGameVariable = typeof gameVariables.$inferInsert;

/**
 * Current game state tracking which issue is active and player-specific private variables.
 */
export const gameState = mysqlTable("game_state", {
  id: int("id").autoincrement().primaryKey(),
  currentIssueId: varchar("currentIssueId", { length: 64 }),
  round: int("round").default(1).notNull(),
  status: mysqlEnum("status", ["active", "paused", "completed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameStateRecord = typeof gameState.$inferSelect;
export type InsertGameState = typeof gameState.$inferInsert;

/**
 * Private notes sent between players.
 * Only the recipient can view notes addressed to their role.
 */
export const notes = mysqlTable("notes", {
  id: int("id").autoincrement().primaryKey(),
  senderRole: varchar("senderRole", { length: 64 }).notNull(),
  recipientRole: varchar("recipientRole", { length: 64 }).notNull(),
  content: text("content").notNull(),
  isRead: int("isRead").default(0).notNull(), // 0 = unread, 1 = read
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

/**
 * Game history tracking narrative outcomes and state changes.
 * Records each resolution event and its consequences.
 */
export const gameHistory = mysqlTable("game_history", {
  id: int("id").autoincrement().primaryKey(),
  issueId: varchar("issueId", { length: 64 }).notNull(),
  playerRole: varchar("playerRole", { length: 64 }).notNull(),
  resolutionChoice: text("resolutionChoice").notNull(),
  narrativeOutcome: text("narrativeOutcome").notNull(),
  stateChanges: text("stateChanges"), // JSON string of variable changes
  round: int("round").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GameHistoryRecord = typeof gameHistory.$inferSelect;
export type InsertGameHistory = typeof gameHistory.$inferInsert;
/**
 * ========================================
 * EXTENDED SCHEMA FOR KINGDOM COUNCIL
 * ========================================
 * 
 * Additional tables for:
 * - Map regions with dynamic variables
 * - NPCs that can move between regions
 * - Regent's hidden attitudes
 * - Event triggers based on game state
 * - Role-specific information
 */

import { boolean, json } from "drizzle-orm/mysql-core";

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
  gridRow: int("gridRow").notNull(),
  gridCol: int("gridCol").notNull(),
  
  // Regional variables (0-100 scale)
  happiness: int("happiness").default(50).notNull(),
  unrest: int("unrest").default(0).notNull(),
  economicLevel: int("economicLevel").default(50).notNull(),
  churchPower: int("churchPower").default(50).notNull(),
  militaryPower: int("militaryPower").default(50).notNull(),
  brigandPresence: int("brigandPresence").default(0).notNull(),
  
  // Regional characteristics
  primaryProduction: varchar("primaryProduction", { length: 64 }),
  population: int("population").default(1000).notNull(),
  terrain: varchar("terrain", { length: 64 }),
  
  // Visual representation
  color: varchar("color", { length: 32 }).default("#8B7355"),
  icon: varchar("icon", { length: 64 }),
  
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
  regionId: varchar("regionId", { length: 64 }).notNull(),
  roleId: varchar("roleId", { length: 64 }).notNull(),
  
  title: varchar("title", { length: 255 }),
  information: text("information").notNull(),
  priority: int("priority").default(0),
  
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RegionRoleInfo = typeof regionRoleInfo.$inferSelect;
export type InsertRegionRoleInfo = typeof regionRoleInfo.$inferInsert;

/**
 * NPCs (Named characters) that exist in the game world.
 */
export const npcs = mysqlTable("npcs", {
  id: int("id").autoincrement().primaryKey(),
  npcId: varchar("npcId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  
  currentRegionId: varchar("currentRegionId", { length: 64 }),
  
  // NPC characteristics (0-100)
  loyalty: int("loyalty").default(50).notNull(),
  influence: int("influence").default(50).notNull(),
  wealth: int("wealth").default(50).notNull(),
  
  // Hidden attitudes (0-100)
  militaristic: int("militaristic").default(50).notNull(),
  religious: int("religious").default(50).notNull(),
  diplomatic: int("diplomatic").default(50).notNull(),
  
  npcType: varchar("npcType", { length: 64 }),
  agenda: text("agenda"),
  
  isAlive: int("isAlive").default(1).notNull(),
  canMove: int("canMove").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NPC = typeof npcs.$inferSelect;
export type InsertNPC = typeof npcs.$inferInsert;

/**
 * NPC movement history.
 */
export const npcMovements = mysqlTable("npc_movements", {
  id: int("id").autoincrement().primaryKey(),
  npcId: varchar("npcId", { length: 64 }).notNull(),
  fromRegionId: varchar("fromRegionId", { length: 64 }),
  toRegionId: varchar("toRegionId", { length: 64 }).notNull(),
  reason: text("reason"),
  round: int("round").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NPCMovement = typeof npcMovements.$inferSelect;
export type InsertNPCMovement = typeof npcMovements.$inferInsert;

/**
 * The Regent's hidden attitudes and preferences.
 */
export const regentAttitudes = mysqlTable("regent_attitudes", {
  id: int("id").autoincrement().primaryKey(),
  attitudeId: varchar("attitudeId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  currentValue: int("currentValue").default(50).notNull(),
  volatility: int("volatility").default(5).notNull(),
  
  category: varchar("category", { length: 64 }),
  isHidden: int("isHidden").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RegentAttitude = typeof regentAttitudes.$inferSelect;
export type InsertRegentAttitude = typeof regentAttitudes.$inferInsert;

/**
 * Event triggers define conditions that spawn new issues.
 */
export const eventTriggers = mysqlTable("event_triggers", {
  id: int("id").autoincrement().primaryKey(),
  triggerId: varchar("triggerId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  triggeredIssueId: varchar("triggeredIssueId", { length: 64 }).notNull(),
  
  conditions: text("conditions").notNull(),
  regionalConditions: text("regionalConditions"),
  
  priority: int("priority").default(0).notNull(),
  canTriggerMultipleTimes: int("canTriggerMultipleTimes").default(0).notNull(),
  cooldownRounds: int("cooldownRounds").default(0),
  
  isActive: int("isActive").default(1).notNull(),
  timesTriggered: int("timesTriggered").default(0).notNull(),
  lastTriggeredRound: int("lastTriggeredRound"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EventTrigger = typeof eventTriggers.$inferSelect;
export type InsertEventTrigger = typeof eventTriggers.$inferInsert;

/**
 * Player actions available to specific roles.
 */
export const playerActions = mysqlTable("player_actions", {
  id: int("id").autoincrement().primaryKey(),
  actionId: varchar("actionId", { length: 64 }).notNull().unique(),
  roleId: varchar("roleId", { length: 64 }).notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  buttonLabel: varchar("buttonLabel", { length: 128 }).notNull(),
  
  effects: text("effects").notNull(),
  
  cooldownRounds: int("cooldownRounds").default(0),
  usesPerGame: int("usesPerGame"),
  
  isActive: int("isActive").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PlayerAction = typeof playerActions.$inferSelect;
export type InsertPlayerAction = typeof playerActions.$inferInsert;

/**
 * Tracks when players use their role-specific actions.
 */
export const actionHistory = mysqlTable("action_history", {
  id: int("id").autoincrement().primaryKey(),
  actionId: varchar("actionId", { length: 64 }).notNull(),
  roleId: varchar("roleId", { length: 64 }).notNull(),
  round: int("round").notNull(),
  result: text("result"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActionHistory = typeof actionHistory.$inferSelect;
export type InsertActionHistory = typeof actionHistory.$inferInsert;

/**
 * Historical events for the map's history layer.
 */
export const historicalEvents = mysqlTable("historical_events", {
  id: int("id").autoincrement().primaryKey(),
  eventId: varchar("eventId", { length: 64 }).notNull().unique(),
  regionId: varchar("regionId", { length: 64 }),
  
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  eventType: varchar("eventType", { length: 64 }),
  
  round: int("round").notNull(),
  importance: int("importance").default(50).notNull(),
  isVisible: int("isVisible").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type HistoricalEvent = typeof historicalEvents.$inferSelect;
export type InsertHistoricalEvent = typeof historicalEvents.$inferInsert;
