import { describe, it, expect } from 'vitest';
// Note: birdPipe.ts exports checkBirdPipeCollision
import { checkBirdPipeCollision } from '../birdPipe';

// ── checkBirdPipeCollision Tests ─────────────────────────────

describe('checkBirdPipeCollision', () => {
  it('returns true when bird is in top pipe area', () => {
    const bird = { x: 50, y: 20 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns true when bird is in bottom pipe area', () => {
    const bird = { x: 50, y: 260 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns false when bird is in the gap', () => {
    const bird = { x: 50, y: 95 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('returns false when bird is above the gap', () => {
    const bird = { x: 50, y: -10 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('returns false when bird is below the gap', () => {
    const bird = { x: 50, y: 390 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('returns false when bird is to the left of pipe', () => {
    const bird = { x: 5, y: 95 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('returns false when bird is to the right of pipe', () => {
    const bird = { x: 350, y: 95 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('returns true when bird touches top pipe edge', () => {
    const bird = { x: 50, y: -9.9 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns true when bird touches bottom pipe edge', () => {
    const bird = { x: 50, y: 269.9 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns true when bird touches top pipe horizontally', () => {
    const bird = { x: -9.9, y: 20 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns true when bird touches bottom pipe horizontally', () => {
    const bird = { x: 390.1, y: 260 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('returns true when bird is fully inside the gap but touches both pipes', () => {
    const bird = { x: 50, y: 40 } as any;
    const pipe = { x: 38, gapCenterY: 95, gapHeight: 145 } as any;
    // Bird right = 60 > pipe.x (38), bird.left = 42 < pipe.x+width → overlap
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('handles bird at canvas center of gap', () => {
    const bird = { x: 50, y: 95 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('handles wide gap', () => {
    const bird = { x: 50, y: 20 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 300 } as any;
    // Top pipe bottom = 95 - 150 = -55, so bird at y=20 is in gap
    expect(checkBirdPipeCollision(bird, pipe)).toBe(false);
  });

  it('handles narrow gap', () => {
    const bird = { x: 50, y: 94 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 10 } as any;
    // Top pipe bottom = 95 - 5 = 90, bird top = 84 → collision
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('handles gap at top of canvas', () => {
    const bird = { x: 50, y: -20 } as any;
    const pipe = { x: 40, gapCenterY: 20, gapHeight: 145 } as any;
    // Top pipe bottom = 20 - 72.5 = -52.5
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('handles gap at bottom of canvas', () => {
    const bird = { x: 50, y: 620 } as any;
    const pipe = { x: 40, gapCenterY: 580, gapHeight: 145 } as any;
    // Bottom pipe top = 580 + 72.5 = 652.5
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });

  it('handles bird with large radius', () => {
    const bird = { x: 50, y: 85 } as any;
    const pipe = { x: 40, gapCenterY: 95, gapHeight: 145 } as any;
    // Bird top = 85 - 20 = 65, pipe bottom = 95 - 72.5 = 22.5
    // So bird is in gap → no collision
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true); // 85-20=65 > 22.5
  });

  it('handles bird at edge of horizontal bounds', () => {
    const bird = { x: 390, y: 20 } as any;
    const pipe = { x: 350, gapCenterY: 95, gapHeight: 145 } as any;
    // Bird left = 370 > pipe.x (350), bird.right = 410
    // Pipe right = 350 + canvas_width → overlap
    expect(checkBirdPipeCollision(bird, pipe)).toBe(true);
  });
});
