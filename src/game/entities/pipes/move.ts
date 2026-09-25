// ── Pipe Movement ─────────────────────────────────────────────

import { config } from '../config';
import type { Pipe } from './generate';

export interface MovingPipe extends Pipe {
  speed: number;
}

export function movePipes(pipes: MovingPipe[], dt: number, scoreMultiplier: number): void {
  const speed = clamp(config.pipeBaseSpeed + (scoreMultiplier * config.difficultyRampPerScore) * 15,
    config.pipeBaseSpeed, config.maxPipeSpeed);

  for (const pipe of pipes) {
    pipe.x -= speed * dt;
  }
}
