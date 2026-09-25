// ── Scoring & Difficulty Progression ─────────────────────────

import { config } from '../config';
import type { Pipe } from '../entities/pipes/generate';

export interface ScoreState {
  score: number;
  bestScore: number;
}

export function incrementScore(state: ScoreState, pipes: Pipe[], birdX: number): void {
  const birdEdge = birdX + config.birdSize * 0.5;

  for (const pipe of pipes) {
    if (!pipe.scored && pipe.x + config.pipeWidth / 2 < birdEdge) {
      pipe.scored = true;
      state.score++;

      if (state.score > state.bestScore) {
        state.bestScore = state.score;
      }
    }
  }
}

export function getDifficultyMultiplier(score: number): number {
  return Math.max(0, score / config.pipeInterval);
}
