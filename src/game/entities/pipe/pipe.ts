export interface RenderableEntity {
  render(ctx: CanvasRenderingContext2D): void;
}

export class PipePair implements RenderableEntity {
  constructor(
    public x: number,
    public pair: PipePair,
    private glowColor?: string,
  ) {
  }

  render(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.pair.top.width, 0);
    gradient.addColorStop(0, '#1a3a4e');
    gradient.addColorStop(0.5, '#2d6b8a');
    gradient.addColorStop(1, '#1a3a4e');

    // Top pipe
    ctx.fillStyle = gradient;
    this.drawPipeBody(ctx, this.pair.top.x + this.x, this.pair.top.y,
      this.pair.top.width, this.pair.top.height);

    // Bottom pipe
    ctx.fillStyle = gradient;
    this.drawPipeBody(ctx, this.pair.bottom.x + this.x, this.pair.bottom.y,
      this.pair.bottom.width, this.pair.bottom.height);

    // Glow edges
    if (this.glowColor) {
      ctx.strokeStyle = this.glowColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = this.glowColor;
      ctx.shadowBlur = 8;
      this.drawPipeBody(ctx, this.pair.top.x + this.x, this.pair.top.y,
        this.pair.top.width, this.pair.top.height);
      ctx.shadowBlur = 0;
    }
  }

  private drawPipeBody(ctx: CanvasRenderingContext2D, x: number, y: number,
    width: number, height: number): void {
    const capHeight = 10;
    ctx.fillRect(x, y + capHeight, width, height - capHeight);
    // Cap
    ctx.fillStyle = '#0d2b3e';
    ctx.fillRect(x - 4, y + capHeight - 5, width + 8, capHeight);
    ctx.fillStyle = '#1a3a4e';
    ctx.fillRect(x, y + capHeight - 5, width, capHeight);
  }
}
