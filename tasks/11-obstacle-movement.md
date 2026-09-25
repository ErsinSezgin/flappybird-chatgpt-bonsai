
# 11 — obstacle movement

**Status:** ✅ Done
**Description:** Implement deterministic horizontal scrolling for all obstacles (pipes and ground) with difficulty-based speed ramping.

## Scope
- **Pipe movement**: Move all active pipes leftward at a constant speed each tick, using the `movePipes()` function
- **Speed calculation**: Base speed from config (`pipeBaseSpeed: 2.5`) with optional difficulty multiplier
- **Ground scrolling**: Move the ground surface leftward at `groundSpeed` for visual motion feedback
- **Cleanup**: Remove pipes that have scrolled completely off-screen (past `x + width < 0`)

## Dependencies
- Task 09: Pipe/gate model — `Pipe` interface with `x`, `gapCenter`, `scored` fields
- Task 10: Deterministic gap generation — PrNG-based pipe spawning provides consistent layouts

## Implementation Details
- **`movePipes()`** in `src/game/entities/pipes/move.ts`:
  - Takes an array of `MovingPipe` objects and a delta-time (`dt`)
  - Computes effective speed: `clamp(baseSpeed + difficultyRamp * scoreMultiplier, min, max)`
  - Iterates all pipes and applies `pipe.x -= speed * dt` (leftward movement)
- **Speed ramping**: Speed increases with score via `difficultyRampPerScore` (0.05 per point), capped at `maxPipeSpeed`
- **Ground movement**: Handled in the rendering layer — background scrolls at `config.groundSpeed` each frame

## Acceptance criteria
- [x] Pipes move leftward at a consistent, configurable speed per tick
- [x] Speed increases proportionally with score multiplier (difficulty scaling)
- [x] Speed is clamped between `pipeBaseSpeed` and `maxPipeSpeed`
- [x] Off-screen pipes are removed from the active list after they scroll past the left edge
- [x] Ground scrolls at `config.groundSpeed` for visual motion

## Files
- `src/game/entities/pipes/move.ts` — Core pipe movement function with speed clamping
- `src/game/config/constants.ts` — Speed constants (`pipeBaseSpeed`, `maxPipeSpeed`, `groundSpeed`)
