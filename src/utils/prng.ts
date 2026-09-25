// ── Pseudo-Random Number Generator (deterministic for testing) ─

export class PRNG {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Math.random() * 0xFFFFFFFF;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  nextFrom(array: number[]): number {
    return array[Math.floor(this.next() * array.length)];
  }

  reset(seed: number): void {
    this.seed = seed;
  }
}
