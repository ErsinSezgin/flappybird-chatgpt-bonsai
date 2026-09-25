import { GRAVITY, FLAP_VELOCITY } from './constants';

export function applyGravity(velocity: number): number {
  return velocity + GRAVITY;
}
