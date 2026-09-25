import { BirdState } from "../types";

export function createBird(
  x: number,
  y: number
): BirdState {
  return {
    x,
    y,
    velocityX: 0,
    velocityY: 0,
    radius: 14,
    rotation: 0,
    flapTimer: 0,
  };
}
