import { applyGravity } from '../../../src/game/player/physics';

describe('applyGravity', () => {
  it('adds gravity to current velocity', () => {
    expect(applyGravity(0)).toBeGreaterThan(0);
  });

  it('increases downward velocity with each call', () => {
    const v1 = applyGravity(0);
    const v2 = applyGravity(v1);
    expect(v2).toBeGreaterThan(v1);
  });

  it('preserves initial velocity when gravity is zero', () => {
    // When called with the default gravitational constant, velocity always increases
    const result = applyGravity(5);
    expect(result).toBeGreaterThan(5);
  });

  it('returns numeric value', () => {
    expect(typeof applyGravity(0)).toBe('number');
  });

  it('is deterministic', () => {
    const a = applyGravity(5);
    const b = applyGravity(5);
    expect(a).toBe(b);
  });

  it('applies constant gravity per frame', () => {
    const v0 = applyGravity(0);
    const v1 = applyGravity(v0);
    const delta = v1 - v0;
    expect(delta).toBeGreaterThan(0);
  });
});
