import type { GameState } from '../core/state';

export function setupCanvas(context: CanvasRenderingContext2D, width: number, height: number) {
  context.clearRect(0, 0, width, height);
}

export function drawBackground(context: CanvasRenderingContext2D, state: GameState) {
  const { canvasWidth, canvasHeight } = state;

  // Deep space gradient
  const grad = context.createLinearGradient(0, 0, 0, canvasHeight);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#0d0d2b');
  grad.addColorStop(1, '#1a0a2e');
  context.fillStyle = grad;
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  // Subtle grid lines
  context.strokeStyle = 'rgba(0, 255, 255, 0.03)';
  context.lineWidth = 1;

  // Vertical perspective lines
  const vanishingX = canvasWidth / 2;
  for (let i = -3; i <= 3; i++) {
    const x = vanishingX + i * (canvasWidth / 6);
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + i * 20, canvasHeight);
    context.stroke();
  }

  // Horizontal lines (depth)
  for (let y = 0; y < canvasHeight - state.groundY; y += 40) {
    const width = Math.max(10, canvasWidth * (1 - y / state.canvasHeight) * 0.8);
    const x = (canvasWidth - width) / 2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width, y);
    context.stroke();
  }

  // Stars / particles
  context.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 50; i++) {
    const sx = (i * 137.5) % canvasWidth;
    const sy = (i * 97.3) % state.groundY;
    const size = 0.5 + (i % 3) * 0.5;
    context.beginPath();
    context.arc(sx, sy, size, 0, Math.PI * 2);
    context.fill();
  }
}
