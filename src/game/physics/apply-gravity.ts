import { Player } from '../entities/player';

export function applyGravity(player: Player, deltaTime: number): Player {
  return { ...player, vy: player.vy + gravity * deltaTime };
}
