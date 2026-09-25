import type { GameStateData } from './types';

export function createInitialState(config: GameConfig): GameStateData {
  const canvasHeight = config.canvasHeight;
  return {
    state: 'READY',
    score: 0,
    highScore: 0,

    playerY: canvasHeight / 2,
    velocity: 0,
    rotation: 0,

    flapAnimation: 0,

    pipes: [],
    nextPipeSpawnTime: 3000,

    elapsedSinceStart: 0,
    lastFrameTimestamp: null,

    scrollOffset: 0,

    deathTime: null
  };
}

export function startGame(state: GameStateData): GameStateData {
  return {
    ...state,
    state: 'PLAYING',
    score: 0,
    velocity: 0,
    rotation: 0,
    flapAnimation: 0,
    pipes: [],
    nextPipeSpawnTime: 3000,
    elapsedSinceStart: 0,
    lastFrameTimestamp: null,
    scrollOffset: 0,
    deathTime: null
  };
}

export function gameOver(state: GameStateData): GameStateData {
  const newHighScore = state.score > state.highScore ? state.score : state.highScore;
  return {
    ...state,
    state: 'GAME_OVER',
    highScore: newHighScore,
    deathTime: Date.now()
  };
}

export function restart(state: GameStateData): GameStateData {
  return createInitialState(state as unknown as GameConfig);
}
