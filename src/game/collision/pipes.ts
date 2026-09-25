import type { PlayerState } from '../core/player';

// Pipe interface - matches the test data shape
interface Pipe {
  x: number;
  width: number;
  gapY: number;
  gapHeight: number;
}

/**
 * Check collision between a bird and one or more pipes.
 * Accepts either a single Pipe object or an array of Pipes.
 */
export function checkPipeCollision(player: PlayerState, pipes: Pipe | Pipe[]): boolean {
  // Normalize: if given a single pipe, wrap it in an array
  const pipeArray = Array.isArray(pipes) ? pipes : [pipes];

  for (const pipe of pipeArray) {
    if (!pipe || !pipe.x || !pipe.width || !pipe.gapY || !pipe.gapHeight) {
      continue;
    }

    // Support both radius-based and width/height-based player objects
    const radius = (player as any).radius ?? 10;

    const pLeft = player.x - radius;
    const pRight = player.x + radius;

    const birdHeight = (player as any).height ?? (radius * 2);
    const pTop = player.y - birdHeight / 2;
    const pBottom = player.y + birdHeight / 2;

    // Horizontal overlap check
    if (pRight > pipe.x && pLeft < pipe.x + pipe.width) {
      // Top pipe collision (bird above the gap)
      if (pTop < pipe.gapY || pBottom > pipe.gapY + pipe.gapHeight) {
        return true;
      }
    }

    // Bottom pipe collision (bird below the gap)
    if (pRight > pipe.x && pLeft < pipe.x + pipe.width) {
      const bottomPipeTop = pipe.gapY + pipe.gapHeight;
      if (pBottom > bottomPipeTop && pTop < bottomPipeTop) {
        return true;
      }
    }
  }

  return false;
}

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
