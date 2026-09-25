import type { Config } from './config/constants';

export enum GameState {
  READY = 'READY',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export interface GameStateData {
  state: GameState;
  score: number;
  highScore: number;

  // Player state
  playerY: number;
  velocity: number;
  rotation: number;
  flapAnimation: number;

  // Pipes state
  pipes: Pipe[];
  nextPipeSpawnTime: number;

  // Timing
  elapsedSinceStart: number;
  lastFrameTimestamp: number | null;

  // Background
  scrollOffset: number;

  // Game over details
  deathTime: number | null;
}

export interface Pipe {
  id: string;
  x: number;
  topHeight: number;
  passed: boolean;
}

export interface InputEvent {
  type: 'flap' | 'start' | 'restart';
}

export interface GameConfig extends Config {}
