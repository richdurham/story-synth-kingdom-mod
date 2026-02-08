# Kingdom Council - Implementation Plan

## Project Overview

**Kingdom Council** is a collaborative political role-playing game where 2-5 players serve as advisors on the inner council of a kingdom. Players debate issues, manage crises, and advise the Regent—who may or may not follow their counsel based on hidden attitudes and pressures.

### Core Concept
- **Asymmetric Information**: Each player has unique access to different intelligence sources
- **Interactive Map**: A regional map with dynamic variables and role-specific information
- **Political Intrigue**: Players trade favors, pass secret notes, and pursue personal agendas
- **Dynamic Feedback**: Decisions affect kingdom and regional variables, triggering future events
- **The Regent's Black Box**: Hidden attitude system determines how the Regent responds to council advice

---

## Game Mechanics

### 1. Player Roles
Each player selects a role with unique information access:
- **Regent** (optional player role or NPC)
- **Spymaster**: Access to intelligence reports, spy network
- **Treasurer**: Access to financial records, economic data
- **General**: Access to military reports, troop movements
- **High Priest**: Access to religious sentiment, church influence
- **Royal Historian**: Access to historical context, cultural information

### 2. Game Round Structure

#### Phase 1: Council Phase
- New Issue card is drawn based on current game state
- Issue displayed publicly to all players
- Context and stakes are clear

#### Phase 2: Action & Debate Phase (Simultaneous, untimed)
Players can:
- Consult their private dashboards (reports, intelligence, ledgers)
- Interact with the map to gather role-specific intel
- Use role-specific actions (e.g., "Deploy Spy", "Audit Treasury")
- Pass notes/favors to other players privately
- Debate openly with the group

Phase ends when council agrees they're ready to decide.

#### Phase 3: Resolution Phase
- Council selects their recommendation from available options
- Regent's decision is revealed with reasoning
- Consequences are applied (variables updated)
- Setup for next round

### 3. Interactive Regional Map

**Visual Layout**: Brick/rectangle pattern of clickable regions

**Regional Variables** (per location):
- Local Happiness/Unrest Level
- Economic Level
- Power of the Church
- Power of the Military
- Main Labor/Production (farming, mining, trade, etc.)
- Major NPCs Present (NPCs can move between regions!)
- Brigand Presence

**Role-Specific Information**: Same map, different modal pop-ups based on player role
- Historian sees historical context
- Spymaster sees intelligence reports
- Treasurer sees economic data
- General sees military strength
- Priest sees religious sentiment

**Event Triggers**: Regional variables can trigger specific Issues
- Example: High Brigand Presence + Low Military Power = Banditry Crisis
- Example: Low Economic Level + High Unrest = Tax Revolt

### 4. Variable System & Feedback Loops

**Kingdom-Level Variables**:
- Treasury
- Public Unrest
- Military Strength
- Church Influence
- Diplomatic Relations

**Regional Variables**: (see map section above)

**Regent Variables** (hidden):
- Fiscal Conservatism
- Militarism
- Populism
- Religious Devotion
- Diplomatic Preference

**Dynamic Branching**: Issues that appear are determined by current variable states
- If Treasury < 20 AND Unrest > 50 → trigger "Tax Revolt" issue
- If Brigands > 3 regions → trigger "Bandit King" issue

### 5. Note-Passing & Favor Trading

Players can:
- Send private text messages to other players
- Send "favor tokens" to other players' dashboards
- Trade information privately
- Make secret deals

---

## Technical Architecture

### Current Tech Stack
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS + Radix UI
- **Backend**: Express + tRPC (type-safe API)
- **Database**: MySQL with Drizzle ORM
- **Auth**: Manus OAuth
- **AI**: LLM integration for narrative generation

### Database Schema (Existing)
- `users` - Player authentication
- `game_roles` - Available roles in the game
- `game_issues` - Issues that players must resolve
- `game_variables` - Kingdom-wide variables
- `game_state` - Current game state tracking
- `notes` - Private messages between players
- `game_history` - Record of decisions and outcomes

### New Tables Needed
- `map_regions` - Regional data and variables
- `npcs` - Named characters with locations and attitudes
- `regent_attitudes` - Hidden Regent preference variables
- `player_actions` - Role-specific actions available
- `event_triggers` - Conditions that trigger specific issues

---

## Implementation Phases

### Phase 1: Enhanced Database Schema ✅ (Current Phase)
- [x] Set up MySQL database
- [x] Run existing migrations
- [x] Seed sample data
- [ ] Design new tables for map regions
- [ ] Design new tables for NPCs
- [ ] Design new tables for Regent attitudes
- [ ] Design new tables for event triggers

### Phase 2: Interactive Map Component
- [ ] Create Map.tsx component with brick-pattern layout
- [ ] Implement clickable regions
- [ ] Create modal pop-up system for region details
- [ ] Implement role-specific information display
- [ ] Add layer toggle system (past events, current events)
- [ ] Style map with medieval/fantasy theme

### Phase 3: Regional Variable System
- [ ] Create backend API endpoints for regional data
- [ ] Implement regional variable tracking
- [ ] Create UI for displaying regional stats
- [ ] Implement NPC movement system
- [ ] Add regional event triggers

### Phase 4: Role-Specific Dashboards
- [ ] Redesign dashboard to show role-specific information
- [ ] Create "Reports" tab for each role
- [ ] Implement role-specific action buttons
- [ ] Add private information display
- [ ] Integrate map into dashboard

### Phase 5: Regent's Black Box System
- [ ] Create hidden Regent attitude variables
- [ ] Implement decision evaluation algorithm
- [ ] Create Regent response generation system
- [ ] Add attitude shift mechanics
- [ ] Display Regent's reasoning (without revealing hidden values)

### Phase 6: Enhanced Variable & Event System
- [ ] Implement event trigger conditions
- [ ] Create dynamic issue selection based on variables
- [ ] Add consequence chains (one event triggers another)
- [ ] Implement variable decay/growth over time
- [ ] Add crisis escalation mechanics

### Phase 7: Enhanced Note-Passing
- [ ] Add favor token system
- [ ] Implement notification system for new notes
- [ ] Add note history/archive
- [ ] Create "deal" templates for common agreements
- [ ] Add visual indicators for unread notes

### Phase 8: Real-Time Synchronization
- [ ] Integrate Socket.IO for WebSocket support
- [ ] Implement real-time state updates
- [ ] Add player presence indicators
- [ ] Broadcast narrative outcomes in real-time
- [ ] Handle reconnection gracefully

### Phase 9: Google Sheets Integration (Optional)
- [ ] Set up Google Sheets API
- [ ] Create template sheet structure
- [ ] Implement data sync from sheets to database
- [ ] Add validation for sheet data
- [ ] Document sheet format for game masters

### Phase 10: Testing & Polish
- [ ] Write component tests
- [ ] Write integration tests
- [ ] Performance optimization
- [ ] UI/UX refinement
- [ ] Documentation

---

## File Structure

```
story-synth-kingdom-mod/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── GameInterface.tsx    # Main game interface
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── Map.tsx              # Interactive map component [TO BUILD]
│   │   │   ├── RegionModal.tsx      # Region detail modal [TO BUILD]
│   │   │   ├── RoleDashboard.tsx    # Role-specific dashboard [TO BUILD]
│   │   │   ├── NotesPanel.tsx       # Enhanced notes system [TO BUILD]
│   │   │   └── ui/                  # Radix UI components
│   │   └── lib/
│   │       └── trpc.ts              # tRPC client
│   └── public/                      # Static assets
├── server/                          # Express backend
│   ├── routers/
│   │   ├── game.ts                  # Game logic endpoints
│   │   ├── notes.ts                 # Note-passing endpoints
│   │   ├── map.ts                   # Map data endpoints [TO BUILD]
│   │   └── regent.ts                # Regent decision logic [TO BUILD]
│   ├── db.ts                        # Database queries
│   └── narrative.ts                 # AI narrative generation
├── drizzle/                         # Database schema
│   ├── schema.ts                    # Current schema
│   └── schema-extended.ts           # Extended schema [TO BUILD]
├── shared/                          # Shared types
└── seed-db.mjs                      # Database seeding script
```

---

## Next Steps (Immediate)

1. **Design Extended Database Schema**
   - Create `map_regions` table structure
   - Create `npcs` table structure
   - Create `regent_attitudes` table structure
   - Create `event_triggers` table structure

2. **Build Interactive Map Component**
   - Start with basic brick-pattern layout
   - Add sample regions (5-10 regions)
   - Implement click handlers
   - Create basic modal pop-up

3. **Seed Sample Map Data**
   - Create 8-10 sample regions
   - Add 3-5 sample NPCs
   - Set initial regional variables
   - Create sample event triggers

4. **Test Integration**
   - Verify map displays correctly
   - Test region click interactions
   - Verify role-specific information display
   - Test on different screen sizes

---

## Design Considerations

### Map Layout
- Use CSS Grid for brick-pattern layout
- Each region is a `<div>` with unique ID
- Regions should be color-coded by status (peaceful, unrest, crisis)
- Hover effects to indicate clickability
- Responsive design for different screen sizes

### Role-Specific Information
- Store role-specific descriptions in database
- Query based on player role + region ID
- Cache frequently accessed data
- Use consistent formatting across roles

### Regent's Black Box
- Hidden variables never displayed to players
- Decision algorithm weighs multiple factors
- Add randomness to prevent predictability
- Regent can shift attitudes over time based on outcomes

### Performance
- Lazy load map regions
- Cache regional data
- Optimize database queries with indexes
- Use WebSocket for real-time updates (not polling)

---

## Success Metrics

By completion, the game should have:
- ✅ **Multiplayer Experience**: Real-time gameplay with instant updates
- ✅ **Asymmetric Information**: Each role has unique intel sources
- ✅ **Interactive Map**: Clickable regions with dynamic variables
- ✅ **Political Intrigue**: Note-passing and favor-trading systems
- ✅ **Dynamic Feedback**: Variables drive event triggers
- ✅ **Immersive Narratives**: AI-generated outcomes based on decisions
- ✅ **Ease of Use**: Intuitive UI for non-gamers
- ✅ **Reliability**: Comprehensive test coverage

---

## Questions to Resolve

1. Should the Regent be a player role or always AI-controlled?
2. How many regions should the map have? (8-12 recommended)
3. Should NPCs have their own "agendas" that trigger events?
4. Should there be a "win condition" or is it open-ended?
5. Should we support multiple concurrent games or single-game focus?
6. Should game history be replayable/exportable?

---

## Resources

- [Story-Synth Documentation](https://docs.storysynth.org/guide/)
- [Original Story-Synth Repository](https://github.com/randylubin/Story-Synth)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [tRPC Documentation](https://trpc.io/)
- [Radix UI Components](https://www.radix-ui.com/)

---

**Last Updated**: February 8, 2026  
**Current Phase**: Phase 1 - Enhanced Database Schema  
**Next Milestone**: Interactive Map Component
