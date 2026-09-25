import { applyFlapImpulse } from '../../../src/game/player/flap';

describe('applyFlapImpulse', () => {
  it('returns upward velocity (negative value)', () => {
    const result = applyFlapImpulse(0);
    expect(result).toBeLessThan(0);
  });

  it('ignores current velocity and sets flap impulse', () => {
    const v1 = applyFlapImpulse(0);
    const v2 = applyFlapImpulse(-5);
    expect(v1).toBe(v2);
  });

  it('returns consistent value on repeated calls', () => {
    const a = applyFlapImpulse(0);
    const b = applyFlapImpulse(10);
    expect(a).toBe(b);
  });

  it('returns numeric value', () => {
    expect(typeof applyFlapImpulse(0)).toBe('number');
  });

  it('produces negative (upward) velocity', () => {
    expect(applyFlapImpulse(5)).toBeLessThan(0);
  });

  it('is deterministic', () => {
    const result1 = applyFlapImpulse(0);
    const result2 = applyFlapImpulse(0);
    expect(result1).toBe(result2);
  });

  it('returns a specific flap velocity constant', () => {
    const flapVelocity = applyFlapImpulse(0);
    expect(flapVelocity).toBe(-7.5);
  });
});
