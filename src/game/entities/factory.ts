import type { Pipe, Player } from './types';
import type { GameConfig } from '../config/config';

export function createPipe(x: number, gapCenter: number, config: GameConfig): Pipe {
  const pipeWidth = config.pipeWidth;
  const gapSize = config.gapSize;
  return {
    x,
    topHeight: gapCenter - gapSize / 2,
    bottomY: gapCenter + gapSize / 2,
    width: pipeWidth,
    passed: false
  };
}

export function createPlayer(canvasHeight: number): Player {
  return {
    x: canvasWidth / 2, // Will be set at runtime based on canvas
    y: canvasHeight / 2,
    width: config.playerSize,
    height: config.playerSize * 0.8,
    radius: config.playerSize / 2
  };
}
