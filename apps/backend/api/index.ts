import { createInitialGameState } from "@game/shared";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Initialize a shared type state structure
const initialGameState = createInitialGameState();

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    message: "Welcome to the Strategy Game API",
    state: initialGameState,
  });
}
