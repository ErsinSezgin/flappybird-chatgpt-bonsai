// ── Flap Impulse ───────────────────────────────────────────────

import { config } from '../config';
import { clamp } from '../../utils/math';

export function applyFlapImpulse(currentVelocity: number): number {
  return clamp(currentVelocity + config.flapImpulse, -config.maxVelocityY, config.maxVelocityY);
}
