import { GameState, GameSettings } from './state';

export function transitionReadyToPlaying(settings: GameSettings): GameSettings {
  return { ...settings, state: 'playing', lastTime: performance.now() };
}

export function transitionPlayingToGameOver(settings: GameSettings): GameSettings {
  return {
    ...settings,
    state: 'gameOver',
    screenShake: 15,
    particles: [
      ...settings.particles,
      createDeathParticles(settings.player.x, settings.player.y),
    ],
  };
}

export function transitionGameOverToReady(settings: GameSettings): GameSettings {
  return { ...settings, state: 'ready', lastTime: 0 };
}

export function transitionPlayingToReady(settings: GameSettings): GameSettings {
  return { ...settings, state: 'ready' };
}

export function getTransitionFn(currentState: GameState): (settings: GameSettings) => GameSettings {
  switch (currentState) {
    case 'ready': return transitionReadyToPlaying;
    case 'playing': return transitionPlayingToGameOver;
    case 'gameOver': return transitionGameOverToReady;
  }
}
