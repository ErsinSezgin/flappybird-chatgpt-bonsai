import type { PlayerState } from '../core/player';
import type { Pipe } from '../entities/pipe';

export function checkPipeCollision(player: PlayerState, pipe: Pipe): boolean {
  const pLeft = player.x - player.width / 2;
  const pRight = player.x + player.width / 2;
  const pTop = player.y - player.height / 2;
  const pBottom = player.y + player.height / 2;

  // Top pipe collision
  if (pRight > pipe.x && pLeft < pipe.x + pipe.width) {
    if (pTop < pipe.gapTop || pBottom > pipe.gapTop + pipe.gapHeight) {
      return true;
    }
  }

  // Bottom pipe collision
  if (pRight > pipe.x && pLeft < pipe.x + pipe.width) {
    const bottomPipeTop = pipe.gapTop + pipe.gapHeight;
    if (pBottom > bottomPipeTop && pTop < bottomPipeTop + pipe.bottomHeight) {
      return true;
    }
  }

  return false;
}
