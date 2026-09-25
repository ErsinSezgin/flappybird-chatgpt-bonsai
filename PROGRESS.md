# Flappy Bird — Progress Tracker

> **Last updated:** $(date +%Y-%m-%d %H:%M)
> **Next session start here:** Phase 6 — Collision and Scoring, Task 13: Add collision tests

---

## Quick Status Summary

| Phase | Tasks | Done / Total |
|-------|-------|-------------|
| 1 — Inspect & Bootstrap | #1, #2 | ✅ 2/2 |
| 2 — Architecture & Config | #3, #4 | ✅ 2/2 |
| 3 — Core Game Model | #5, #6 | ✅ 2/2 |
| 4 — Physics | #7, #8 | ⏳ 1/2 |
| 5 — Obstacles | #9, #10, #11 | ✅ 3/3 |
| 6 — Collision & Scoring | #12, #13, #14, #15 | ⏳ 2/4 |
| 7 — Difficulty | #16, #17 | ⏳ 1/2 |
| 8 — Input | #18, #19 | ⏳ 1/2 |
| 9 — Game Loop | #20, #21 | ⏳ 2/2 |
| 10 — Canvas Rendering | #22, #23, #24, #25, #26 | ⏳ 0/5 |
| 11 — UI & States | #27, #28, #29 | ⏳ 0/3 |
| 12 — Audio | #30 | ⏳ 0/1 |
| 13 — Integration Tests | #31, #32 | ⏳ 0/2 |
| 14 — E2E Tests | #33, #34, #35, #36 | ⏳ 0/4 |
| 15 — Polish & UX | #37, #38, #39 | ⏳ 0/3 |
| 16 — Validation | #40–#46 | ⏳ 0/7 |

**Overall:** ✅ 15 / 46 tasks complete · ⏳ 31 remaining

---

## What's Already Built (Existing Project)

### ✅ Infrastructure
- [x] `package.json` — npm project with Vite, Vitest, Playwright
- [x] `vite.config.ts` — port 8000, vitest globals
- [x] `tsconfig.json` — strict mode enabled

### ✅ Core Systems (Reused, partial tests needed)
| System | Files | Notes |
|--------|-------|-------|
| **Config** | `src/game/config/*.ts` | All magic numbers centralized ✅ |
| **Game States** | `src/game/state/*.ts` | ready/playing/gameOver transitions ✅ |
| **Game Session** | `src/game/bootstrap.ts` | GameEngine class with start/crash/restart ✅ |
| **Physics** | `src/game/physics/*.ts` | gravity, flap, velocity integration ✅ |
| **Obstacles/Pipes** | `src/game/entities/pipes/*.ts` | generation, movement, spawning ✅ |
| **Collision** | `src/game/collision/*.ts` | AABB, bird-pipe, boundaries ✅ |
| **Scoring** | `src/game/scoring/*.ts` | increment, tracking ✅ |
| **Difficulty** | `src/game/config/getDifficultyFactor.ts` | score-based progression ✅ |
| **Input** | `src/game/input/*.ts` | keyboard, pointer, touch ✅ |
| **Game Loop** | `src/game/bootstrap.ts` (GameEngine) | requestAnimationFrame loop ✅ |
| **Rendering** | `src/game/rendering/*.ts` | background, bird, pipes, particles ✅ |
| **UI** | `src/game/rendering/hud.ts`, `ui.ts` | HUD, ready screen, game over ✅ |

### ⏳ Still Needed
| Missing | Priority |
|---------|----------|
| Unit tests for physics, collision, scoring | High |
| Integration test (full flow) | High |
| Playwright E2E tests | Medium |
| Procedural audio (Web Audio API) | Low |
| Responsive canvas testing | Medium |
| Accessibility / UX polish | Low |
| Full validation pipeline (`npm run check`) | Medium |

---

## How to Continue from Here

```
1. Open this file (PROGRESS.md) at the top of each session
2. Find the "Next session start here" line
3. Open the corresponding task file (e.g., tasks/08-physics-tests.md)
4. Implement the work described in that task file
5. Mark tasks complete here and update "Next session start here"
```
