export class GameTimer {
  private lastTime: number = 0;
  private accumulator: number = 0;

  constructor(private fixedDeltaTime: number) {}

  update(timestamp: number): void {
    if (this.lastTime === 0) {
      this.lastTime = timestamp;
      return;
    }

    const delta = (timestamp - this.lastTime) / 1000;
    this.accumulator += delta;
    this.lastTime = timestamp;

    while (this.accumulator >= this.fixedDeltaTime) {
      this.accumulator -= this.fixedDeltaTime;
    }
  }

  get elapsed(): number {
    return (Date.now() - this.lastTime) / 1000;
  }

  get accumulatorFraction(): number {
    return this.accumulator / this.fixedDeltaTime;
  }

  reset(): void {
    this.lastTime = 0;
    this.accumulator = 0;
  }
}
