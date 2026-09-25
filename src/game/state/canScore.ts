import { GameState } from './GameState';

export function canScore(state: GameState): boolean {
  return state === GameState.PLAYING;
}
