import { PIPE_SPEED_BASE, PIPE_MAX_SPEED } from './constants';

export function calculatePipeSpeed(score: number): number {
  return Math.min(PIPE_MAX_SPEED, PIPE_SPEED_BASE + score * 0.03);
}
