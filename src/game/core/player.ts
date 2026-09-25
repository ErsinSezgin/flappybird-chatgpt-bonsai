import type { GameState } from './state/types';

export interface PlayerState {
  x: number;
  y: number;
  vy: number;
  rotation: number;
}
