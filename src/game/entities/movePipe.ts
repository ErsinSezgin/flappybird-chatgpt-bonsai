import { PipeWidth } from '../config/PipeWidth';

export function movePipe(pipe: { x: number; speed?: number }): void {
  pipe.x -= (pipe.speed ?? PipeSpeed);
}
