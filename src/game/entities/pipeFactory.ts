import { PipeState } from "../types";

export function createPipe(
  x: number,
  gapY: number,
  gapHeight: number,
  width: number
): PipeState {
  return {
    x,
    gapY,
    gapHeight,
    width,
    passed: false,
  };
}
