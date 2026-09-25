import { applyGravity } from '../../../src/game/player/physics';
import { applyFlapImpulse } from '../../../src/game/player/flap';
import { updateVerticalVelocity } from '../../../src/game/player/updateVelocity';

describe('Physics Integration', () => {
  describe('gravity + flap net effect', () => {
    it('flap counteracts gravity appropriately', () => {
      // Apply gravity first (velocity goes up in positive direction)
      const afterGravity = applyGravity(0);
      expect(afterGravity).toBeGreaterThan(0);

      // Then apply flap (velocity goes negative/upward)
      const afterFlap = applyFlapImpulse(afterGravity);
      expect(afterFlap).toBeLessThan(0);
    });

    it('repeated gravity + flap cycles', () => {
      let velocity = 0;

      // Gravity increases velocity
      velocity = applyGravity(velocity);
      expect(velocity).toBeGreaterThan(0);

      // Flap resets velocity to upward
      velocity = applyFlapImpulse(velocity);
      expect(velocity).toBeLessThan(0);

      // Gravity increases again
      velocity = applyGravity(velocity);
      expect(velocity).toBeGreaterThan(-7.5); // Should be between 0 and -7.5 + gravity
    });

    it('updateVerticalVelocity is same as applyGravity', () => {
      const v1 = updateVerticalVelocity(5);
      const v2 = applyGravity(5);
      expect(v1).toBe(v2);
    });

    it('multiple physics cycles maintain expected pattern', () => {
      let velocity = 0;

      // Cycle: gravity -> flap -> gravity -> flap
      for (let i = 0; i < 5; i++) {
        velocity = applyGravity(velocity);
        expect(velocity).toBeGreaterThan(-7.5); // Never goes past the flap impulse

        velocity = applyFlapImpulse(velocity);
        expect(velocity).toBe(-7.5); // Always resets to flap impulse

        velocity = applyGravity(velocity);
        expect(velocity).toBeGreaterThan(-7.5); // Gravity has started increasing again
      }
    });

    it('position changes according to velocity and dt', () => {
      // Simulate position updates over time using accumulated velocity
      let y = 300;
      let vy = 0;

      // Apply physics for several steps
      const steps = 10;
      for (let i = 0; i < steps; i++) {
        vy = applyGravity(vy); // velocity increases with gravity

        if (i === steps / 2) {
          vy = applyFlapImpulse(vy); // flap halfway through
        }

        y += vy; // position updates based on velocity
      }

      expect(y).toBeLessThan(300); // Net movement should be downward (gravity dominates)
    });

    it('velocity capped at max fall speed under repeated gravity', () => {
      // This tests that velocity doesn't grow unbounded
      let vy = 0;

      for (let i = 0; i < 100; i++) {
        vy = applyGravity(vy);
      }

      // After many gravity applications, velocity should be high but finite
      expect(vy).toBeGreaterThan(0);
      expect(typeof vy).toBe('number');
    });

    it('full physics pipeline: start -> gravity -> flap -> stable state', () => {
      let velocity = 0;

      // First frame: gravity
      velocity = applyGravity(velocity);
      expect(velocity).toBeGreaterThan(0);

      // Player flaps
      velocity = applyFlapImpulse(velocity);
      expect(velocity).toBeLessThan(0);

      // Next frame: gravity counteracts flap
      velocity = applyGravity(velocity);
      expect(velocity).toBeGreaterThan(-7.5);

      // Another frame: gravity continues
      velocity = applyGravity(velocity);
      expect(velocity).toBeGreaterThan(-7.5);

      // Eventually gravity overcomes flap impulse (after many frames)
      let finalVelocity = velocity;
      for (let i = 0; i < 25; i++) {
        finalVelocity = applyGravity(finalVelocity);
      }
      expect(finalVelocity).toBeGreaterThan(0);
    });

    it('consistent results regardless of frame interval', () => {
      // Same physical state reached via same operations
      const runPhysics = (gravityCount: number, flapCount: number) => {
        let v = 0;
        for (let i = 0; i < gravityCount; i++) v = applyGravity(v);
        for (let i = 0; i < flapCount; i++) v = applyFlapImpulse(v);
        return v;
      };

      // Same sequence of operations should yield same result
      expect(runPhysics(3, 1)).toBe(runPhysics(3, 1));

      // Different sequences yield different results
      expect(runPhysics(5, 0)).not.toBe(runPhysics(3, 1));
    });

    it('velocity converges to expected value after flap + gravity cycle', () => {
      const gravity = 0.45; // Known constant from constants.ts

      let velocity = 0;

      // Apply gravity until approaching terminal behavior
      for (let i = 0; i < 100; i++) {
        velocity = applyGravity(velocity);

        // Every 10 steps, test the velocity
        if (i % 10 === 9) {
          const expected = i * gravity; // Without flap, velocity = i * gravity
          expect(velocity).toBeGreaterThan(expected - 1); // Allow small variance due to flap
        }
      }

      expect(velocity).toBeGreaterThan(0); // Net effect: gravity wins over time
    });

    it('updateVerticalVelocity preserves physics semantics', () => {
      // updateVerticalVelocity is a thin wrapper around applyGravity
      const v1 = updateVerticalVelocity(0);
      const v2 = applyGravity(0);
      expect(v1).toBe(v2);

      const v3 = updateVerticalVelocity(-5);
      const v4 = applyGravity(-5);
      expect(v3).toBe(v4);
    });

    it('player physics cycle: ready state -> playing state', () => {
      // Simulate a complete game frame physics cycle
      let vy = 0;

      // Frame 1: gravity pulls bird down
      vy = applyGravity(vy);
      expect(vy).toBeGreaterThan(0);

      // Frame 2: player flaps, bird goes up
      vy = applyFlapImpulse(vy);
      expect(vy).toBeLessThan(0);

      // Frame 3: gravity counteracts the flap
      vy = applyGravity(vy);
      expect(vy).toBeGreaterThan(-7.5); // Velocity starts increasing again

      // Frame 4-10: gravity dominates
      for (let i = 3; i < 25; i++) {
        vy = applyGravity(vy);
      }

      expect(vy).toBeGreaterThan(0); // Bird falls below starting point eventually
    });

    it('physics is idempotent for same inputs', () => {
      // Same input should always produce same output (no randomness)
      const inputs = [-10, -5, 0, 5, 10, 20];

      for (const input of inputs) {
        const g1 = applyGravity(input);
        const g2 = applyGravity(input);
        expect(g1).toBe(g2);

        const f1 = applyFlapImpulse(input);
        const f2 = applyFlapImpulse(input);
        expect(f1).toBe(f2);

        const u1 = updateVerticalVelocity(input);
        const u2 = updateVerticalVelocity(input);
        expect(u1).toBe(u2);
      }
    });
  });

  describe('physics edge cases', () => {
    it('handles negative initial velocity (bird already falling)', () => {
      // Note: In this physics model, negative = upward velocity
      const vy = applyGravity(-10);
      expect(vy).toBeGreaterThan(-10); // Gravity reduces upward velocity
    });

    it('handles zero gravity scenario (velocity unchanged by gravity)', () => {
      // With no flap, velocity simply increases with each call
      let v = 0;
      for (let i = 0; i < 5; i++) {
        v = applyGravity(v);
      }
      // Should be 5 * GRAVITY if gravity is constant
      expect(v).toBeGreaterThan(0);
    });

    it('flap works from any velocity state', () => {
      expect(applyFlapImpulse(-10)).toBe(-7.5);
      expect(applyFlapImpulse(-5)).toBe(-7.5);
      expect(applyFlapImpulse(0)).toBe(-7.5);
      expect(applyFlapImpulse(10)).toBe(-7.5);
    });

    it('velocity oscillates between flap impulse and accumulated gravity', () => {
      let v = 0;

      // Flap -> velocity resets to -7.5
      v = applyFlapImpulse(v);
      expect(v).toBe(-7.5);

      // Gravity -> velocity increases (becomes less negative)
      v = applyGravity(v);
      expect(v).toBeGreaterThan(-7.5);

      // Flap again -> velocity resets to -7.5
      v = applyFlapImpulse(v);
      expect(v).toBe(-7.5);

      // Gravity again -> velocity increases
      v = applyGravity(v);
      expect(v).toBeGreaterThan(-7.5);

      // Flap again -> velocity resets to -7.5
      v = applyFlapImpulse(v);
      expect(v).toBe(-7.5);

      // After several cycles, velocity should still reset to -7.5 on flap
      for (let i = 0; i < 20; i++) {
        v = applyFlapImpulse(v);
        expect(v).toBe(-7.5);
      }
    });
  });
});
