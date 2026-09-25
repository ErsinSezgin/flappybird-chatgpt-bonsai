// ── Pipe Generation ───────────────────────────────────────────

import { config } from '../config';
import { randInt, clamp } from '../../utils/math';
import type { PRNG } from '../../utils/prng';

export interface Pipe {
  x: number;
  gapCenter: number;
  scored: boolean;
}

export function generatePipe(width: number, prng: PRNG): Pipe {
  const gapCenter = clamp(
    prng.nextFloat(width * 0.15, width * 0.85),
    config.minGap / 2 + config.pipeWidth / 2,
    width - (config.minGap / 2 + config.pipeWidth / 2)
  );

  return { x: width, gapCenter, scored: false };
}
