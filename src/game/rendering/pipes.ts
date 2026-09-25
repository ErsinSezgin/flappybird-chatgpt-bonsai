// ── Pipe Rendering ─────────────────────────────────────────────

import { config } from '../config';
import type { Pipe } from '../entities/pipes/generate';

export function renderPipe(
  ctx: CanvasRenderingContext2D,
  pipe: Pipe,
  screenHeight: number
): void {
  const halfW = config.pipeWidth / 2;
  const gapTop = pipe.gapCenter - config.minGap / 2;
  const gapBottom = pipe.gapCenter + config.minGap / 2;

  // Top pipe
  drawPipeSegment(ctx, pipe.x - halfW, 0, config.pipeWidth, gapTop, true);

  // Bottom pipe
  drawPipeSegment(ctx, pipe.x - halfW, gapBottom, config.pipeWidth, screenHeight - gapBottom, false);
}

function drawPipeSegment(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  isTop: boolean
): void {
  // Pipe body with neon gradient
  const grad = ctx.createLinearGradient(x, 0, x + w, 0);
  grad.addColorStop(0, '#1a3a5c');
  grad.addColorStop(0.3, '#2a6b8f');
  grad.addColorStop(0.7, '#2a6b8f');
  grad.addColorStop(1, '#1a3a5c');

  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  // Neon edge glow
  const glowColor = isTop ? '#00ccff' : '#ff66aa';
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y, w, h);

  // Edge glow effect (wider, more transparent)
  ctx.strokeStyle = glowColor + '60'; // Add alpha
  ctx.lineWidth = 8;
  ctx.strokeRect(x - 2, y, w + 4, h);

  // Top cap (for top pipes)
  if (isTop && h < screenHeight * 0.7) {
    const capH = config.pipeWidth / 2;
    drawPipeCap(ctx, x - 3, y + h - capH, w + 6, capH, true);
  }

  // Bottom cap (for bottom pipes)
  if (!isTop && h < screenHeight * 0.7) {
    const capH = config.pipeWidth / 2;
    drawPipeCap(ctx, x - 3, y + capH, w + 6, capH, false);
  }

  // Highlight line on pipe body
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(x + w * 0.35, y, w * 0.1, h);
}

function drawPipeCap(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  isTop: boolean
): void {
  const glowColor = isTop ? '#00ccff' : '#ff66aa';

  // Cap body
  const grad = ctx.createLinearGradient(x, 0, x + w, 0);
  grad.addColorStop(0, '#1a3a5c');
  grad.addColorStop(0.25, '#2a6b8f');
  grad.addColorStop(0.75, '#2a6b8f');
  grad.addColorStop(1, '#1a3a5c');

  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  // Cap glow
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y, w, h);

  // Cap glow effect
  ctx.strokeStyle = glowColor + '60';
  ctx.lineWidth = 6;
  ctx.strokeRect(x - 2, y, w + 4, h);

  // Cap highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fillRect(x + w * 0.35, y, w * 0.12, h);
}
