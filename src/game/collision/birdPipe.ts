import { Bird, BIRD_RADIUS } from "../entities/bird";
import type { Pipe } from "../entities/pipes";
import config from "../config";
import { AABBoverlap, type AABB } from "./aabb";

export function checkBirdPipeCollision(
  bird: Bird,
  pipe: Pipe
): boolean {
  const birdBox: AABB = {
    x: bird.x - BIRD_RADIUS,
    y: bird.y - BIRD_RADIUS,
    width: BIRD_RADIUS * 2,
    height: BIRD_RADIUS * 2,
  };

  const topPipeBox: AABB = {
    x: pipe.x,
    y: 0,
    width: config.width,
    height: pipe.gapCenterY - pipe.gapHeight / 2,
  };

  const bottomPipeBox: AABB = {
    x: pipe.x,
    y: pipe.gapCenterY + pipe.gapHeight / 2,
    width: config.width,
    height: config.height - (pipe.gapCenterY + pipe.gapHeight / 2),
  };

  return AABBoverlap(birdBox, topPipeBox) || AABBoverlap(birdBox, bottomPipeBox);
}
