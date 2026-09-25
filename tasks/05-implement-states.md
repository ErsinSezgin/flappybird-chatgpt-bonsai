# Task 05: Implement game states

Status: ✅ **DONE** — State machine implemented.

## Files Created
- `src/game/state/constants.ts` — Enums: Ready, Playing, GameOver
- `src/game/state/types.ts` — GameState type union + GameState enum
- `src/game/state/transitions.ts` — Allowed transitions map
- `src/game/state/manager.ts` — State management functions

## State Transitions
```
ready     ──start──▶ playing    ──collision──▶ gameOver
  ▲                                   │
  └──────── restart ◄────────────────┘
```

## Valid Transitions
| From | To | Trigger |
|------|----|---------|
| ready | playing | Space / click / tap |
| playing | gameOver | Collision detected |
| gameOver | ready | Space / click / tap (restart) |

## Invalid Transitions
- ready → gameOver (blocked)
- playing → ready (blocked)
- gameOver → playing (blocked — must go through ready first)
