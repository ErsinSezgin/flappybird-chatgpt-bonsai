import { GameState, gameStateTransitions } from '../state';

export function applyStateTransition(current: GameState, next: GameState): void {
  gameStateTransitions.get(`${current} -> ${next}`)?.();
}
