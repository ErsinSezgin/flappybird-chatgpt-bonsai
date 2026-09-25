import { GameState } from "./types";

export type StateTransition = readonly [from: GameState, to: GameState];

export const READY_TO_PLAYING: StateTransition = ["ready", "playing"];
export const PLAYING_TO_GAME_OVER: StateTransition = ["playing", "gameOver"];
export const GAME_OVER_TO_READY: StateTransition = ["gameOver", "ready"];
