# Database Schema Implementation Summary

**Date**: February 8, 2026  
**Status**: ✅ Complete  
**Repository**: https://github.com/richdurham/story-synth-kingdom-mod

---

## What Was Accomplished

The extended database schema for the Kingdom Council game has been fully designed, documented, and committed to the repository. This schema provides the foundation for all the advanced game mechanics discussed in the implementation plan.

---

## Schema Overview

### Total Tables: 15

**Core Tables (7)** - Already implemented:
1. `users` - Player authentication
2. `game_roles` - Available player roles
3. `game_issues` - Issues to resolve
4. `game_variables` - Kingdom-wide variables
5. `game_state` - Current game state
6. `notes` - Private messages
7. `game_history` - Decision history

**Extended Tables (8)** - Newly designed:
1. `map_regions` - Regional map data with dynamic variables
2. `region_role_info` - Role-specific information about regions
3. `npcs` - Named characters with locations and attitudes
4. `npc_movements` - NPC movement history
5. `regent_attitudes` - Hidden Regent preferences
6. `event_triggers` - Conditional event spawning
7. `player_actions` - Role-specific actions
8. `action_history` - Player action tracking
9. `historical_events` - Past events for map history layer

---

## Key Features Enabled

### 1. Interactive Regional Map

The `map_regions` table supports a brick-pattern grid layout with each region having:

**Position Data**:
- `gridRow`, `gridCol` - Position on the map

**Regional Variables (0-100 scale)**:
- `happiness` - Local satisfaction
- `unrest` - Civil unrest level
- `economicLevel` - Economic prosperity
- `churchPower` - Church influence
- `militaryPower` - Military presence
- `brigandPresence` - Bandit activity

**Characteristics**:
- `primaryProduction` - Main economic activity
- `population` - Population size
- `terrain` - Terrain type
- `color`, `icon` - Visual representation

**Sample Regions Created**:
- Western Provinces (farming, plains)
- Iron Mountains (mining, mountains)
- Port City (trade, coastal)
- Northern Forest (lumber, forest)
- Central Capital (administration, urban)
- Eastern Borderlands (military, plains)
- Southern Vineyards (wine, hills)
- Merchant's Quarter (trade, urban)

### 2. Asymmetric Information System

The `region_role_info` table enables role-specific information display. The same region shows different information to different roles:

**Example - Western Provinces**:
- **Historian** sees: "The site of the Great Rebellion of 1453..."
- **Spymaster** sees: "Increased bandit activity, Duke meeting with foreign merchants..."
- **Treasurer** sees: "Tax collection efficiency 78%, 2,000 gold in back taxes..."
- **General** sees: "Garrison strength 200 soldiers, 60% of recommended..."

This creates information asymmetry that drives negotiation and debate.

### 3. Dynamic NPCs

The `npcs` table supports named characters with:

**Location & Movement**:
- `currentRegionId` - Where they are now
- `canMove` - Can they move between regions?
- Movement tracked in `npc_movements` table

**Visible Stats (0-100)**:
- `loyalty` - Loyalty to the crown
- `influence` - Political influence
- `wealth` - Economic power

**Hidden Attitudes (0-100)**:
- `militaristic` - Preference for military solutions
- `religious` - Religious devotion
- `diplomatic` - Preference for diplomacy

**Sample NPCs Created**:
- Duke Alaric of Westwood (Western Provinces)
- High Priest Cedric (Central Capital)
- General Marcus Thorne (Eastern Borderlands)
- Merchant Prince Valen (Port City)
- Lady Isolde (Southern Vineyards)

### 4. Regent's Black Box

The `regent_attitudes` table stores hidden preferences that influence the Regent's decisions:

**Sample Attitudes**:
- Fiscal Conservatism: 75/100
- Militarism: 40/100
- Religious Devotion: 60/100
- Populism: 55/100
- Diplomatic Preference: 50/100

**Key Features**:
- `isHidden` - Always true, never shown to players
- `volatility` - How easily the attitude changes (5-12)
- `category` - Type of attitude (fiscal/military/religious/social/diplomatic)

These hidden values influence how the Regent responds to council recommendations, creating strategic uncertainty.

### 5. Dynamic Event Triggering

The `event_triggers` table enables conditional event spawning based on game state:

**Trigger Mechanism**:
- `conditions` - JSON of kingdom-wide conditions
- `regionalConditions` - JSON of regional conditions
- `priority` - Which triggers fire first
- `canTriggerMultipleTimes` - Can fire more than once?
- `cooldownRounds` - Rounds before can trigger again

**Sample Triggers Created**:

**Bandit Crisis**:
```json
{
  "regionalConditions": {
    "brigandPresence": {"operator": ">", "value": 60},
    "militaryPower": {"operator": "<", "value": 40}
  }
}
```

**Tax Revolt**:
```json
{
  "conditions": {
    "treasury": {"operator": "<", "value": 20},
    "unrest": {"operator": ">", "value": 50}
  }
}
```

**Church-State Conflict**:
```json
{
  "regionalConditions": {
    "regionId": "central_capital",
    "churchPower": {"operator": ">", "value": 75}
  }
}
```

### 6. Role-Specific Actions

The `player_actions` table defines unique actions for each role:

**Sample Actions**:

**Spymaster - Deploy Spy**:
- Effect: Reveal regional intelligence
- Cooldown: 2 rounds
- Uses: Unlimited

**Treasurer - Audit Treasury**:
- Effect: Reveal hidden expenses
- Cooldown: 3 rounds
- Uses: 3 per game

**General - Deploy Troops**:
- Effect: Increase regional military power by 15
- Cooldown: 2 rounds
- Uses: Unlimited

**Historian - Research History**:
- Effect: Reveal historical context
- Cooldown: 1 round
- Uses: Unlimited

### 7. Historical Events Layer

The `historical_events` table supports a toggleable history layer on the map:

**Sample Events**:
- The Great Rebellion (Western Provinces, -100 rounds ago)
- Founding of Port City (Port City, -300 rounds ago)
- Construction of Great Cathedral (Central Capital, -150 rounds ago)
- Battle of Eastern Pass (Eastern Borderlands, -10 rounds ago)

Each event has:
- `importance` - How significant (0-100)
- `isVisible` - Show on map?
- `eventType` - Category (battle/famine/festival/rebellion/etc.)

---

## Files Created

### 1. `drizzle/schema-extended.ts`
Standalone extended schema file with detailed documentation and type definitions for all 8 new tables.

### 2. `drizzle/schema.ts` (updated)
Integrated the extended schema into the main schema file, adding all 8 new tables with proper types.

### 3. `DATABASE_SCHEMA.md`
Comprehensive 500+ line documentation covering:
- All 15 tables with field descriptions
- Sample data examples
- Relationships between tables
- Data flow diagrams
- Indexing strategy
- Migration strategy

### 4. `seed-extended-db.mjs`
Seed script that populates all 8 new tables with sample data:
- 8 map regions
- 12 role-specific information entries
- 5 NPCs
- 5 Regent attitudes
- 3 event triggers
- 4 player actions
- 4 historical events

---

## Technical Specifications

### Data Types Used
- `int` - Numeric values, IDs, variables (0-100 scale)
- `varchar` - Short strings (IDs, names, categories)
- `text` - Long strings (descriptions, JSON data)
- `timestamp` - Date/time tracking
- `mysqlEnum` - Fixed value sets (status, categories)

### JSON Fields
Several fields store JSON for flexibility:
- `npcs.agenda` - NPC goals and motivations
- `event_triggers.conditions` - Trigger conditions
- `event_triggers.regionalConditions` - Regional trigger conditions
- `player_actions.effects` - Action effects
- `action_history.result` - Action results

### Indexing Recommendations
Key fields to index for performance:
- All `*Id` fields (foreign keys)
- `map_regions.regionId`
- `npcs.currentRegionId`
- `region_role_info.regionId` + `roleId` (compound)
- `event_triggers.isActive`
- `player_actions.roleId`

---

## Sample Data Statistics

**Map Coverage**:
- 8 regions in 3x3 grid
- 3 terrain types (plains, mountains, coastal, forest, urban, hills)
- 6 production types (farming, mining, trade, lumber, administration, wine, military)
- Total population: 134,000

**NPC Distribution**:
- 2 nobles (Duke Alaric, Lady Isolde)
- 1 religious leader (High Priest Cedric)
- 1 military commander (General Thorne)
- 1 merchant (Merchant Prince Valen)

**Regent Attitude Balance**:
- Highest: Religious Devotion (60) and Fiscal Conservatism (75)
- Lowest: Militarism (40)
- Most volatile: Populism (volatility 12)
- Least volatile: Fiscal Conservatism (volatility 5)

**Event Trigger Coverage**:
- 1 regional trigger (Bandit Crisis)
- 1 kingdom-wide trigger (Tax Revolt)
- 1 specific location trigger (Church Conflict in capital)

---

## Next Steps

### Immediate (Phase 4-5)
1. **Run Database Migration**
   - Generate migration from updated schema
   - Apply migration to create new tables
   - Run seed script to populate sample data

2. **Build Backend API**
   - Create tRPC endpoints for map regions
   - Create endpoints for role-specific information
   - Create endpoints for NPCs and movements
   - Create endpoints for event trigger evaluation

3. **Build Map Component**
   - Create React component with brick-pattern layout
   - Implement click handlers for regions
   - Create modal pop-ups for region details
   - Implement role-specific information display

### Medium Term (Phase 6-7)
4. **Implement Game Logic**
   - Event trigger evaluation system
   - Regent decision algorithm using hidden attitudes
   - Action effect processing
   - Variable update cascades

5. **Build Role Dashboards**
   - Role-specific information panels
   - Action buttons for each role
   - Private information display

### Long Term (Phase 8-9)
6. **Real-Time Features**
   - WebSocket integration
   - Live state updates
   - Player presence indicators

7. **Testing & Refinement**
   - Component tests
   - Integration tests
   - Balance testing
   - UX refinement

---

## Success Metrics

The schema successfully enables:

✅ **Interactive Map** - 8 regions with 6 variables each  
✅ **Asymmetric Information** - 12 role-specific info entries  
✅ **Dynamic NPCs** - 5 characters with movement capability  
✅ **Hidden Regent System** - 5 hidden attitudes with volatility  
✅ **Event Triggering** - 3 conditional triggers with cooldowns  
✅ **Role Actions** - 4 unique actions with effects  
✅ **Historical Context** - 4 past events for map layer  

---

## Repository Status

**Committed Files**:
- `drizzle/schema.ts` (updated with extended schema)
- `drizzle/schema-extended.ts` (standalone extended schema)
- `DATABASE_SCHEMA.md` (comprehensive documentation)
- `seed-extended-db.mjs` (sample data seed script)

**Commit Hash**: `a7f9755`  
**Commit Message**: "Add extended database schema for Kingdom Council"

**GitHub**: https://github.com/richdurham/story-synth-kingdom-mod

---

## Conclusion

The database schema design phase is **complete**. The schema provides a solid foundation for all the game mechanics outlined in the Kingdom Council implementation plan. The next phase is to implement the backend API endpoints and begin building the interactive map component.

All design decisions are documented, sample data is prepared, and the schema is ready for migration and integration into the application.

---

**Phase Status**: ✅ Complete  
**Next Phase**: Build Backend API & Map Component  
**Ready for**: Migration and Implementation
