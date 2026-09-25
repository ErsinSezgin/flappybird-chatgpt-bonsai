import { applyGravity } from './physics/apply-gravity';
import { applyFlapImpulse } from './physics/apply-flap-impulse';

export function updatePlayer(player: Player, deltaTime: number): Player {
  return applyVerticalVelocity(applyGravity(player, deltaTime));
}
