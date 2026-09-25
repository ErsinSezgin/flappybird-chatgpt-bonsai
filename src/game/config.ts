import { GameState, PipeState } from "./state/types";

export const CONFIG = Object.freeze({
  gameWidth: 400,
  gameHeight: 600,

  gravity: 0.45,
  flapImpulse: -7.5,

  pipeWidth: 60,
  pipeGap: 145,
  pipeSpeed: 2.5,
  pipeSpawnRate: 90,

  groundHeight: 40,

  maxVelocityY: 12,
});
