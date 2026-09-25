# Task 10: Implement deterministic gap generation

Status: ✅ **DONE** — Seeded PRNG in `src/utils/prng.ts`.

## Gap Generation
```typescript
// Seeded pseudo-random number generator (deterministic)
class PRNG {
  seed: number;
  next(): number      // Next random [0, 1)
  nextFloat(min: n, max: m): number // Next random in range
}

// Deterministic pipe gap generation
function generatePipeGap(prng: PRNG, canvasHeight: number): Pipe {
  // Uses seeded PRNG to generate consistent layouts for testing
}
```

## Test Support
- **Seeded generation**: Same seed = same layout every time
- **Configurable range**: Can set min/max gap positions for edge cases

## Files
- `src/utils/prng.ts` — PRNG implementation
- `src/game/entities/pipes/generate.ts` — Pipe generation logic
