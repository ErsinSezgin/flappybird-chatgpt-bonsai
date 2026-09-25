import { Player } from '../entities/player';

export function applyFlapImpulse(player: Player): Player {
  return { ...player, vy: -flapVelocity };
}
