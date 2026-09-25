// ── UI Overlays (rendered on canvas) ─────────────────────────

import { config } from '../config';
import type { GameState, GameSnapshot } from '../../game/state';

export function renderReadyScreen(ctx: CanvasRenderingContext2D, width: number): void {
  // Title
  ctx.save();
  
  const title = 'NEON FLAPPY';

  // Title glow
  ctx.shadowColor = '#00ffda';
  ctx.shadowBlur = 30;

  // Title background bar
  const titleH = 80;
  const titleY = width * 0.35 - titleH / 2;

  ctx.fillStyle = 'rgba(10, 30, 50, 0.85)';
  ctx.strokeStyle = '#00ffda';
  ctx.lineWidth = 2;

  const radius = 12;
  const titleW = width * 0.45;
  const panelX = (width - titleW) / 2;

  ctx.beginPath();
  ctx.moveTo(panelX + radius, titleY);
  ctx.lineTo(panelX + titleW - radius, titleY);
  ctx.quadraticCurveTo(panelX + titleW, titleY, panelX + titleW, titleY + radius);
  ctx.lineTo(panelX + titleW, titleY + titleH - radius);
  ctx.quadraticCurveTo(panelX + titleW, titleY + titleH, panelX + titleW - radius, titleY + titleH);
  ctx.lineTo(panelX + radius, titleY + titleH);
  ctx.quadraticCurveTo(panelX, titleY + titleH, panelX, titleY + titleH - radius);
  ctx.lineTo(panelX, titleY + radius);
  ctx.quadraticCurveTo(panelX, titleY, panelX + radius, titleY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Title text
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(title, width / 2, titleY + titleH / 2 - 10);

  // Subtitle
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#00ffdaaa';
  ctx.font = '16px "Courier New", monospace';
  ctx.fillText('PRESS SPACE • CLICK • TOUCH TO START', width / 2, titleY + titleH - 10);

  ctx.restore();
}

export function renderGameOverScreen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  snapshot: GameSnapshot
): void {
  const isGameOver = snapshot.state === 'gameOver';

  ctx.save();

  // Dark overlay
  ctx.fillStyle = 'rgba(5, 10, 20, 0.7)';
  ctx.fillRect(0, 0, width, height);

  // Game Over panel
  const panelW = Math.min(380, width * 0.5);
  const panelH = 240;
  const panelX = (width - panelW) / 2;
  let panelY = height * 0.3;

  const isGameOverState = snapshot.state === 'gameOver';

  // Panel background
  ctx.fillStyle = 'rgba(10, 25, 45, 0.9)';
  ctx.strokeStyle = isGameOverState ? '#ff66aa' : '#00ffda';
  ctx.lineWidth = 2;

  const radius = 16;
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

  // Game Over title
  if (isGameOverState) {
    ctx.shadowColor = '#ff66aa';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ff66aa';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'center';

    // Glitch effect
    const glitchOffset = Math.random() * 3 - 1.5;

    ctx.fillText('GAME OVER', width / 2 + glitchOffset, panelY + 45);
    ctx.fillText('GAME OVER', width / 2 - glitchOffset, panelY + 45);
    ctx.shadowBlur = 0;

    // Score
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px "Courier New", monospace';
    ctx.fillText(`SCORE: ${snapshot.score}`, width / 2, panelY + 90);

    // Best
    ctx.fillStyle = '#ff66aacc';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText(`BEST: ${snapshot.bestScore}`, width / 2, panelY + 110);

    // New high score indicator
    if (snapshot.score === snapshot.bestScore && snapshot.score > 0) {
      ctx.fillStyle = '#ffff00';
      ctx.font = 'bold 14px "Courier New", monospace';
      const pulse = Math.sin(Date.now() * 0.01) * 3 + 7;
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = pulse;
      ctx.fillText('★ NEW HIGH SCORE ★', width / 2, panelY + 135);
      ctx.shadowBlur = 0;
    }

    // Restart instruction
    ctx.fillStyle = '#ffffffaa';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText('PRESS SPACE • CLICK TO RESTART', width / 2, panelY + panelH - 35);
  } else {
    // Ready state (showing during gameplay)
    ctx.shadowColor = '#00ffda';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'center';

    ctx.fillText('READY!', width / 2, panelY + 45);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#00ffdaaa';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText('FLAP TO FLY', width / 2, panelY + 85);
    ctx.fillText('AVOID THE PIPES', width / 2, panelY + 105);
    ctx.fillText('PRESS SPACE • CLICK TO START', width / 2, panelY + 135);
  }

  ctx.restore();
}
