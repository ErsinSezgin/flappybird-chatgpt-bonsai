import { GameState, GameSettings } from './state';

export function createInitialState(): GameSettings {
  return {
    state: 'ready',
    player: { x: 120, y: 300, vy: 0 },
    pipes: [],
    groundOffset: 0,
    score: 0,
    highScore: parseInt(localStorage.getItem('flappyHighScore') || '0', 10),
    difficultyMultiplier: 1.0,
    lastPipeSpawnTime: 0,
    lastFlapTime: 0,
    frameCount: 0,
    particles: [],
    screenShake: 0,
    lastTime: 0,
  };
}
