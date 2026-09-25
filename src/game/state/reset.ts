import { GameState } from './GameState';

export function reset(state: GameState): GameState {
  if (state === GameState.PLAYING || state === GameState.GAME_OVER) return GameState.READY;
  return state;
}
