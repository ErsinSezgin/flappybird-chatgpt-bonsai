import type { GameState } from '../core/state';
import type { Pipe } from '../entities/pipe';

export function checkAllCollisions(state: GameState): boolean {
  const { player, pipes, groundY, canvasHeight } = state;

  // Ground collision
  if (player.y + player.height / 2 >= groundY) {
    return true;
  }

  // Ceiling collision
  if (player.y - player.height / 2 <= 0) {
    return true;
  }

  // Pipe collisions
  for (const pipe of pipes) {
    if (checkPipeCollision(player, pipe)) {
      return true;
    }
  }

  return false;
}

import { checkPipeCollision } from './pipes';

// ── AABB (Axis-Aligned Bounding Box) ───────────────────────
export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function AABBoverlap(a: CollisionBox, b: CollisionBox): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function createBirdBox(size: number, x: number, y: number): CollisionBox {
  return {
    x: x - size / 2,
    y: y - size / 2,
    width: size,
    height: size,
  };
}
