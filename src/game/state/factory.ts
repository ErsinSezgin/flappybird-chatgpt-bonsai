import { GameState } from "./types";

export const createTransition = (from: GameState, to: GameState): { from: GameState; to: GameState } => ({ from, to });
