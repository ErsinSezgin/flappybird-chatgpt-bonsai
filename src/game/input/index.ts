// ── Input Handling ─────────────────────────────────────────────

type InputType = 'keyboard' | 'pointer' | 'touch';

export interface InputEvent {
  type: InputType;
}

let currentInputHandlers: ((event: InputEvent) => void)[] = [];
let lastMouseX = -1;

export function onInput(handler: (event: InputEvent) => void): () => void {
  currentInputHandlers.push(handler);
  return () => {
    const idx = currentInputHandlers.indexOf(handler);
    if (idx > -1) currentInputHandlers.splice(idx, 1);
  };
}

export function handleEvent(event: InputType): void {
  for (const handler of currentInputHandlers) {
    handler({ type: event });
  }
}

// Keyboard input
export function setupKeyboardInput(onFlap: () => void): () => void {
  const keyHandler = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      onFlap();
    }
  };

  window.addEventListener('keydown', keyHandler);
  return () => window.removeEventListener('keydown', keyHandler);
}

// Pointer/mouse input
export function setupPointerInput(onFlap: () => void): () => void {
  let lastClickX = -1;

  const clickHandler = (e: PointerEvent) => {
    if (e.target.tagName === 'CANVAS' || e.target.tagName === 'BUTTON') {
      onFlap();
    }
  };

  window.addEventListener('pointerdown', clickHandler);
  return () => window.removeEventListener('pointerdown', clickHandler);
}

// Touch input
export function setupTouchInput(onFlap: () => void): () => void {
  const touchHandler = (e: TouchEvent) => {
    if (e.target.tagName === 'CANVAS') {
      onFlap();
    }
  };

  window.addEventListener('touchstart', touchHandler, { passive: true });
  return () => window.removeEventListener('touchstart', touchHandler);
}
