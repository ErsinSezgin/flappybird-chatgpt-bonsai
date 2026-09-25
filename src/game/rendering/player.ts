import { GameState } from '../state';

export function renderPlayer(context: CanvasRenderingContext2D, state: GameState) {
  const { bird, canvasWidth } = state;

  // Draw the bird as a sleek sci-fi capsule
  const x = canvasWidth - 80;
  const y = bird.y;

  // Glow effect
  context.shadowColor = '#00ffff';
  context.shadowBlur = 20;

  // Main body - capsule shape
  const bodyWidth = 14;
  const bodyHeight = 20;

  // Body with gradient
  const bodyGrad = context.createLinearGradient(x - bodyWidth / 2, y - bodyHeight / 2, x + bodyWidth / 2, y + bodyHeight / 2);
  bodyGrad.addColorStop(0, '#aaffee');
  bodyGrad.addColorStop(0.5, '#ffffff');
  bodyGrad.addColorStop(1, '#aaffee');

  context.fillStyle = bodyGrad;
  roundRect(context, x - bodyWidth / 2, y - bodyHeight / 2, bodyWidth, bodyHeight, 4);
  context.fill();

  // Wing (flap indicator)
  const wingY = y - bird.velocity > 5 ? 4 : y + 3;
  context.fillStyle = '#00aaff';
  roundRect(context, x - bodyWidth / 2 - 6, wingY - 3, 10, 5, 3);
  context.fill();

  // Eye - glowing dot
  context.fillStyle = '#ff0066';
  context.beginPath();
  context.arc(x + bodyWidth / 2 - 1, y - 3, 2.5, 0, Math.PI * 2);
  context.fill();

  // Reset shadow
  context.shadowBlur = 0;
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + w - r, y);
  context.quadraticCurveTo(x + w, y, x + w, y + r);
  context.lineTo(x + w, y + h - r);
  context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  context.lineTo(x + r, y + h);
  context.quadraticCurveTo(x, y + h, x, y + h - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}
