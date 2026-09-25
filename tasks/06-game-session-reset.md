# Task 06: Implement game session/reset model

Status: ✅ **DONE** — GameEngine class in `src/game/bootstrap.ts`.

## Game Session Model
```typescript
class GameEngine {
  // Core state
  state: GameState = 'ready';
  score: number;
  bestScore: number;

  // Player state
  birdY: number;
  birdVelocityY: number;
  
  // Obstacles
  pipes: MovingPipe[] = [];

  // Rendering
  canvasWidth, canvasHeight;
  particles: Particle[];

  // Methods
  init()        // Setup + start loop
  startGame()   // reset → ready→playing
  flap()        // apply flap impulse
  crash()       // playing→gameOver + save best score
  restart()     // gameOver→ready + full reset
  update(dt)    // physics, collision, scoring per frame
  render()      // draw everything on canvas
}
```

## Clean Reset Behavior
`startGame()` and `restart()` both fully reset:
- Score → 0
- Velocity → 0
- Bird position → start Y
- Pipes → empty array
- Particles → empty array
- State transition applied
