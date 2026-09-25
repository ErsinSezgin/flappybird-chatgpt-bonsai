import type { InputHandler, GameStateData } from '../state/types';

export function createKeyboardInput(): InputHandler {
  let lastSpaceTime = 0;
  const DEBOUNCE_MS = 200;

  return {
    onDown: (key: string) => {
      if (key === ' ') {
        lastSpaceTime = Date.now();
        return true;
      }
      return false;
    },
    onUp: () => {},
    getAction(state: GameStateData): boolean {
      if (state.state === 'READY') return true;
      if (state.state === 'PLAYING') {
        const now = Date.now();
        return now - lastSpaceTime < DEBOUNCE_MS;
      }
      if (state.state === 'GAME_OVER') {
        const now = Date.now();
        return now - lastSpaceTime < DEBOUNCE_MS;
      }
      return false;
    },
    cleanup: () => {}
  };
}
