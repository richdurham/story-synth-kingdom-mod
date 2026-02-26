import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./drizzle/schema.ts";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const connection = await mysql.createConnection(connectionString);
const db = drizzle(connection, { schema, mode: "default" });

console.log("🌱 Starting extended database seed...\n");

// ========================================
// SEED MAP REGIONS
// ========================================
console.log("🗺️  Seeding map regions...");

const regions = [
  {
    regionId: "western_provinces",
    name: "Western Provinces",
    description: "Fertile farmlands that feed the kingdom",
    gridRow: 0,
    gridCol: 0,
    happiness: 60,
    unrest: 20,
    economicLevel: 70,
    churchPower: 40,
    militaryPower: 50,
    brigandPresence: 30,
    primaryProduction: "farming",
    population: 15000,
    terrain: "plains",
    color: "#8B7355",
    icon: "wheat",
  },
  {
    regionId: "iron_mountains",
    name: "Iron Mountains",
    description: "Rich mineral deposits and hardy miners",
    gridRow: 0,
    gridCol: 1,
    happiness: 50,
    unrest: 15,
    economicLevel: 80,
    churchPower: 30,
    militaryPower: 60,
    brigandPresence: 10,
    primaryProduction: "mining",
    population: 8000,
    terrain: "mountains",
    color: "#696969",
    icon: "mountain",
  },
  {
    regionId: "port_city",
    name: "Port City",
    description: "Bustling trade hub connecting the kingdom to the world",
    gridRow: 0,
    gridCol: 2,
    happiness: 70,
    unrest: 10,
    economicLevel: 90,
    churchPower: 35,
    militaryPower: 40,
    brigandPresence: 20,
    primaryProduction: "trade",
    population: 25000,
    terrain: "coastal",
    color: "#4682B4",
    icon: "anchor",
  },
  {
    regionId: "northern_forest",
    name: "Northern Forest",
    description: "Dense woodlands providing timber and game",
    gridRow: 1,
    gridCol: 0,
    happiness: 55,
    unrest: 25,
    economicLevel: 60,
    churchPower: 45,
    militaryPower: 35,
    brigandPresence: 40,
    primaryProduction: "lumber",
    population: 6000,
    terrain: "forest",
    color: "#228B22",
    icon: "tree",
  },
  {
    regionId: "central_capital",
    name: "Central Capital",
    description: "The seat of royal power and administration",
    gridRow: 1,
    gridCol: 1,
    happiness: 65,
    unrest: 30,
    economicLevel: 85,
    churchPower: 60,
    militaryPower: 80,
    brigandPresence: 5,
    primaryProduction: "administration",
    population: 40000,
    terrain: "urban",
    color: "#FFD700",
    icon: "crown",
  },
  {
    regionId: "eastern_borderlands",
    name: "Eastern Borderlands",
    description: "Fortified frontier protecting against external threats",
    gridRow: 1,
    gridCol: 2,
    happiness: 45,
    unrest: 35,
    economicLevel: 50,
    churchPower: 25,
    militaryPower: 90,
    brigandPresence: 15,
    primaryProduction: "military",
    population: 12000,
    terrain: "plains",
    color: "#8B4513",
    icon: "shield",
  },
  {
    regionId: "southern_vineyards",
    name: "Southern Vineyards",
    description: "Rolling hills producing the kingdom's finest wines",
    gridRow: 2,
    gridCol: 0,
    happiness: 75,
    unrest: 5,
    economicLevel: 75,
    churchPower: 50,
    militaryPower: 30,
    brigandPresence: 10,
    primaryProduction: "wine",
    population: 10000,
    terrain: "hills",
    color: "#800080",
    icon: "grape",
  },
  {
    regionId: "merchants_quarter",
    name: "Merchant's Quarter",
    description: "Commercial district where fortunes are made and lost",
    gridRow: 2,
    gridCol: 1,
    happiness: 60,
    unrest: 20,
    economicLevel: 95,
    churchPower: 20,
    militaryPower: 25,
    brigandPresence: 25,
    primaryProduction: "trade",
    population: 18000,
    terrain: "urban",
    color: "#DAA520",
    icon: "coins",
  },
];

await db.insert(schema.mapRegions).values(regions);
console.log(`✅ Seeded ${regions.length} map regions\n`);

// ========================================
// SEED REGION ROLE INFO
// ========================================
console.log("📋 Seeding region role information...");

const roleInfo = [
  // Western Provinces - Different perspectives
  {
    regionId: "western_provinces",
    roleId: "historian",
    title: "Historical Significance",
    information: "The Western Provinces were the site of the Great Rebellion of 1453, when peasants rose against excessive taxation. The scars of that conflict still influence local attitudes toward the crown.",
    priority: 10,
  },
  {
    regionId: "western_provinces",
    roleId: "spymaster",
    title: "Intelligence Report",
    information: "Our agents report increased bandit activity near the border. Local militia appears undermanned. Duke Alaric has been meeting with merchants from neighboring kingdoms—purpose unknown.",
    priority: 10,
  },
  {
    regionId: "western_provinces",
    roleId: "treasurer",
    title: "Economic Assessment",
    information: "Tax collection efficiency: 78%. Recent poor harvests have reduced revenue by 15%. The region owes 2,000 gold in back taxes. Duke Alaric has requested a tax deferment.",
    priority: 10,
  },
  {
    regionId: "western_provinces",
    roleId: "general",
    title: "Military Status",
    information: "Garrison strength: 200 soldiers (60% of recommended). Morale: Moderate. Bandit incursions increasing. Request for reinforcements pending approval.",
    priority: 10,
  },
  
  // Port City - Different perspectives
  {
    regionId: "port_city",
    roleId: "historian",
    title: "Historical Context",
    information: "Founded 300 years ago as a fishing village, Port City grew into the kingdom's primary trade hub. The Merchant Guilds hold significant political power here.",
    priority: 10,
  },
  {
    regionId: "port_city",
    roleId: "spymaster",
    title: "Intelligence Report",
    information: "Foreign spies confirmed operating in the port. Merchant Prince Valen controls the dockworkers' guild—his loyalty is questionable. Smuggling operations detected but difficult to prosecute.",
    priority: 10,
  },
  {
    regionId: "port_city",
    roleId: "treasurer",
    title: "Economic Assessment",
    information: "Customs revenue: 5,000 gold per month (highest in kingdom). However, estimated smuggling losses: 1,500 gold per month. Trade tariffs are a contentious political issue.",
    priority: 10,
  },
  {
    regionId: "port_city",
    roleId: "general",
    title: "Military Status",
    information: "Naval garrison: 150 marines. Harbor defenses: Adequate. Concern: Merchant ships could be armed and used against us if Valen turns hostile.",
    priority: 10,
  },
  
  // Central Capital - Different perspectives
  {
    regionId: "central_capital",
    roleId: "historian",
    title: "Historical Context",
    information: "The capital has stood for 500 years, built on the ruins of an ancient fortress. The Great Cathedral was constructed during the Golden Age and remains the center of religious authority.",
    priority: 10,
  },
  {
    regionId: "central_capital",
    roleId: "spymaster",
    title: "Intelligence Report",
    information: "Court intrigue is intense. High Priest Cedric is consolidating power within the church. Several nobles are forming factions. Recommend increased surveillance of council chambers.",
    priority: 10,
  },
  {
    regionId: "central_capital",
    roleId: "treasurer",
    title: "Economic Assessment",
    information: "Royal treasury location. Current balance: 3,500 gold. Monthly expenses: 2,000 gold. Monthly revenue: 2,500 gold. We are running a surplus, but reserves are low.",
    priority: 10,
  },
  {
    regionId: "central_capital",
    roleId: "general",
    title: "Military Status",
    information: "Royal Guard: 500 elite soldiers. Palace defenses: Excellent. City watch: 300 guards. The capital is secure, but drawing troops from here weakens our defensive posture.",
    priority: 10,
  },
];

await db.insert(schema.regionRoleInfo).values(roleInfo);
console.log(`✅ Seeded ${roleInfo.length} role-specific region information entries\n`);

// ========================================
// SEED NPCs
// ========================================
console.log("👥 Seeding NPCs...");

const npcsData = [
  {
    npcId: "duke_alaric",
    name: "Duke Alaric of Westwood",
    title: "Duke of the Western Provinces",
    description: "A proud nobleman who values regional autonomy and resents central authority.",
    currentRegionId: "western_provinces",
    loyalty: 60,
    influence: 80,
    wealth: 85,
    militaristic: 55,
    religious: 40,
    diplomatic: 65,
    npcType: "noble",
    agenda: JSON.stringify({
      goals: ["increase_regional_autonomy", "expand_trade_routes", "reduce_taxes"],
      fears: ["loss_of_power", "peasant_uprising"],
    }),
    isAlive: 1,
    canMove: 1,
  },
  {
    npcId: "high_priest_cedric",
    name: "High Priest Cedric",
    title: "High Priest of the Great Cathedral",
    description: "The spiritual leader of the kingdom, wielding significant moral authority.",
    currentRegionId: "central_capital",
    loyalty: 75,
    influence: 90,
    wealth: 70,
    militaristic: 30,
    religious: 95,
    diplomatic: 70,
    npcType: "religious_leader",
    agenda: JSON.stringify({
      goals: ["increase_church_influence", "enforce_moral_law", "expand_cathedral"],
      fears: ["secularization", "loss_of_tithes"],
    }),
    isAlive: 1,
    canMove: 1,
  },
  {
    npcId: "general_thorne",
    name: "General Marcus Thorne",
    title: "Commander of the Eastern Frontier",
    description: "A battle-hardened veteran who prioritizes military strength above all.",
    currentRegionId: "eastern_borderlands",
    loyalty: 90,
    influence: 75,
    wealth: 60,
    militaristic: 95,
    religious: 50,
    diplomatic: 35,
    npcType: "military_commander",
    agenda: JSON.stringify({
      goals: ["strengthen_military", "expand_borders", "crush_bandits"],
      fears: ["invasion", "military_budget_cuts"],
    }),
    isAlive: 1,
    canMove: 1,
  },
  {
    npcId: "merchant_prince_valen",
    name: "Merchant Prince Valen",
    title: "Master of the Dockworkers' Guild",
    description: "A shrewd businessman who controls much of the kingdom's maritime trade.",
    currentRegionId: "port_city",
    loyalty: 50,
    influence: 85,
    wealth: 95,
    militaristic: 40,
    religious: 30,
    diplomatic: 80,
    npcType: "merchant",
    agenda: JSON.stringify({
      goals: ["maximize_profit", "reduce_tariffs", "expand_trade_monopoly"],
      fears: ["trade_restrictions", "rival_merchants"],
    }),
    isAlive: 1,
    canMove: 1,
  },
  {
    npcId: "lady_isolde",
    name: "Lady Isolde",
    title: "Countess of the Southern Vineyards",
    description: "An elegant noblewoman known for her lavish parties and political acumen.",
    currentRegionId: "southern_vineyards",
    loyalty: 70,
    influence: 65,
    wealth: 80,
    militaristic: 35,
    religious: 55,
    diplomatic: 85,
    npcType: "noble",
    agenda: JSON.stringify({
      goals: ["maintain_lifestyle", "arrange_advantageous_marriages", "cultural_patronage"],
      fears: ["scandal", "economic_downturn"],
    }),
    isAlive: 1,
    canMove: 1,
  },
];

await db.insert(schema.npcs).values(npcsData);
console.log(`✅ Seeded ${npcsData.length} NPCs\n`);

// ========================================
// SEED REGENT ATTITUDES
// ========================================
console.log("👑 Seeding Regent attitudes...");

const attitudes = [
  {
    attitudeId: "fiscal_conservatism",
    name: "Fiscal Conservatism",
    description: "Preference for balanced budgets and low spending",
    currentValue: 75,
    volatility: 5,
    category: "fiscal",
    isHidden: 1,
  },
  {
    attitudeId: "militarism",
    name: "Militaristic Preference",
    description: "Belief in military strength and readiness",
    currentValue: 40,
    volatility: 10,
    category: "military",
    isHidden: 1,
  },
  {
    attitudeId: "religious_devotion",
    name: "Religious Devotion",
    description: "Respect for church authority and religious tradition",
    currentValue: 60,
    volatility: 8,
    category: "religious",
    isHidden: 1,
  },
  {
    attitudeId: "populism",
    name: "Populist Sentiment",
    description: "Concern for the common people's welfare",
    currentValue: 55,
    volatility: 12,
    category: "social",
    isHidden: 1,
  },
  {
    attitudeId: "diplomatic_preference",
    name: "Diplomatic Preference",
    description: "Preference for negotiation over confrontation",
    currentValue: 50,
    volatility: 7,
    category: "diplomatic",
    isHidden: 1,
  },
];

await db.insert(schema.regentAttitudes).values(attitudes);
console.log(`✅ Seeded ${attitudes.length} Regent attitudes\n`);

// ========================================
// SEED EVENT TRIGGERS
// ========================================
console.log("⚡ Seeding event triggers...");

const triggers = [
  {
    triggerId: "bandit_crisis",
    name: "Bandit Crisis Trigger",
    description: "Triggers when bandit presence is high and military power is low in a region",
    triggeredIssueId: "bandit_uprising",
    conditions: JSON.stringify({}),
    regionalConditions: JSON.stringify({
      brigandPresence: { operator: ">", value: 60 },
      militaryPower: { operator: "<", value: 40 },
    }),
    priority: 10,
    canTriggerMultipleTimes: 1,
    cooldownRounds: 5,
    isActive: 1,
    timesTriggered: 0,
  },
  {
    triggerId: "tax_revolt",
    name: "Tax Revolt Trigger",
    description: "Triggers when treasury is low and public unrest is high",
    triggeredIssueId: "tax_revolt_issue",
    conditions: JSON.stringify({
      treasury: { operator: "<", value: 20 },
      unrest: { operator: ">", value: 50 },
    }),
    regionalConditions: null,
    priority: 15,
    canTriggerMultipleTimes: 0,
    cooldownRounds: 10,
    isActive: 1,
    timesTriggered: 0,
  },
  {
    triggerId: "church_conflict",
    name: "Church-State Conflict Trigger",
    description: "Triggers when church power is very high in capital",
    triggeredIssueId: "church_power_struggle",
    conditions: JSON.stringify({}),
    regionalConditions: JSON.stringify({
      regionId: "central_capital",
      churchPower: { operator: ">", value: 75 },
    }),
    priority: 12,
    canTriggerMultipleTimes: 0,
    cooldownRounds: 8,
    isActive: 1,
    timesTriggered: 0,
  },
];

await db.insert(schema.eventTriggers).values(triggers);
console.log(`✅ Seeded ${triggers.length} event triggers\n`);

// ========================================
// SEED PLAYER ACTIONS
// ========================================
console.log("🎯 Seeding player actions...");

const actions = [
  {
    actionId: "deploy_spy",
    roleId: "spymaster",
    name: "Deploy Spy",
    description: "Send a spy to gather intelligence in a specific region",
    buttonLabel: "Deploy Spy",
    effects: JSON.stringify({ type: "reveal_info", infoType: "regional_intel" }),
    cooldownRounds: 2,
    usesPerGame: null,
    isActive: 1,
  },
  {
    actionId: "audit_treasury",
    roleId: "treasurer",
    name: "Audit Treasury",
    description: "Conduct a thorough audit of kingdom finances",
    buttonLabel: "Audit Treasury",
    effects: JSON.stringify({ type: "reveal_info", infoType: "hidden_expenses" }),
    cooldownRounds: 3,
    usesPerGame: 3,
    isActive: 1,
  },
  {
    actionId: "deploy_troops",
    roleId: "general",
    name: "Deploy Troops",
    description: "Move military forces to a region",
    buttonLabel: "Deploy Troops",
    effects: JSON.stringify({
      type: "modify_regional_variable",
      variable: "militaryPower",
      change: 15,
    }),
    cooldownRounds: 2,
    usesPerGame: null,
    isActive: 1,
  },
  {
    actionId: "investigate_rumors",
    roleId: "historian",
    name: "Investigate Historical Records",
    description: "Research historical precedents for current situation",
    buttonLabel: "Research History",
    effects: JSON.stringify({ type: "reveal_info", infoType: "historical_context" }),
    cooldownRounds: 1,
    usesPerGame: null,
    isActive: 1,
  },
];

await db.insert(schema.playerActions).values(actions);
console.log(`✅ Seeded ${actions.length} player actions\n`);

// ========================================
// SEED HISTORICAL EVENTS
// ========================================
console.log("📜 Seeding historical events...");

const events = [
  {
    eventId: "great_rebellion_1453",
    regionId: "western_provinces",
    title: "The Great Rebellion",
    description: "Peasants rose up against excessive taxation, leading to months of conflict. The rebellion was eventually crushed, but resentment lingers.",
    eventType: "rebellion",
    round: -100,
    importance: 90,
    isVisible: 1,
  },
  {
    eventId: "founding_port_city",
    regionId: "port_city",
    title: "Founding of Port City",
    description: "A small fishing village grew into the kingdom's primary trade hub over three centuries.",
    eventType: "founding",
    round: -300,
    importance: 70,
    isVisible: 1,
  },
  {
    eventId: "cathedral_construction",
    regionId: "central_capital",
    title: "Construction of the Great Cathedral",
    description: "The magnificent cathedral was built during the Golden Age, cementing the church's power.",
    eventType: "construction",
    round: -150,
    importance: 80,
    isVisible: 1,
  },
  {
    eventId: "battle_eastern_pass",
    regionId: "eastern_borderlands",
    title: "Battle of the Eastern Pass",
    description: "General Thorne led a decisive victory against invaders, securing the frontier.",
    eventType: "battle",
    round: -10,
    importance: 85,
    isVisible: 1,
  },
];

await db.insert(schema.historicalEvents).values(events);
console.log(`✅ Seeded ${events.length} historical events\n`);

// ========================================
// COMPLETE
// ========================================
console.log("🎉 Extended database seed completed successfully!\n");
console.log("Summary:");
console.log(`  - ${regions.length} map regions`);
console.log(`  - ${roleInfo.length} role-specific information entries`);
console.log(`  - ${npcsData.length} NPCs`);
console.log(`  - ${attitudes.length} Regent attitudes`);
console.log(`  - ${triggers.length} event triggers`);
console.log(`  - ${actions.length} player actions`);
console.log(`  - ${events.length} historical events`);

await connection.end();
