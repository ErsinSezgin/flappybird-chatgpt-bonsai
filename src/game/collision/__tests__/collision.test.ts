import { describe, it, expect } from 'vitest';
import { AABBoverlap, createBirdBox } from '../index';
import { checkPipeCollision } from '../pipes';

// ── AABB Overlap Tests ───────────────────────────────────────

describe('AABBoverlap', () => {
  it('returns true when boxes fully overlap', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: 50, y: 50, width: 100, height: 100 };
    expect(AABBoverlap(a, b)).toBe(true);
  });

  it('returns true when boxes partially overlap', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: 80, y: 30, width: 50, height: 40 };
    expect(AABBoverlap(a, b)).toBe(true);
  });

  it('returns true when one box is inside another', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: 25, y: 25, width: 50, height: 50 };
    expect(AABBoverlap(a, b)).toBe(true);
  });

  it('returns true when boxes touch at edges', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: 100, y: 50, width: 10, height: 40 };
    // Touching at x = 100 edge — should NOT overlap (strict inequality)
    expect(AABBoverlap(a, b)).toBe(false);
  });

  it('returns false when boxes are adjacent vertically', () => {
    const a = { x: 0, y: 0, width: 100, height: 50 };
    const b = { x: 20, y: 50, width: 60, height: 40 };
    expect(AABBoverlap(a, b)).toBe(false);
  });

  it('returns false when boxes are adjacent horizontally', () => {
    const a = { x: 0, y: 0, width: 50, height: 100 };
    const b = { x: 50, y: 30, width: 40, height: 60 };
    expect(AABBoverlap(a, b)).toBe(false);
  });

  it('returns false when boxes are far apart', () => {
    const a = { x: 0, y: 0, width: 10, height: 10 };
    const b = { x: 50, y: 50, width: 10, height: 10 };
    expect(AABBoverlap(a, b)).toBe(false);
  });

  it('returns true when boxes overlap on one axis only partially', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: -20, y: 70, width: 60, height: 40 };
    expect(AABBoverlap(a, b)).toBe(true);
  });

  it('returns false when boxes share only a single point', () => {
    const a = { x: 0, y: 0, width: 100, height: 100 };
    const b = { x: 100, y: 100, width: 50, height: 50 };
    // Touching only at corner (100, 100) — strict inequality means no overlap
    expect(AABBoverlap(a, b)).toBe(false);
  });
});

// ── createBirdBox Tests ──────────────────────────────────────

describe('createBirdBox', () => {
  it('creates a box centered at (x, y) with given size', () => {
    const box = createBirdBox(20, 100, 150);
    expect(box).toEqual({
      x: 90,
      y: 140,
      width: 20,
      height: 20,
    });
  });

  it('creates a box centered at origin', () => {
    const box = createBirdBox(10, 0, 0);
    expect(box).toEqual({
      x: -5,
      y: -5,
      width: 10,
      height: 10,
    });
  });

  it('creates a box centered at canvas center', () => {
    const box = createBirdBox(30, 200, 300);
    expect(box).toEqual({
      x: 185,
      y: 285,
      width: 30,
      height: 30,
    });
  });

  it('creates a box with size 1', () => {
    const box = createBirdBox(1, 50, 50);
    expect(box).toEqual({
      x: 49.5,
      y: 49.5,
      width: 1,
      height: 1,
    });
  });

  it('creates a box with large size', () => {
    const box = createBirdBox(100, 500, 400);
    expect(box).toEqual({
      x: 450,
      y: 350,
      width: 100,
      height: 100,
    });
  });
});

// ── checkPipeCollision Tests (bird vs pipe using AABB) ─────

describe('checkPipeCollision', () => {
  it('returns true when bird is in top pipe gap', () => {
    const bird = { x: 50, y: 20, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('returns true when bird is in bottom pipe gap', () => {
    const bird = { x: 50, y: 250, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('returns false when bird is in the gap (no collision)', () => {
    const bird = { x: 50, y: 90, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns false when bird is to the left of pipe', () => {
    const bird = { x: 10, y: 90, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns false when bird is to the right of pipe', () => {
    const bird = { x: 200, y: 90, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns false when bird is horizontally adjacent to pipe', () => {
    const bird = { x: 9, y: 90, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird right edge = 9 + 10 = 19, pipe left = 40 → no overlap
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns false when bird is above the gap', () => {
    const bird = { x: 50, y: 10, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird bottom = 20 < 50 (gapY) → no collision
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns false when bird is below the gap', () => {
    const bird = { x: 50, y: 320, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird top = 310 > 195 (gapY + gapHeight) → no collision
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns true when bird touches top pipe edge', () => {
    const bird = { x: 50, y: 49.99, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird bottom = 59.99 > gapY (50) → collision
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('returns true when bird touches bottom pipe edge', () => {
    const bird = { x: 50, y: 194.99, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird top = 184.99 < 195 (gapY + gapHeight) → collision
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('returns false when bird is exactly at gap boundary with tiny radius', () => {
    const bird = { x: 50, y: 49.5, radius: 0.25 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird bottom = 49.75 < gapY (50) → no collision
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('returns true for multiple pipes if any collide', () => {
    const bird = { x: 50, y: 20, radius: 10 };
    const pipes = [
      { x: 40, width: 60, gapY: 50, gapHeight: 145 },
      { x: 200, width: 60, gapY: 100, gapHeight: 145 },
    ];
    expect(checkPipeCollision(bird, pipes)).toBe(true);
  });

  it('returns false when bird passes through both gaps', () => {
    const bird = { x: 50, y: 90, radius: 10 };
    const pipes = [
      { x: 40, width: 60, gapY: 50, gapHeight: 145 },
      { x: 200, width: 60, gapY: 90, gapHeight: 145 },
    ];
    expect(checkPipeCollision(bird, pipes)).toBe(false);
  });

  it('returns false with empty pipe array', () => {
    const bird = { x: 50, y: 90, radius: 10 };
    expect(checkPipeCollision(bird, [])).toBe(false);
  });

  it('handles bird at pipe edge', () => {
    const bird = { x: 49, y: 20, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird right = 59 < pipe left (40) → no, wait: bird.x - radius = 39, pipe.x = 40
    // So 39 < 40 → no horizontal overlap
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });

  it('handles bird just past pipe left edge', () => {
    const bird = { x: 51, y: 20, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird left = 41 > pipe.x (40) → horizontal overlap
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('handles bird just past pipe right edge', () => {
    const bird = { x: 109, y: 20, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird left = 99 > pipe.x (40), bird.right = 119
    // pipe.right = 100, so 99 < 100 → horizontal overlap
    expect(checkPipeCollision(bird, [pipe])).toBe(true);
  });

  it('handles bird just to the right of pipe', () => {
    const bird = { x: 110, y: 20, radius: 10 };
    const pipe = { x: 40, width: 60, gapY: 50, gapHeight: 145 };
    // Bird left = 100 is NOT < pipe.right (100) → no horizontal overlap
    expect(checkPipeCollision(bird, [pipe])).toBe(false);
  });
});
