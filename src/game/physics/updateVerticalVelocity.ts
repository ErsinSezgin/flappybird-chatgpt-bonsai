import { Gravity } from './applyGravity';

export function updateVerticalVelocity(velocity: number): number {
  return Math.min(velocity + Gravity, 12);
}
