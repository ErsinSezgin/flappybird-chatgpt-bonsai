import { createPipePair } from './createPipePair';

export interface PipeManagerState {
  pipes: Array<{ id: number; pair: PipePair; x: number }>;
  nextSpawnX: number;
}

export function createPipeManager(): PipeManagerState {
  return { pipes: [], nextSpawnX: 400 };
}

export function spawnPipe(state: PipeManagerState): void {
  const gapHeight = state.pipes.length > 5 ? 120 : 140;
  const gapY = 80 + Math.random() * (state.pipes.length > 5 ? 160 : 200);
  state.pipes.push({
    id: Date.now() + Math.random(),
    pair: createPipePair(gapY, gapHeight),
    x: state.nextSpawnX,
  });
}

export function movePipes(state: PipeManagerState, speed: number): void {
  for (const pipe of state.pipes) {
    pipe.x -= speed;
  }
  // Remove pipes that are off-screen
  state.pipes = state.pipes.filter(p => p.x + p.pair.top.width > -10);
}

export function removeOldPipes(state: PipeManagerState): void {
  state.pipes = state.pipes.filter(p => p.x + p.pair.top.width > -10);
}
