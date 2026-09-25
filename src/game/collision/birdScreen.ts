import config from "../config";

export function isBirdOutOfBounds(
  birdX: number,
  birdY: number,
  radius: number = BIRD_RADIUS
): boolean {
  return birdY + radius > config.height || birdY - radius < 0;
}
