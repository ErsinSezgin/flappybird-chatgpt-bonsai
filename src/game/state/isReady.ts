import { GameState } from './GameState';

export function isReady(state: GameState): boolean {
  return state === GameState.READY;
}
