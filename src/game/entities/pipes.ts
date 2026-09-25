import { defaultPipeConfig } from "../config";

const config = defaultPipeConfig;

export interface Pipe {
  x: number;
  gapCenterY: number;
  gapHeight: number;
  passed: boolean;
}

export function createPipe(width: number, height: number): Pipe {
  const gapHeight = Math.max(
    config.minGap,
    height - config.maxTopBottom - config.minGap
  );
  const gapCenterY = Math.max(
    config.minTopBottom + gapHeight / 2,
    height - config.minTopBottom - gapHeight / 2
  );
  return {
    x: width + config.width,
    gapCenterY,
    gapHeight,
    passed: false,
  };
}

export function movePipe(pipe: Pipe, dt: number): void {
  pipe.x -= config.speed * dt;
}

export function removePipe(pipe: Pipe, width: number): boolean {
  return pipe.x + config.width < -config.width;
}
