import { Gravity } from './applyGravity';

export function applyFlapImpulse(velocity: number): number {
  return velocity - 8.5;
}
