// ── Gravity Physics ────────────────────────────────────────────

import { config } from '../config';
import { clamp } from '../../utils/math';

export function applyGravity(velocity: number, dt: number): number {
  return clamp(velocity + config.gravity * dt, -Infinity, config.maxVelocityY);
}
