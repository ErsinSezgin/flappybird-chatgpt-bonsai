import { GameState } from "../types";

export function updateScore(
  state: GameState,
  bird: BirdState,
  pipes: PipeState[]
): void {
  for (const pipe of pipes) {
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      pipe.passed = true;
      state.score++;
    }
  }
}

export function resetScore(state: GameState): void {
  state.score = 0;
}
