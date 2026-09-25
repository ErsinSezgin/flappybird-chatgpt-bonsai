export interface PipePair {
  top: Rectangle;
  bottom: Rectangle;
}

export function createPipePair(gapCenterY: number, gapHeight: number): PipePair {
  const pipeWidth = 50;
  const gapTopY = gapCenterY - gapHeight / 2;
  return {
    top: { x: 0, y: 0, width: pipeWidth, height: gapTopY },
    bottom: { x: 0, y: gapCenterY + gapHeight / 2, width: pipeWidth, height: 100 },
  };
}
