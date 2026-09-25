// ── Bird Rendering ─────────────────────────────────────────────

import { config } from '../config';
import type { Vec2 } from '../../utils/math';

interface BirdRenderState {
  x: number;
  y: number;
  angle: number;
  wingPhase: number;
}

export function renderBird(ctx: CanvasRenderingContext2D, bird: BirdRenderState): void {
  const size = config.birdSize;

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate(bird.angle);

  // Outer glow
  const glowGrad = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size);
  glowGrad.addColorStop(0, 'rgba(0, 255, 210, 0.3)');
  glowGrad.addColorStop(1, 'rgba(0, 255, 210, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(-size, -size, size * 2, size * 2);

  // Body (neon cyan rounded shape)
  ctx.fillStyle = '#00ffda';
  ctx.strokeStyle = '#00ffaa';
  ctx.lineWidth = 2;

  // Draw rounded bird body
  const r = size * 0.45;
  ctx.beginPath();
  ctx.moveTo(-r, -r * 0.6);
  ctx.lineTo(r * 0.3, -r * 0.8);
  ctx.quadraticCurveTo(r, -r * 0.3, r * 0.6, r * 0.2);
  ctx.quadraticCurveTo(r, r * 0.4, r * 0.3, r * 0.6);
  ctx.lineTo(-r * 0.5, r * 0.4);
  ctx.quadraticCurveTo(-r, r * 0.2, -r, 0);
  ctx.quadraticCurveTo(-r, -r * 0.2, -r * 0.5, -r * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner highlight
  const innerGrad = ctx.createRadialGradient(-r * 0.2, -r * 0.15, r * 0.1, -r * 0.2, -r * 0.15, r * 0.4);
  innerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  innerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = innerGrad;
  ctx.fill();

  // Eye (glowing)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(r * 0.15, -r * 0.2, r * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Pupil (neon)
  ctx.fillStyle = '#003344';
  ctx.beginPath();
  ctx.arc(r * 0.2, -r * 0.18, r * 0.09, 0, Math.PI * 2);
  ctx.fill();

  // Wing (animated)
  const wingY = Math.sin(bird.wingPhase) * r * 0.35;
  ctx.fillStyle = '#00ccaa';
  ctx.strokeStyle = '#00ffdd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-r * 0.3, r * 0.1 + wingY, r * 0.45, r * 0.25, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Engine glow (tail)
  const engineGrad = ctx.createRadialGradient(-r * 0.5, r * 0.1, 0, -r * 0.6, r * 0.1, r * 0.3);
  engineGrad.addColorStop(0, 'rgba(255, 140, 0, 0.6)');
  engineGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');
  ctx.fillStyle = engineGrad;
  ctx.fillRect(-r * 1.2, r * -0.15, r * 0.6, r * 0.3);

  ctx.restore();
}
