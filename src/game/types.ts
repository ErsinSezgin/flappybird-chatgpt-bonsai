// ── Core Types ───────────────────────────────────────────────

export interface BirdState {
  y: number;
  velocityY: number;
}

export interface PipeState {
  x: number;
  gapY: number;
  gapHeight: number;
  width: number;
  passed: boolean;
}

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

const GAME_STATES = {
  READY: "READY",
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
} as const;
