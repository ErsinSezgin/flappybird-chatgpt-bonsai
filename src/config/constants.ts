// src/config/constants.ts - Centralized game configuration

export const CONFIG = Object.freeze({
  // Canvas & viewport
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 800,

  // Physics (frame-rate independent)
  GRAVITY: 980,           // px/s²
  FLAP_VELOCITY: -350,    // px/s upward impulse
  MAX_FALL_SPEED: 800,    // px/s terminal velocity
  PIPE_SPEED: 150,       // px/s obstacle movement

  // Pipe / obstacle
  PIPE_WIDTH: 120,        // px
  PIPE_GAP_SIZE: 180,     // px vertical gap between obstacles
  PIPE_SPAWN_INTERVAL: 2.5,  // seconds between pipe spawns

  // Player / bird
  PLAYER_WIDTH: 32,       // px
  PLAYER_HEIGHT: 24,      // px

  // Scoring
  INITIAL_SCORE: 0,
  SCORE_INCREMENT: 1,

  // Difficulty progression
  MIN_PIPE_GAP: 140,      // px smallest gap at high difficulty
  GAP_REDUCTION_RATE: 2,  // px per score increment

  // Timing (seconds)
  GAME_OVER_DELAY: 1.5,   // time before restart button appears
}) as const;
