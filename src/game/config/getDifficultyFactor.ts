import { Random } from '../config/Random';

export function getDifficultyFactor(time: number): number {
  return Math.min(1 + time / 50, 3);
}
