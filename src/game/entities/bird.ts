import { Vector2 } from "../utils/vector";

export const BIRD_RADIUS = 10;

export interface BirdConfig {
  gravity: number;
  flapImpulse: number;
  width: number;
  height: number;
}

export interface Bird {
  position: Vector2;
  velocity: Vector2;
  rotation: number;
  rotationSpeed: number;
}

export function createBird(config: BirdConfig): Bird {
  return {
    position: new Vector2(100, 300),
    velocity: new Vector2(0, 0),
    rotation: 0,
    rotationSpeed: 0,
  };
}

export function updateBirdRotation(bird: Bird, dt: number): void {
  const targetRotation = Math.min(
    Math.max(bird.velocity.y * 0.1, -Math.PI / 4),
    Math.PI / 2
  );
  bird.rotation += (targetRotation - bird.rotation) * dt * 5;
}
