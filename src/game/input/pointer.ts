import type { InputHandler, GameStateData } from '../state/types';

export function createPointerInput(): InputHandler {
  let lastClickTime = 0;
  const DEBOUNCE_MS = 200;

  return {
    onDown: (e: PointerEvent) => {
      lastClickTime = Date.now();
      return e.type === 'mousedown' || e.type === 'touchstart';
    },
    onUp: () => {},
    getAction(state: GameStateData): boolean {
      if (state.state === 'READY') return true;
      if (state.state === 'PLAYING') {
        const now = Date.now();
        return now - lastClickTime < DEBOUNCE_MS;
      }
      if (state.state === 'GAME_OVER') {
        const now = Date.now();
        return now - lastClickTime < DEBOUNCE_MS;
      }
      return false;
    },
    cleanup: () => {}
  };
}
