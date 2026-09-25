import { GameState } from './GameState';

export function isGameOver(state: GameState): boolean {
  return state === GameState.GAME_OVER;
}
