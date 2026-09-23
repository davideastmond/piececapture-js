## ♟️ 12x12 Grid Strategy Board Game

## A turn-based abstract strategy game built as a modern full-stack web application. The project is managed as a TypeScript Monorepo, utilizing npm workspaces to cleanly share core game rules and logic matrices between the React frontend and the backend API architecture.

## 🎮 Game Overview

The game is played on a fixed 12x12 orthogonal grid where players compete to dominate space and capture enemy elements through tactical positioning.

## Core Mechanics

- Grid Size: 12x12 squares (144 total cells).
- Format: Turn-based deployment. Players place exactly one piece per turn on any empty square on the board.
- Objective: Capture the highest number of opponent pieces by the time the entire board is completely filled.

## Capture Rules

Points are earned by completely surrounding an opponent's piece orthogonally on all available adjacent sides.

| Piece Location | Required Surrounding Sides | Description                                                |
| -------------- | -------------------------- | ---------------------------------------------------------- |
| Center         | 4 Sides                    | Must be enclosed on the Up, Down, Left, and Right axes.    |
| Edges          | 3 Sides                    | Must be enclosed on all 3 remaining in-bound board axes.   |
| Corners        | 2 Sides                    | Must be enclosed on both internal axes forming the corner. |

## Captured pieces are removed from the board immediately, granting the capturing player +1 point.

## 🚀 Roadmap Phases

1.  Phase 1: Local Deployment (Human vs. CPU) — Core layout engine, client-side capture tracking algorithms, and a localized automated CPU opponent simulation.
2.  Phase 2: Remote Multiplayer (Human vs. Human) — Multi-client synchronization over the internet using a synchronized backend server environment.

---

## 🛠️ Tech Stack & Architecture

This repository is structured as a Monorepo using npm Workspaces, sharing structural code seamlessly:

- Frontend: React 19 + Vite + TypeScript (Single-page app optimized for canvas grid rendering).
- Backend: Node.js Serverless Functions deployed directly through Vercel's edge environment.
- Shared Logic Library (@game/shared): Central engine hosting the 12x12 matrix definitions, state management interfaces, and mathematical validation engines running on both server and client.
- Hosting Platform: Vercel (Unified deployment via a root-level vercel.json).

piececapture-js/
├── packages/
│ ├── frontend/ # React Application
│ ├── backend/ # Node.js API (Vercel Serverless Functions)
│ └── shared/ # Shared Rules, Matrix Algorithms, & TS Types
├── package.json # Root Monorepo Configuration
└── vercel.json # Vercel Deployment Orchestration

---

## 💻 Local Development## Prerequisites

- Node.js (Latest LTS version recommended)
- npm 7+ (for workspace support) or pnpm
- Vercel CLI (npm install -g vercel)

## Quick Start

1.  Clone the repository and navigate to the project directory.
2.  Install all global and workspace workspace dependencies from the root directory:

npm install

3.  Run the complete ecosystem locally using the unified Vercel router proxy:

vercel dev

Your application will boot up at http://localhost:3000, automatically managing hot-reloading for the Vite frontend and proxying API endpoints through /api.

## Targeted Workspace Management

If you want to run specific workspace layers without changing directories (cd), utilize the workspace flags:

# Start only the Vite frontend dev environment

npm run dev --workspace=frontend

# Target and build the frontend package for production testing

npm run build --workspace=frontend

# CPU Strategy Evaluation

## Basic principles

- CPU is aggressive in capturing opponent pieces. CPU captures a piece especially when the move doesn't lead to the CPU's piece being captured itself.
- CPU avoids moves that would leave its pieces vulnerable to immediate capture by the human player.
- CPU values positioning near the edges and corners of the board for strategic advantage, balancing aggression with safety.
- CPU blocks potential capture opportunities for the human player, prioritizing defensive positioning when necessary.
- CPU lays traps by positioning pieces in a way that can lead to multiple captures in subsequent moves, leveraging both offensive and defensive strategies.
