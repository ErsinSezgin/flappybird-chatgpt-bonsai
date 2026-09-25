// ── HUD Rendering ───────────────────────────────────────────────

import { config } from '../config';

export interface HUDState {
  score: number;
  bestScore: number;
}

export function renderHUD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  hud: HUDState
): void {
  // Score display (top center)
  const scoreText = `SCORE: ${hud.score}`;

  // Score glow
  ctx.shadowColor = '#00ffda';
  ctx.shadowBlur = 15;

  // Score background panel
  const panelW = 200;
  const panelH = 48;
  const panelX = (width - panelW) / 2;
  const panelY = 30;

  ctx.fillStyle = 'rgba(10, 25, 40, 0.8)';
  ctx.strokeStyle = '#00ffda50';
  ctx.lineWidth = 1;

  // Rounded panel
  const radius = 8;
  ctx.beginPath();
  ctx.moveTo(panelX + radius, panelY);
  ctx.lineTo(panelX + panelW - radius, panelY);
  ctx.quadraticCurveTo(panelX + panelW, panelY, panelX + panelW, panelY + radius);
  ctx.lineTo(panelX + panelW, panelY + panelH - radius);
  ctx.quadraticCurveTo(panelX + panelW, panelY + panelH, panelX + panelW - radius, panelY + panelH);
  ctx.lineTo(panelX + radius, panelY + panelH);
  ctx.quadraticCurveTo(panelX, panelY + panelH, panelX, panelY + panelH - radius);
  ctx.lineTo(panelX, panelY + radius);
  ctx.quadraticCurveTo(panelX, panelY, panelX + radius, panelY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Score text
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#00ffda';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(scoreText, width / 2, panelY + panelH / 2 + 10);

  // Best score
  const bestText = `BEST: ${hud.bestScore}`;
  ctx.shadowColor = '#ff66aa';
  ctx.fillStyle = '#ff66aa80';
  ctx.font = '14px "Courier New", monospace';
  ctx.fillText(bestText, width / 2, panelY + panelH - 8);
}
