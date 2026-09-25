import { expect, vi } from 'vitest';

// Polyfill canvas for jsdom tests
globalThis.canvas = {
  width: 400,
  height: 600,
};

// Mock setTimeout to be deterministic in tests
vi.mock('timers', () => ({
  ...require('timers'),
  setTimeout: vi.fn(),
}));

export default {};
