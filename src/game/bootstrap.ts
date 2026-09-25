// ── Game Bootstrap & Loop ───────────────────────────────────────

import { config } from './config';
import { GameState, transition, resetState } from './state';
import { updateBirdVertical, type BirdState } from './physics/bird';
import { applyFlapImpulse } from './physics/flap';
import { generatePipe, type Pipe } from './entities/pipes/generate';
import { movePipes, type MovingPipe } from './entities/pipes/move';
import { checkCollisions, createBirdBox, type CollisionBox } from './collision';
import { incrementScore, getDifficultyMultiplier } from './scoring';
import { setupKeyboardInput, setupPointerInput, setupTouchInput } from './input';
import { renderBackground, type BackgroundRenderer } from './rendering/background';
import { renderBird, type BirdRenderState } from './rendering/bird';
import { renderPipe } from './rendering/pipes';
import { renderHUD, type HUDState } from './rendering/hud';
import { renderReadyScreen, renderGameOverScreen } from './rendering/ui';
import { createParticles, updateParticles, renderParticles, type Particle } from './rendering/particles';
import { PRNG } from '../utils/prng';

class GameEngine {
  private state: GameState = 'ready';
  private score: number = 0;
  private bestScore: number = 0;

  // Bird state
  birdY: number = 0;
  birdVelocityY: number = 0;
  birdAngle: number = 0;
  birdWingPhase: number = 0;

  // Pipes & scoring
  pipes: MovingPipe[] = [];
  scoreMultiplier: number = 0;

  // Rendering
  canvasWidth: number = 800;
  canvasHeight: number = 600;
  background: BackgroundRenderer = {} as any;
  particles: Particle[] = [];

  // Timing
  lastFrameTime = 0;
  pipeTimer = 50;

  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;

  // Input handlers
  private cleanupInputHandlers: (() => void)[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    // Setup input handlers
    const onFlap = () => {
      if (this.state === 'ready') {
        this.startGame();
      } else if (this.state === 'playing') {
        this.flap();
      } else if (this.state === 'gameOver') {
        this.restart();
      }
    };

    const kbCleanup = setupKeyboardInput(onFlap);
    const ptCleanup = setupPointerInput(onFlap);
    const touchCleanup = setupTouchInput(onFlap);

    this.cleanupInputHandlers.push(kbCleanup, ptCleanup, touchCleanup);
  }

  init(): void {
    if (!this.canvas || !this.ctx) return;

    this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
    window.addEventListener('resize', () => {
      const w = this.canvas?.clientWidth;
      const h = this.canvas?.clientHeight;
      if (w && h) {
        this.resize(w, h);
      }
    });

    this.loop(0);
  }

  private resize(w: number, h: number): void {
    if (!this.canvas || !this.ctx) return;

    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    if (!this.background.stars) {
      this.background = createBackground(w, h);
    } else {
      const oldStars = (this.background as any).stars;
      this.background.stars = oldStars.map((s: any) => ({
        ...s,
        x: Math.random() * w,
        y: Math.random() * h,
      }));
    }

    this.canvasWidth = w;
    this.canvasHeight = h;

    // Reset bird position to start of screen
    const birdStartY = config.birdStartY * h;
    if (this.state === 'ready' || this.state === 'gameOver') {
      this.birdY = birdStartY;
    }
  }

  startGame(): void {
    this.state = transition(this.state, 'playing');
    const birdStartY = config.birdStartY * this.canvasHeight;
    this.birdY = birdStartY;
    this.birdVelocityY = 0;
    this.pipes = [];
    this.score = 0;
    this.scoreMultiplier = 0;
    this.particles = [];
    this.pipeTimer = 50; // Initial pipe delay
  }

  flap(): void {
    this.birdVelocityY = applyFlapImpulse(this.birdVelocityY);

    // Flap particles
    this.particles = [...this.particles, ...createParticles(this.canvasWidth * 0.25, this.birdY || 0, 4, '#00ffda')];
  }

  crash(): void {
    this.state = transition(this.state, 'gameOver');

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }

    // Crash particles
    this.particles = [...this.particles, ...createParticles(this.canvasWidth * 0.25, this.birdY || 0, 30, '#ff66aa')];
  }

  restart(): void {
    this.state = transition(this.state, 'ready');
    const birdStartY = config.birdStartY * this.canvasHeight;
    this.birdY = birdStartY;
    this.birdVelocityY = 0;
    this.pipes = [];
    this.score = 0;
    this.scoreMultiplier = 0;
    this.particles = [];
    this.pipeTimer = 50;
  }

  update(dt: number): void {
    // Bird physics (always, even in ready state for floating effect)
    if (this.state === 'ready') {
      // Gentle float in ready state
      this.birdY += Math.sin(Date.now() * 0.003) * 0.5;
      this.birdWingPhase += dt * 4;
    } else if (this.state === 'playing') {
      updateBirdVertical({ y: this.birdY, velocityY: this.birdVelocityY }, dt);
      this.birdAngle = Math.min(Math.max(this.birdVelocityY * 0.1, -Math.PI / 4), Math.PI / 2);
      this.birdWingPhase += dt * 8;

      // Pipe generation timer
      const scoreMult = getDifficultyMultiplier(this.score);
      this.pipeTimer -= dt;

      if (this.pipeTimer <= 0) {
        const prng = new PRNG(this.score * 42 + this.bestScore);
        this.pipes.push({
          x: this.canvasWidth,
          gapCenter: prng.nextFloat(this.canvasHeight * 0.25, this.canvasHeight * 0.75),
          scored: false,
          speed: config.pipeBaseSpeed + scoreMult * 5,
        });

        this.pipeTimer = config.pipeInterval - Math.min(scoreMult * 10, 40);
      }

      // Move pipes
      movePipes(this.pipes, dt, this.scoreMultiplier);

      // Update score multiplier
      this.scoreMultiplier = getDifficultyMultiplier(this.score);

      // Remove off-screen pipes
      this.pipes = this.pipes.filter(p => p.x + config.pipeWidth > -10);

      // Check collisions
      const birdBox = createBirdBox(config.birdSize, this.canvasWidth * 0.25, this.birdY || 0);
      if (checkCollisions(birdBox, this.pipes as Pipe[], this.canvasWidth, this.canvasHeight)) {
        this.crash();
      }

      // Update score
      const birdX = this.canvasWidth * 0.25;
      incrementScore({ score: this.score, bestScore: this.bestScore }, this.pipes as Pipe[], birdX + config.birdSize / 2);
      // Score is updated in place

      // Update particles
      updateParticles(this.particles, dt);
    } else if (this.state === 'gameOver') {
      // Bird falls after crash
      this.birdVelocityY = applyGravity(this.birdVelocityY, dt);
      this.birdY += this.birdVelocityY * dt;

      const groundY = this.canvasHeight - 20;
      if (this.birdY > groundY) {
        this.birdY = groundY;
      }

      // Update particles
      updateParticles(this.particles, dt);
    }
  }

  render(): void {
    if (!this.ctx || !this.canvas) return;

    const ctx = this.ctx;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    // Background
    renderBackground(ctx, w, h, this.background);

    // Pipes
    for (const pipe of this.pipes) {
      renderPipe(ctx, pipe as Pipe, h);
    }

    // Bird (if alive or crashed)
    if (this.state !== 'gameOver' || this.birdY < h - 20) {
      const birdRenderState: BirdRenderState = {
        x: w * 0.25,
        y: this.birdY ?? config.birdStartY * h,
        angle: this.state === 'playing' ? Math.min(Math.max(this.birdVelocityY * 0.1, -Math.PI / 4), Math.PI / 2) : this.birdAngle,
        wingPhase: this.state === 'playing' ? this.birdWingPhase : (this.state === 'ready' ? Date.now() * 0.004 : this.birdWingPhase),
      };

      renderBird(ctx, birdRenderState);
    }

    // Particles
    renderParticles(ctx, this.particles);

    // HUD (only during gameplay)
    if (this.state === 'playing' || this.state === 'gameOver') {
      renderHUD(ctx, w, h, { score: this.score, bestScore: this.bestScore });
    }

    // UI overlays
    if (this.state === 'ready') {
      renderReadyScreen(ctx, w);
    } else if (this.state === 'gameOver') {
      renderGameOverScreen(ctx, w, h, { state: this.state, score: this.score, bestScore: this.bestScore });
    }
  }

  private loop(timestamp: number): void {
    const dt = this.lastFrameTime ? (timestamp - this.lastFrameTime) / 16.67 : 1;
    const clampedDt = Math.min(dt, 2); // Prevent huge jumps

    this.lastFrameTime = timestamp;
    this.update(clampedDt);
    this.render();

    requestAnimationFrame((ts) => this.loop(ts));
  }

  cleanup(): void {
    for (const cleanup of this.cleanupInputHandlers) {
      try { cleanup(); } catch (_) {}
    }
  }

  // Public getters for tests and UI
  get currentScore() { return this.score; }
  get bestScoreValue() { return this.bestScore; }
}

export function createGameEngine(canvas: HTMLCanvasElement): GameEngine {
  const engine = new GameEngine(canvas);

  return engine;
}
