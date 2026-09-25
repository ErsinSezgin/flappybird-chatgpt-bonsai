import { applyGravity } from './physics';

export function updateVerticalVelocity(currentVelocity: number): number {
  return applyGravity(currentVelocity);
}
