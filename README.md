<h1 align="center">Kingdom Council</h1>

<p align="center">
  <em>A collaborative political role-playing game of intrigue, negotiation, and emergent storytelling.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-in%20development-blue.svg" alt="Status" />
  <img src="https://img.shields.io/badge/tech-React%20%7C%20Express%20%7C%20MySQL-orange.svg" alt="Tech Stack" />
  <img src="https://img.shields.io/github/last-commit/richdurham/story-synth-kingdom-mod.svg" alt="Last Commit" />
</p>

---

## About The Project

**Kingdom Council** is a custom-built web application for a collaborative political role-playing experience where 2-5 players serve as advisors on the inner council of a kingdom. Players must debate issues, manage crises, and advise the Regent—who may or may not follow their counsel based on hidden attitudes and pressures.

This project is inspired by the philosophy of [Story-Synth](https://storysynth.org/) but is a custom implementation designed to support more complex game mechanics.

### Core Features

- **Asymmetric Information**: Each player has unique access to different intelligence sources (e.g., Spymaster sees spy reports, Treasurer sees financial ledgers).
- **Interactive Regional Map**: A clickable map of the kingdom with dynamic variables (happiness, economy, military power, etc.) and role-specific information.
- **Political Intrigue**: Players can pass secret notes, trade favors, and pursue personal agendas to achieve their goals.
- **Dynamic Feedback Loops**: Decisions directly affect kingdom and regional variables, which in turn trigger future events and crises.
- **The Regent's Black Box**: A hidden attitude system determines how the Regent responds to council advice, creating strategic uncertainty.
- **AI-Powered Narratives**: An integrated LLM generates story outcomes based on player decisions, creating immersive and memorable moments.

---

## Project Status

This project is currently **in active development**. The foundational architecture is complete, and the core game mechanics are implemented. The next major development phase is building the interactive regional map system.

For a detailed breakdown of what's working and what's next, please see the **[Project Status Document](PROJECT_STATUS.md)**.

### Key Documentation

- **[Implementation Plan](KINGDOM_COUNCIL_PLAN.md)**: The comprehensive technical roadmap for the entire project, detailing all planned features and implementation phases.
- **[Database Schema](DATABASE_SCHEMA.md)**: Complete documentation for all 15 database tables, including relationships, data flow, and sample data.
- **[Setup Guide](SETUP_COMPLETE.md)**: Instructions for setting up the development environment and running the application locally.

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository**:
   ```sh
   gh repo clone richdurham/story-synth-kingdom-mod
   ```
2. **Install dependencies**:
   ```sh
   cd story-synth-kingdom-mod
   pnpm install
   ```
3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - See `.env.example` for required variables.
4. **Set up the database**:
   - Ensure MySQL is running.
   - Create the `story_synth` database.
   - Run migrations: `pnpm db:push`
   - Seed the database: `pnpm db:seed`
5. **Run the development server**:
   ```sh
   pnpm dev
   ```

The application will be available at `http://localhost:3000`.

---

## Technical Architecture

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, Radix UI
- **Backend**: Express, tRPC (type-safe API)
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Manus OAuth
- **AI**: LLM integration for narrative generation

For more details, please see the **[Implementation Plan](KINGDOM_COUNCIL_PLAN.md)**.

---

## Development Roadmap

The project is being developed in phases. Here is a high-level overview:

- **Phase 1: Enhanced Database Schema** ✅
- **Phase 2: Interactive Map Component** 🚧
- **Phase 3: Regional Variable System** 🚧
- **Phase 4: Role-Specific Dashboards** 🚧
- **Phase 5: Regent's Black Box System** 🚧
- **Phase 6: Real-Time Synchronization** 🚧

For a detailed breakdown of each phase, please see the **[Implementation Plan](KINGDOM_COUNCIL_PLAN.md)**.

---

## Contributing

This is an active development project, and contributions are welcome. The codebase is well-structured and documented, making it accessible for new contributors. The tech stack uses modern, well-supported tools with extensive documentation.

If you'd like to contribute, please fork the repository and create a pull request. You can also open an issue with the tag "enhancement".

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or collaboration inquiries, please open an issue in the repository.

---

*This README was generated by Manus, an autonomous AI agent.*
