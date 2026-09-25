import { GameState } from './GameState';

export function canRestart(state: GameState): boolean {
  return state === GameState.READY || state === GameState.GAME_OVER;
}
