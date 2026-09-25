// ── Audio Synthesis (Web Audio API) ─────────────────────────────

interface AudioConfig {
  enabled: boolean;
}

let audioCtx: AudioContext | null = null;
let config: AudioConfig = { enabled: true };

function ensureAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function initAudio(): void {
  // Audio context created lazily on first interaction
}

export function enableAudio(): void {
  config.enabled = true;
}

export function disableAudio(): void {
  config.enabled = false;
}

function playTone(freq: number, duration: number, type: 'square' | 'sine' | 'triangle' = 'square', volume = 0.1): void {
  if (!config.enabled) return;

  const ctx = ensureAudioContext();
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playFlap(): void {
  playTone(600, 0.1, 'sine', 0.08);
}

export function playScore(): void {
  const ctx = ensureAudioContext();
  
  // Two-tone ascending chime
  [523, 659].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.05 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.2);
  });
}

export function playCrash(): void {
  if (!config.enabled) return;

  const ctx = ensureAudioContext();

  // Noise-like crash
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  noise.connect(gain);
  gain.connect(ctx.destination);

  noise.start();

  // Low crash tone
  playTone(150, 0.3, 'sawtooth', 0.1);
}
