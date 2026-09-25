# Task 04: Centralize configuration

Status: ✅ **DONE** — Configuration centralized in `src/game/config/*.ts`.

## Configuration File
`src/game/config/constants.ts`:

```typescript
const CONFIG = {
  canvasWidth: 400,
  canvasHeight: 600,
  gravity: 1800,
  flapImpulse: -500,
  groundHeight: 80,
  ceilingHeight: 20,
  pipeWidth: 56,
  pipeGapBase: 148,
  pipeSpeedBase: 200,
  pipeSpawnIntervalBase: 1800,
  maxPipeGap: 230,
  maxPipeSpeed: 450,
  maxSpawnInterval: 800,
  scoreScaleFactor: 1.25,
  difficultyTimeStep: 8000,
};
```

### Difficulty Progression
`src/game/config/getDifficultyFactor.ts`:
- Returns a multiplier based on score
- Affects pipe speed, gap size, spawn interval

### Tuning Magic Numbers
No hardcoded values in game logic. All tuning happens through the `CONFIG` object.
