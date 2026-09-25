import { GameState } from './GameState';

export function nextState(state: GameState, input: string): GameState {
  switch (state) {
    case GameState.READY:
      if (input === 'start') return GameState.PLAYING;
    case GameState.PLAYING:
      if (input === 'gameOver') return GameState.GAME_OVER;
    case GameState.GAME_OVER:
      if (input === 'restart') return GameState.READY;
  }
  return state;
}
