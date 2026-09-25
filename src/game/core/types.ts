import config from "../config";

export const GAME_STATES = {
  READY: "READY",
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
} as const;

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];
