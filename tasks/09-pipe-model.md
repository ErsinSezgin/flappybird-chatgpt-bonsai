# Task 09: Implement pipe/gate model

Status: ✅ **DONE** — Data models in `src/game/entities/pipes/*.ts`.

## Obstacle Representation
```typescript
interface Pipe {
  x: number;          // Horizontal position
  gapCenter: number;  // Vertical center of the gap
  width: number;      // Pipe width
  scored: boolean;    // Has this pipe been passed?
}

interface MovingPipe extends Pipe {
  speed: number;      // Current horizontal move speed
}
```

## Key Design Decisions
- **Data-only model**: Pipes contain only gameplay data, no rendering behavior
- **Scored flag**: Prevents double-scoring the same pipe
- **Speed field**: Allows variable speed based on difficulty

## Files
- `src/game/entities/pipes/pipe.ts` — Pipe interface types
- `src/game/entities/pipes/generate.ts` — Gap generation logic
