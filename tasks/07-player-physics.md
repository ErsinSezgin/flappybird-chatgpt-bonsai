# Task 07: Implement player physics

Status: ✅ **DONE** — Pure functions in `src/game/physics/*.ts`.

## Files
- `src/game/physics/gravity.ts` — gravity calculation
- `src/game/physics/flap.ts` — flap impulse application
- `src/game/physics/player.ts` — player physics integration

## Pure Functions (testable without browser)
```typescript
// Gravity: increases downward velocity over delta time
function applyGravity(velocityY: number, dt: number): number

// Flap: applies upward impulse to current velocity
function applyFlapImpulse(velocityY: number): number

// Velocity integration: updates vertical position based on velocity
function updateVerticalVelocity(state, dt): newState

// Position integration: applies gravity + flap to bird position
function updateBirdPosition(birdY, birdVelocityY, dt): { y, velocityY }
```

## Key Design Decisions
- **Delta time**: All physics use `dt` (seconds), not frame count
- **Pure functions**: No side effects, same input = same output
- **Velocity clamping**: Maximum fall speed enforced
