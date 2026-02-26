# Kingdom Council - Database Schema Documentation

## Overview

The Kingdom Council game uses a MySQL database with **15 tables** divided into two categories:

1. **Core Tables** (7 tables) - Already implemented in `drizzle/schema.ts`
2. **Extended Tables** (8 tables) - New tables in `drizzle/schema-extended.ts`

---

## Core Tables (Existing)

### `users`
Manages player authentication via Manus OAuth.

**Key Fields:**
- `id` - Auto-increment primary key
- `openId` - Unique Manus OAuth identifier
- `name`, `email` - User profile information
- `role` - User role (user/admin)

### `game_roles`
Defines available player roles in the game (e.g., Regent, Treasurer, General).

**Key Fields:**
- `roleId` - Unique identifier (e.g., "spymaster")
- `name` - Display name (e.g., "Royal Spymaster")
- `description` - Role description

### `game_issues`
Issues that the council must debate and resolve.

**Key Fields:**
- `issueId` - Unique identifier
- `title` - Issue title
- `description` - Full description of the issue
- `type` - Category (e.g., "Militarism", "Economy")
- `status` - Current status (active/resolved/archived)

### `game_variables`
Kingdom-wide variables that track overall state.

**Key Fields:**
- `variableId` - Unique identifier (e.g., "treasury")
- `name` - Display name
- `currentValue` - Current value (integer)
- `minValue`, `maxValue` - Valid range

**Example Variables:**
- Treasury (0-100)
- Public Unrest (0-100)
- Military Strength (0-100)
- Church Influence (0-100)

### `game_state`
Tracks the current state of the game.

**Key Fields:**
- `currentIssueId` - Which issue is currently active
- `round` - Current round number
- `status` - Game status (active/paused/completed)

### `notes`
Private messages sent between players.

**Key Fields:**
- `senderRole` - Who sent it
- `recipientRole` - Who receives it
- `content` - Message content
- `isRead` - Read status (0/1)

### `game_history`
Records all decisions and their outcomes.

**Key Fields:**
- `issueId` - Which issue was resolved
- `playerRole` - Who made the decision
- `resolutionChoice` - What they chose
- `narrativeOutcome` - AI-generated story result
- `stateChanges` - JSON of variable changes
- `round` - When it happened

---

## Extended Tables (New)

### `map_regions`
Represents different areas of the kingdom on the interactive map.

**Key Fields:**
- `regionId` - Unique identifier (e.g., "western_provinces")
- `name` - Display name (e.g., "Western Provinces")
- `gridRow`, `gridCol` - Position on map grid

**Regional Variables (0-100 scale):**
- `happiness` - Local satisfaction level
- `unrest` - Civil unrest level
- `economicLevel` - Economic prosperity
- `churchPower` - Church influence in region
- `militaryPower` - Military presence/strength
- `brigandPresence` - Bandit/criminal activity

**Regional Characteristics:**
- `primaryProduction` - Main economic activity (farming/mining/trade/fishing)
- `population` - Population size
- `terrain` - Terrain type (plains/mountains/forest/coastal)

**Visual:**
- `color` - Hex color for map display
- `icon` - Icon identifier

**Example Region:**
```json
{
  "regionId": "western_provinces",
  "name": "Western Provinces",
  "gridRow": 1,
  "gridCol": 1,
  "happiness": 60,
  "unrest": 20,
  "economicLevel": 70,
  "churchPower": 40,
  "militaryPower": 50,
  "brigandPresence": 30,
  "primaryProduction": "farming",
  "population": 15000,
  "terrain": "plains",
  "color": "#8B7355"
}
```

### `region_role_info`
Stores role-specific information about each region. Different roles see different details about the same region.

**Key Fields:**
- `regionId` - Which region
- `roleId` - Which role sees this info
- `title` - Role-specific title
- `information` - What this role knows
- `priority` - Display order (higher first)

**Example:**
```json
{
  "regionId": "western_provinces",
  "roleId": "historian",
  "title": "Historical Significance",
  "information": "The Western Provinces were the site of the Great Rebellion of 1453...",
  "priority": 10
}
```

```json
{
  "regionId": "western_provinces",
  "roleId": "spymaster",
  "title": "Intelligence Report",
  "information": "Our agents report increased bandit activity near the border...",
  "priority": 10
}
```

### `npcs`
Named characters that exist in the game world and can move between regions.

**Key Fields:**
- `npcId` - Unique identifier
- `name` - Character name
- `title` - Noble/professional title
- `currentRegionId` - Where they are now

**NPC Stats (0-100):**
- `loyalty` - Loyalty to the crown
- `influence` - Political influence
- `wealth` - Economic power

**Hidden Attitudes (0-100):**
- `militaristic` - Preference for military solutions
- `religious` - Religious devotion
- `diplomatic` - Preference for diplomacy

**Other:**
- `npcType` - Type (noble/merchant/religious_leader/military_commander)
- `agenda` - JSON of goals and motivations
- `isAlive` - Status
- `canMove` - Can move between regions?

**Example NPC:**
```json
{
  "npcId": "duke_westwood",
  "name": "Duke Alaric of Westwood",
  "title": "Duke of the Western Provinces",
  "currentRegionId": "western_provinces",
  "loyalty": 70,
  "influence": 80,
  "wealth": 90,
  "militaristic": 60,
  "religious": 40,
  "diplomatic": 50,
  "npcType": "noble",
  "agenda": "{\"goals\": [\"increase_regional_autonomy\", \"expand_trade_routes\"]}"
}
```

### `npc_movements`
Tracks NPC movement history.

**Key Fields:**
- `npcId` - Which NPC moved
- `fromRegionId` - Where they came from
- `toRegionId` - Where they went
- `reason` - Why they moved
- `round` - When it happened

### `regent_attitudes`
The Regent's hidden preferences and attitudes. These are **never shown to players** but influence the Regent's decisions.

**Key Fields:**
- `attitudeId` - Unique identifier (e.g., "fiscal_conservatism")
- `name` - Attitude name
- `currentValue` - Current strength (0-100)
- `volatility` - How easily it changes (0-20)
- `category` - Type (fiscal/military/religious/diplomatic)
- `isHidden` - Always true for Regent attitudes

**Example Attitudes:**
```json
{
  "attitudeId": "fiscal_conservatism",
  "name": "Fiscal Conservatism",
  "currentValue": 75,
  "volatility": 5,
  "category": "fiscal",
  "isHidden": true
}
```

```json
{
  "attitudeId": "militarism",
  "name": "Militaristic Preference",
  "currentValue": 40,
  "volatility": 10,
  "category": "military",
  "isHidden": true
}
```

### `event_triggers`
Defines conditions that automatically spawn new issues when met.

**Key Fields:**
- `triggerId` - Unique identifier
- `triggeredIssueId` - Which issue to spawn
- `conditions` - JSON of kingdom-wide conditions
- `regionalConditions` - JSON of regional conditions
- `priority` - Trigger priority (higher first)
- `canTriggerMultipleTimes` - Can fire more than once?
- `cooldownRounds` - Rounds before can trigger again
- `timesTriggered` - How many times has it fired?

**Condition Format (JSON):**
```json
{
  "treasury": {"operator": "<", "value": 20},
  "unrest": {"operator": ">", "value": 50}
}
```

**Regional Condition Format (JSON):**
```json
{
  "regionId": "western_provinces",
  "brigandPresence": {"operator": ">", "value": 70},
  "militaryPower": {"operator": "<", "value": 30}
}
```

**Example Trigger:**
```json
{
  "triggerId": "tax_revolt_trigger",
  "name": "Tax Revolt Trigger",
  "triggeredIssueId": "tax_revolt_issue",
  "conditions": "{\"treasury\": {\"operator\": \"<\", \"value\": 20}, \"unrest\": {\"operator\": \">\", \"value\": 50}}",
  "priority": 10,
  "canTriggerMultipleTimes": false,
  "cooldownRounds": 5
}
```

### `player_actions`
Role-specific actions that players can take during the game.

**Key Fields:**
- `actionId` - Unique identifier
- `roleId` - Which role can use this
- `name` - Action name
- `description` - What it does
- `buttonLabel` - Button text
- `effects` - JSON of effects
- `cooldownRounds` - Rounds before can use again
- `usesPerGame` - Max uses (null = unlimited)

**Effect Types (JSON):**
```json
{"type": "reveal_info", "target": "spy_report_1"}
```

```json
{"type": "modify_variable", "variable": "treasury", "change": -10}
```

```json
{"type": "modify_regional_variable", "regionId": "western_provinces", "variable": "militaryPower", "change": 10}
```

**Example Actions:**

**Spymaster - Deploy Spy:**
```json
{
  "actionId": "deploy_spy",
  "roleId": "spymaster",
  "name": "Deploy Spy",
  "description": "Send a spy to gather intelligence in a region",
  "buttonLabel": "Deploy Spy",
  "effects": "{\"type\": \"reveal_info\", \"infoType\": \"regional_intel\"}",
  "cooldownRounds": 2,
  "usesPerGame": null
}
```

**Treasurer - Audit Treasury:**
```json
{
  "actionId": "audit_treasury",
  "roleId": "treasurer",
  "name": "Audit Treasury",
  "description": "Conduct a thorough audit of kingdom finances",
  "buttonLabel": "Audit Treasury",
  "effects": "{\"type\": \"reveal_info\", \"infoType\": \"hidden_expenses\"}",
  "cooldownRounds": 3,
  "usesPerGame": 3
}
```

### `action_history`
Tracks when players use their actions.

**Key Fields:**
- `actionId` - Which action was used
- `roleId` - Who used it
- `round` - When it was used
- `result` - JSON of what happened

### `historical_events`
Past events that can be displayed on the map's "history layer."

**Key Fields:**
- `eventId` - Unique identifier
- `regionId` - Where it happened (null = kingdom-wide)
- `title` - Event title
- `description` - Event description
- `eventType` - Type (battle/famine/festival/rebellion)
- `round` - When it occurred
- `importance` - Significance (0-100)
- `isVisible` - Show on map?

**Example:**
```json
{
  "eventId": "great_rebellion_1453",
  "regionId": "western_provinces",
  "title": "The Great Rebellion",
  "description": "Peasants rose up against excessive taxation...",
  "eventType": "rebellion",
  "round": -100,
  "importance": 90,
  "isVisible": true
}
```

---

## Relationships

### One-to-Many Relationships

**`map_regions` → `region_role_info`**
- One region has many role-specific info entries (one per role)

**`game_roles` → `region_role_info`**
- One role has many region info entries (one per region)

**`map_regions` → `npcs`**
- One region can have many NPCs currently located there

**`npcs` → `npc_movements`**
- One NPC has many movement records

**`game_roles` → `player_actions`**
- One role has many available actions

**`player_actions` → `action_history`**
- One action has many usage records

**`game_issues` → `event_triggers`**
- One issue can be triggered by many different conditions

**`map_regions` → `historical_events`**
- One region has many historical events

---

## Data Flow

### Issue Resolution Flow
1. Player makes decision on `game_issues`
2. Decision recorded in `game_history`
3. Variables in `game_variables` updated
4. Regional variables in `map_regions` updated
5. `event_triggers` evaluated
6. If conditions met, new issue activated
7. Regent attitudes in `regent_attitudes` may shift

### Map Interaction Flow
1. Player clicks region on map
2. System queries `map_regions` for region data
3. System queries `region_role_info` for role-specific info
4. System queries `npcs` for NPCs in that region
5. System queries `historical_events` for past events (if history layer enabled)
6. Modal displays combined information

### Action Usage Flow
1. Player clicks action button
2. System checks `player_actions` for action details
3. System checks `action_history` for cooldown/usage limits
4. Action effects applied (reveal info, modify variables, etc.)
5. Action recorded in `action_history`

---

## Indexing Strategy

For optimal performance, create indexes on:

**Frequently Queried Fields:**
- `map_regions.regionId`
- `npcs.currentRegionId`
- `region_role_info.regionId` + `region_role_info.roleId` (compound)
- `event_triggers.isActive`
- `player_actions.roleId`
- `action_history.actionId` + `action_history.round` (compound)

**Foreign Key References:**
- All `*Id` fields that reference other tables

---

## Migration Strategy

### Phase 1: Create Extended Tables
1. Run migration to create all 8 new tables
2. Verify table structure

### Phase 2: Seed Sample Data
1. Create 8-10 sample regions
2. Create role-specific info for each region × each role
3. Create 5-8 sample NPCs
4. Create 3-5 sample regent attitudes
5. Create 5-10 event triggers
6. Create role-specific actions for each role
7. Create sample historical events

### Phase 3: Integration
1. Update backend API to query new tables
2. Update frontend to display map and regional data
3. Implement event trigger evaluation logic
4. Implement action system

---

## Sample Data Examples

See `seed-extended-db.mjs` (to be created) for full sample data.

**Sample Regions:**
- Western Provinces (farming, plains)
- Iron Mountains (mining, mountains)
- Port City (trade, coastal)
- Northern Forest (lumber, forest)
- Eastern Borderlands (military, plains)
- Southern Vineyards (wine, hills)
- Central Capital (administration, urban)
- Merchant's Quarter (trade, urban)

**Sample NPCs:**
- Duke Alaric of Westwood (noble, Western Provinces)
- High Priest Cedric (religious leader, Central Capital)
- General Thorne (military commander, Eastern Borderlands)
- Merchant Prince Valen (merchant, Port City)
- Lady Isolde (noble, Southern Vineyards)

**Sample Regent Attitudes:**
- Fiscal Conservatism (75/100)
- Militarism (40/100)
- Religious Devotion (60/100)
- Populism (55/100)
- Diplomatic Preference (50/100)

---

## Next Steps

1. **Create Migration Script**: Generate SQL migration from `schema-extended.ts`
2. **Create Seed Script**: Write `seed-extended-db.mjs` with sample data
3. **Update Backend**: Add tRPC endpoints for new tables
4. **Update Frontend**: Build map component and integrate new data
5. **Test Integration**: Verify all relationships work correctly

---

**Last Updated**: February 8, 2026  
**Schema Version**: 2.0 (Extended)  
**Status**: Design Complete, Ready for Implementation
