// ── Vertical Velocity Update ───────────────────────────────────

import { applyGravity } from './gravity';
import { config } from '../config';

export interface BirdState {
  y: number;
  velocityY: number;
}

export function updateBirdVertical(state: BirdState, dt: number): void {
  state.velocityY = applyGravity(state.velocityY, dt);
  state.y += state.velocityY * dt;
}
