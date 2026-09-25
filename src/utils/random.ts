export function seededRandom(seed: number): (max?: number) => number {
  let s = seed;

  return function (max: number = 1) {
    s = (s * 9301 + 49297) % 233280;
    return (s / 233280) * max;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
