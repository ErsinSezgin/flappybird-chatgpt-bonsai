import type { InputAction } from '../game/core/types';

export interface InputHandler {
  on(action: InputAction): void;
  destroy(): void;
}

export class KeyboardInput implements InputHandler {
  private handlers = new Set<InputAction>();
  private listeners: Array<{ type: string; handler: Function }> = [];

  constructor() {
    this.setup();
  }

  on(action: InputAction): void {
    this.handlers.add(action);
  }

  private setup(): void {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') this.fire('flap');
      if (e.code === 'Enter') this.fire('start');
    };

    window.addEventListener('keydown', onKey);
    this.listeners.push({ type: 'keydown', handler: onKey });
  }

  private fire(action: InputAction): void {
    this.handlers.forEach(handler => handler(action));
  }

  destroy(): void {
    for (const l of this.listeners) window.removeEventListener(l.type, l.handler);
  }
}

export class PointerInput implements InputHandler {
  private handlers = new Set<InputAction>();
  private listeners: Array<{ type: string; handler: Function }> = [];
  private isDown = false;

  constructor() {
    this.setup();
  }

  on(action: InputAction): void {
    this.handlers.add(action);
  }

  private setup(): void {
    const onPointerDown = (e: PointerEvent) => {
      if (!this.isDown) { this.isDown = true; this.fire('flap'); }
    };

    const onPointerUp = () => { this.isDown = false; };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    this.listeners.push({ type: 'pointerdown', handler: onPointerDown });
    this.listeners.push({ type: 'pointerup', handler: onPointerUp });
  }

  private fire(action: InputAction): void {
    this.handlers.forEach(handler => handler(action));
  }

  destroy(): void {
    for (const l of this.listeners) window.removeEventListener(l.type, l.handler);
  }
}
