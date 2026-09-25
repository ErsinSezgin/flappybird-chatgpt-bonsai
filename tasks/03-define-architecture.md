# Task 03: Define project architecture

Status: ✅ **DONE** — Architecture already exists.

## Existing Directory Structure

```
src/
├── game/
│   ├── bootstrap.ts          # GameEngine class — main loop
│   ├── config/               # Centralized configuration ✅
│   │   ├── constants.ts      # All magic numbers
│   │   └── getDifficultyFactor.ts
│   ├── core/                 # Game engine types & classes ✅
│   │   ├── game.ts           # Main game class
│   │   └── types.ts          # Core type definitions
│   ├── collision/            # Collision detection ✅
│   │   ├── aabb.ts           # Axis-aligned bounding boxes
│   │   └── birdPipe.ts       # Bird vs pipe collision
│   ├── entities/             # Game entity factories ✅
│   │   ├── birdFactory.ts    # Bird creation
│   │   └── pipes/            # Pipe generation & movement
│   ├── physics/              # Pure physics functions ✅
│   │   └── gravity.ts        # Gravity calculation
│   ├── rendering/            # Canvas renderers ✅
│   │   ├── background.ts     # Space environment
│   │   └── bird.ts           # Player renderer
│   ├── state/                # State machine ✅
│   │   └── transitions.ts    # State transition logic
│   ├── scoring/              # Score tracking ✅
│   └── input/                # Input abstraction ✅
├── utils/                    # Shared utilities
│   └── prng.ts               # Pseudo-random number generator
└── test/                     # Test setup
    └── setup.ts              # Canvas polyfill, mock timers
```

## Module Responsibilities
- **Config**: All game tuning parameters (gravity, speeds, dimensions)
- **Physics**: Pure functions for gravity, flap, velocity integration
- **Entities**: Data models + factories for birds and pipes
- **Collision**: Pure collision detection (AABB, boundaries)
- **Scoring**: Score increment tracking
- **State**: Enum + state machine (ready → playing → gameOver)
- **Input**: Unified `flap()` command interface
- **Rendering**: Canvas-based renderers (read-only on game state)
- **Bootstrap**: Main GameEngine class tying everything together
