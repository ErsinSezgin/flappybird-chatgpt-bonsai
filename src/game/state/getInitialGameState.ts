import { GameState } from './GameState';

export function getInitialGameState(): GameState {
  return {
    state: GameState.READY,
    bird: { y: 0, velocity: 0 },
    pipes: [],
    score: 0,
    highScore: parseInt(localStorage.getItem('flappybird_highscore') || '0', 10),
    difficulty: { speed: PipeSpeed, gapSize: GapSize },
  };
}
