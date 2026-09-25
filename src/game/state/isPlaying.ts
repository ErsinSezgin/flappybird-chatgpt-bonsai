import { GameState } from './GameState';

export function isPlaying(state: GameState): boolean {
  return state === GameState.PLAYING;
}
