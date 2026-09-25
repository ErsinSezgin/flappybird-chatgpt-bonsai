import type { PlayerState } from '../core/player';
import { GRAVITY, FLAP_VELOCITY, TILT_UP, TILT_DOWN, ROTATION_RATE, ROTATION_SMOOTH } from '../config/game';

export function applyGravity(player: PlayerState, dt: number): void {
  player.vy += GRAVITY * dt;
}

export function applyFlapImpulse(player: PlayerState): void {
  player.vy = FLAP_VELOCITY;
}

export function updateRotation(player: PlayerState): void {
  const targetAngle = Math.max(-TILT_UP, Math.min(TILT_DOWN, player.vy * ROTATION_RATE));
  player.rotation += (targetAngle - player.rotation) * ROTATION_SMOOTH;
}
