# Kingdom Council - Project Status

**Last Updated**: February 8, 2026  
**Repository**: https://github.com/richdurham/story-synth-kingdom-mod  
**Status**: Development Environment Ready ✅

---

## Executive Summary

The Kingdom Council game is a custom-built web application for a collaborative political role-playing experience. The project has a solid foundation with a modern tech stack, working database, and core game mechanics already implemented. The next major development focus is building the interactive regional map system with asymmetric information display.

---

## What's Working Now

### Core Infrastructure ✅
The application has a complete full-stack architecture running locally with MySQL database, Express backend, and React frontend. All dependencies are installed and the development environment is fully configured.

### Database & Data Model ✅
Seven database tables are created and populated with sample data. The schema supports users, game roles, issues, variables, game state tracking, private notes, and decision history. Initial seed data includes four political roles (Regent, Treasury Minister, Military Commander, Chief Diplomat), three sample issues, and four kingdom variables.

### Game Mechanics ✅
Players can select roles, view current issues, make decisions, and send private notes to other players. The system tracks game state across rounds and maintains a history of all decisions. An AI-powered narrative generation system creates story outcomes based on player choices.

### Testing & Quality ✅
The backend has 19 passing tests covering core functionality. The codebase uses TypeScript for type safety and includes proper error handling.

---

## What Needs to Be Built

### Interactive Regional Map 🚧
The centerpiece feature that needs development. This will be a brick-pattern layout of clickable regions, each with its own variables (happiness, economy, church power, military power, labor production, NPCs, brigands). Each player role will see different information when clicking the same region.

### Asymmetric Information System 🚧
Currently all players see the same information. The system needs to be enhanced so each role (Spymaster, Treasurer, General, etc.) has access to unique intelligence sources. This includes role-specific reports, map information, and private data feeds.

### Regent's Black Box 🚧
A hidden attitude system needs to be implemented where the Regent (King/Queen) has concealed preferences and pressures. The council's recommendations are filtered through these hidden variables, and the Regent's decision may differ from the council's advice. This creates uncertainty and strategic depth.

### Enhanced Variable & Event System 🚧
The current variable system needs expansion to support regional variables, dynamic event triggering based on conditions, and feedback loops where one event can trigger another. For example, high brigand presence plus low military power should automatically trigger a banditry crisis.

### Real-Time Synchronization 🚧
The game currently requires manual refreshing. WebSocket integration is planned to enable real-time updates when any player makes a decision or when the game state changes.

---

## Technical Architecture

### Frontend Stack
React 19 provides the UI framework with TypeScript for type safety. Vite handles the build process and development server. TailwindCSS manages styling with Radix UI providing accessible component primitives. The tRPC client enables type-safe API calls to the backend.

### Backend Stack
Express serves as the web server with tRPC providing type-safe API endpoints. Drizzle ORM handles database queries and migrations. Manus OAuth manages user authentication. The OpenAI API integration powers narrative generation.

### Database Design
MySQL stores all game data with seven core tables. The schema uses Drizzle ORM for type-safe queries and automatic migration generation. Four additional tables are planned for map regions, NPCs, regent attitudes, and event triggers.

---

## Development Roadmap

### Phase 1: Enhanced Database Schema (Current)
The immediate task is designing and implementing four new database tables. The `map_regions` table will store regional data and variables. The `npcs` table will track named characters and their locations. The `regent_attitudes` table will hold hidden preference scores. The `event_triggers` table will define conditions that spawn new issues.

### Phase 2: Interactive Map Component
Building the visual map interface is next. This involves creating a React component with a brick-pattern grid layout, implementing click handlers for regions, creating modal pop-ups for region details, and integrating role-specific information display.

### Phase 3: Regional Variable System
Once the map exists, the backend needs API endpoints for regional data, tracking systems for regional variables, NPC movement logic, and event trigger evaluation.

### Phase 4: Role-Specific Dashboards
Each player role needs a customized dashboard showing their unique information sources. This includes reports tabs, action buttons specific to their role, and integration with the map system.

### Phase 5: Regent's Black Box System
Implementing the hidden attitude system requires creating the variables, building the decision evaluation algorithm, generating appropriate responses, and displaying the Regent's reasoning without revealing the hidden mechanics.

### Phase 6: Real-Time Synchronization
Adding WebSocket support will enable instant updates across all connected players. This includes broadcasting state changes, handling reconnections, and adding player presence indicators.

---

## Key Design Decisions

### Map Layout Choice
The decision to use a brick-pattern rectangle layout (instead of hexagons) was made because rectangles align better with standard screen dimensions and are simpler to implement with CSS Grid. Each region is a clickable div element with hover effects.

### Role-Specific Information
The same map and data sources display different information depending on the viewer's role. This is implemented by storing multiple descriptions per data point in the database and querying based on the current player's role ID.

### Regent as Black Box
The Regent's decision-making process is intentionally opaque to players. Hidden variables influence outcomes, but players never see the exact scores. This creates strategic uncertainty and prevents the game from becoming purely mathematical.

### Variable-Driven Events
Rather than a fixed sequence of issues, the game dynamically selects what happens next based on current variable states. This creates emergent narratives where player decisions have cascading consequences.

---

## Current Challenges & Questions

### Open Questions
Several design questions remain unresolved. Should the Regent be a playable role or always AI-controlled? How many regions should the map contain (recommendation is 8-12)? Should NPCs have their own agendas that trigger events? Is there a win condition or is the game open-ended? Should the system support multiple concurrent games or focus on single-game experience first?

### Technical Considerations
Performance optimization will be important as the system grows more complex. Regional data should be cached, database queries need proper indexing, and the map should lazy-load regions. Security is also a concern—all user input must be validated, and role-specific information must be properly isolated.

---

## How to Get Started

### Running Locally
Navigate to the project directory and run `pnpm dev` to start the development server. The application will be available at `http://localhost:3000`. MySQL must be running in the background for the application to function.

### Database Access
Connect to MySQL using the credentials: username `storysynth`, password `storysynth123`, database `story_synth`. The root user can also access via `sudo mysql` without a password.

### Making Changes
The frontend code is in `client/src/` with pages in `client/src/pages/` and components in `client/src/components/`. Backend API endpoints are in `server/routers/`. Database schema is defined in `drizzle/schema.ts`. After schema changes, run migrations with `pnpm db:push`.

---

## Success Metrics

The project will be considered successful when it delivers:

**Multiplayer Experience**: Real-time gameplay where all players see updates instantly when decisions are made.

**Asymmetric Information**: Each role has unique access to different intelligence sources, creating information asymmetry that drives negotiation.

**Interactive Map**: A clickable regional map with dynamic variables, role-specific information, and visual indicators of regional status.

**Political Intrigue**: A robust system for passing notes, trading favors, and making secret deals between players.

**Dynamic Feedback**: Variables that change based on decisions and trigger new events, creating emergent narratives.

**Immersive Narratives**: AI-generated story outcomes that feel responsive to player choices and create memorable moments.

**Ease of Use**: An intuitive interface that non-gamers can understand and use without extensive tutorials.

**Reliability**: Comprehensive test coverage ensuring the game works correctly and doesn't lose player data.

---

## Resources & Documentation

- **Implementation Plan**: `KINGDOM_COUNCIL_PLAN.md` - Detailed technical roadmap
- **Setup Guide**: `SETUP_COMPLETE.md` - Environment setup instructions
- **Local Development**: `LOCAL_SETUP.md` - How to run locally
- **Roadmap**: `DEVELOPMENT_ROADMAP.md` - Original development plan
- **Repository**: https://github.com/richdurham/story-synth-kingdom-mod

---

## Contact & Collaboration

This is an active development project. The codebase is well-structured and documented, making it accessible for new contributors. The tech stack uses modern, well-supported tools with extensive documentation.

**Next Session**: Begin Phase 1 by designing the extended database schema for map regions, NPCs, and event triggers.
