import { BirdState, PipeState } from "../types";

export interface BirdState {
  x: number;
  y: number;
  radius: number;
}

export interface PipeState {
  x: number;
  width: number;
  gapY: number;
  gapHeight: number;
}

export function checkCollision(
  bird: BirdState,
  pipes: PipeState[]
): boolean {
  for (const pipe of pipes) {
    const topPipeBottom = pipe.gapY;
    const bottomPipeTop = pipe.gapY + pipe.gapHeight;

    // Check if bird is within the horizontal bounds of this pipe
    const horizontalOverlap =
      bird.x + bird.radius > pipe.x &&
      bird.x - bird.radius < pipe.x + pipe.width;

    if (horizontalOverlap) {
      // Check if bird hits top pipe or bottom pipe
      const verticalHit =
        bird.y - bird.radius < topPipeBottom ||
        bird.y + bird.radius > bottomPipeTop;

      if (verticalHit) {
        return true;
      }
    }
  }

  return false;
}
