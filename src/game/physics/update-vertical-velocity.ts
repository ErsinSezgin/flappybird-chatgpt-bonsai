import { Player } from '../entities/player';

export function updateVerticalVelocity(player: Player, deltaTime: number): Player {
  return applyGravity(player, deltaTime);
}
