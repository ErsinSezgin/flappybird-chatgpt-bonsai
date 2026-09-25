// ── Game State Types & Transitions ────────────────────────────

export type GameState = 'ready' | 'playing' | 'gameOver';

export interface GameSnapshot {
  state: GameState;
  score: number;
  bestScore: number;
}

export const validTransitions = Object.freeze({
  ready: ['playing', 'ready'],
  playing: ['gameOver', 'playing'],
  gameOver: ['ready', 'playing'],
});

export function canTransition(from: GameState, to: GameState): boolean {
  return validTransitions[from]?.includes(to) ?? false;
}

export function transition(state: GameState, target: GameState): GameState {
  if (!canTransition(state, target)) {
    throw new Error(`Invalid state transition: ${state} → ${target}`);
  }
  return target;
}

export function resetState(): GameSnapshot {
  return { state: 'ready' as GameState, score: 0, bestScore: 0 };
}
