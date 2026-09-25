# Task 08: Add physics tests

Status: ⏳ **NOT STARTED**

## Goal
Test all pure physics functions deterministically without a browser.

## Test Cases
| Test | Expected |
|------|----------|
| gravity increases downward velocity | `applyGravity(0, dt)` returns negative value |
| flap produces upward velocity | `applyFlapImpulse(0)` returns positive impulse value |
| flap on existing upward velocity | Adds to current velocity (capped) |
| position changes according to dt | `updateVerticalVelocity(y, v, dt)` → `y + v * dt` |
| physics consistent with different frame intervals | Same result regardless of dt value used to reach same state |
| velocity capped at max fall speed | Velocity never exceeds `CONFIG.maxFallSpeed` |
| gravity + flap net effect | Flap counteracts gravity appropriately |

## Where to Write Tests
```
tests/unit/physics/
├── gravity.test.ts     — gravity function tests
├── flap.test.ts        — flap impulse tests
└── integration.test.ts  — full physics pipeline
```
