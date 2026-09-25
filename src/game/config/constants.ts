export const Config = Object.freeze({
  // Canvas
  canvasWidth: 400,
  canvasHeight: 600,

  // Physics
  gravity: 18,
  flapImpulse: -7.5,
  maxVelocity: 10,
  terminalVelocity: 8,

  // Player/Bird
  playerSize: 20,
  playerXRatio: 0.25,

  // Pipes
  pipeWidth: 60,
  pipeGap: 145,
  pipeSpeed: 2.5,
  pipeSpawnInterval: 1800, // ms
  minPipeHeight: 60,

  // Ground
  groundHeight: 40,
  groundSpeed: 2.5,

  // Scoring
  initialDifficulty: 1.0,
  difficultyIncreasePerScore: 0.05,
  maxDifficulty: 1.8,

  // Timing
  fixedTimeStep: 1000 / 60,
}) as const;

export type Config = typeof Config;
