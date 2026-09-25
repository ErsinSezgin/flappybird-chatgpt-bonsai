import { Random } from '../Random';

export function generatePipeGap(y: number): number {
  return y + Random.intBetween(80, 160);
}
