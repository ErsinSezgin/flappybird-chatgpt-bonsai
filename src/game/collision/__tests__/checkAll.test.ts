import { describe, it, expect } from 'vitest';
import { checkAllCollisions } from '../index';

// ── checkAllCollisions Tests ───────────────────────────────────

describe('checkAllCollisions', () => {
  it('returns true when bird hits ground', () => {
    const state = {
      player: { x: 100, y: 250, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird is exactly at ground level', () => {
    const state = {
      player: { x: 100, y: 245, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    // Player bottom = 245 + 10 = 255 >= groundY (245)
    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns false when bird is just above ground', () => {
    const state = {
      player: { x: 100, y: 244.9, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns true when bird hits ceiling', () => {
    const state = {
      player: { x: 100, y: -5, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird is exactly at ceiling', () => {
    const state = {
      player: { x: 100, y: 0, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns false when bird is just below ceiling', () => {
    const state = {
      player: { x: 100, y: -9.9, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns false when bird is in clear space with no pipes', () => {
    const state = {
      player: { x: 100, y: 150, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns true when bird collides with pipe', () => {
    const state = {
      player: { x: 50, y: 20, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns false when bird passes through pipe gap', () => {
    const state = {
      player: { x: 50, y: 90, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns false when bird is horizontally outside pipe', () => {
    const state = {
      player: { x: 10, y: 90, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns true when multiple pipes exist and bird hits one', () => {
    const state = {
      player: { x: 50, y: 20, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
        { x: 200, width: 60, gapTop: 100, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns false when bird passes through all pipe gaps', () => {
    const state = {
      player: { x: 50, y: 90, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
        { x: 200, width: 60, gapTop: 90, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns false with empty pipe array', () => {
    const state = {
      player: { x: 100, y: 150, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns true when bird touches ground from above', () => {
    const state = {
      player: { x: 100, y: 245.99, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird touches ceiling from below', () => {
    const state = {
      player: { x: 100, y: -9.99, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('handles bird at ground with no pipes', () => {
    const state = {
      player: { x: 100, y: 245, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('handles bird at ceiling with no pipes', () => {
    const state = {
      player: { x: 100, y: -20, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('handles bird in middle of canvas with no pipes', () => {
    const state = {
      player: { x: 200, y: 300, height: 20 },
      pipes: [],
      groundY: 580,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(false);
  });

  it('returns true when bird is at very top of canvas', () => {
    const state = {
      player: { x: 100, y: -50, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird is at very bottom of canvas', () => {
    const state = {
      player: { x: 100, y: 650, height: 20 },
      pipes: [],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird hits pipe from left edge', () => {
    const state = {
      player: { x: 9, y: 20, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });

  it('returns true when bird hits pipe from right edge', () => {
    const state = {
      player: { x: 109, y: 20, height: 20 },
      pipes: [
        { x: 40, width: 60, gapTop: 50, gapHeight: 145 },
      ],
      groundY: 245,
      canvasHeight: 600,
    } as any;

    expect(checkAllCollisions(state)).toBe(true);
  });
});
