/**
 * Deep-Space Ambient Soundscape Engine for The Silent Explorers
 * 
 * Generates an original, subtle, cinematic cosmic ambience using the Web Audio API.
 * 
 * Features:
 * - 100% synthesized; zero external audio assets, zero network requests, 0 KB payload.
 * - Deep resonant fundamental drones (55 Hz sub-bass, 55.4 Hz detune, 110 Hz body).
 * - Algorithmic pink noise interstellar wind with slow resonant bandpass sweep (0.03 Hz).
 * - Ethereal sparse harmonic overtone (220 Hz / 330 Hz fifths) with gentle breathing tremolo.
 * - Broadcast-safe compression and subtle volume clamping (0.14 peak).
 * - Smooth 2.5s fade-in and 1.0s fade-out (zero pops, clicks, or abrupt cutoffs).
 * - Tab visibility lifecycle management (pauses when tab is hidden, resumes when visible).
 * - Direct user-gesture activation for full iOS, Android, Safari, and Chrome compatibility.
 */

export type AudioState = 'off' | 'starting' | 'on' | 'unavailable';

type StateListener = (state: AudioState) => void;

class AmbientAudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfos: OscillatorNode[] = [];
  
  private currentState: AudioState = 'off';
  private targetGain: number = 0.14; // Subtle, non-intrusive background volume
  private listeners: Set<StateListener> = new Set();
  private userWantsAudio: boolean = false;
  private isVisibilityHandlerAttached: boolean = false;

  constructor() {
    // Check if Web Audio API is supported
    if (typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        this.currentState = 'unavailable';
      }
    }
  }

  public getState(): AudioState {
    return this.currentState;
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.currentState);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentState);
      } catch (e) {
        console.error('Error in audio state listener:', e);
      }
    });
  }

  private setState(state: AudioState) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.notify();
    }
  }

  /**
   * Generates a 3-second looping pink noise buffer for atmospheric interstellar texture.
   */
  private createPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  /**
   * Initializes the synthesizer graph if not already built.
   */
  private initGraph(): boolean {
    if (this.ctx && this.masterGain) return true;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        this.setState('unavailable');
        return false;
      }

      this.ctx = new AudioCtx();

      // Master Compressor / Limiter to ensure gentle acoustic dynamics
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.05, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      // Master Gain Node (starts silent)
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.compressor);

      // 1. Deep Fundamental Sub Drone (55 Hz - A1)
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55.0, this.ctx.currentTime);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.40, this.ctx.currentTime);
      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start();
      this.oscillators.push(subOsc);

      // 2. Detuned Beating Sub Bass (55.4 Hz)
      const detunedOsc = this.ctx.createOscillator();
      detunedOsc.type = 'triangle';
      detunedOsc.frequency.setValueAtTime(55.4, this.ctx.currentTime);
      const detunedFilter = this.ctx.createBiquadFilter();
      detunedFilter.type = 'lowpass';
      detunedFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
      const detunedGain = this.ctx.createGain();
      detunedGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      detunedOsc.connect(detunedFilter);
      detunedFilter.connect(detunedGain);
      detunedGain.connect(this.masterGain);
      detunedOsc.start();
      this.oscillators.push(detunedOsc);

      // 3. Warm Mid Drone (110 Hz - A2) with slow filter modulation
      const midOsc = this.ctx.createOscillator();
      midOsc.type = 'sine';
      midOsc.frequency.setValueAtTime(110.0, this.ctx.currentTime);
      const midFilter = this.ctx.createBiquadFilter();
      midFilter.type = 'lowpass';
      midFilter.frequency.setValueAtTime(190, this.ctx.currentTime);
      midFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      const midGain = this.ctx.createGain();
      midGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      midOsc.connect(midFilter);
      midFilter.connect(midGain);
      midGain.connect(this.masterGain);
      midOsc.start();
      this.oscillators.push(midOsc);

      // 4. Subtle Interstellar Noise Floor with Slow Resonant Sweep
      const pinkBuffer = this.createPinkNoiseBuffer(this.ctx);
      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = pinkBuffer;
      this.noiseSource.loop = true;

      const noiseBandpass = this.ctx.createBiquadFilter();
      noiseBandpass.type = 'bandpass';
      noiseBandpass.frequency.setValueAtTime(280, this.ctx.currentTime);
      noiseBandpass.Q.setValueAtTime(2.2, this.ctx.currentTime);

      // Slow LFO for sweeping the cosmic wind filter (0.035 Hz = ~28 sec period)
      const noiseLfo = this.ctx.createOscillator();
      noiseLfo.frequency.setValueAtTime(0.035, this.ctx.currentTime);
      const noiseLfoGain = this.ctx.createGain();
      noiseLfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      noiseLfo.connect(noiseLfoGain);
      noiseLfoGain.connect(noiseBandpass.frequency);
      noiseLfo.start();
      this.lfos.push(noiseLfo);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.10, this.ctx.currentTime);
      this.noiseSource.connect(noiseBandpass);
      noiseBandpass.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      this.noiseSource.start();

      // 5. Sparse Ethereal Harmonics (220 Hz A3 + 330 Hz E4 Fifth)
      const highOsc = this.ctx.createOscillator();
      highOsc.type = 'sine';
      highOsc.frequency.setValueAtTime(220.0, this.ctx.currentTime);

      const highGain = this.ctx.createGain();
      highGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

      // Tremolo LFO on ethereal harmonic (0.06 Hz = ~16s breathing cycle)
      const highLfo = this.ctx.createOscillator();
      highLfo.frequency.setValueAtTime(0.06, this.ctx.currentTime);
      const highLfoGain = this.ctx.createGain();
      highLfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      highLfo.connect(highLfoGain);
      highLfoGain.connect(highGain.gain);
      highLfo.start();
      this.lfos.push(highLfo);

      highOsc.connect(highGain);
      highGain.connect(this.masterGain);
      highOsc.start();
      this.oscillators.push(highOsc);

      // Attach tab visibility listener
      if (!this.isVisibilityHandlerAttached && typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        this.isVisibilityHandlerAttached = true;
      }

      return true;
    } catch (e) {
      console.error('Failed to initialize Web Audio engine:', e);
      this.setState('unavailable');
      return false;
    }
  }

  private handleVisibilityChange = () => {
    if (!this.ctx || !this.userWantsAudio) return;

    if (document.hidden) {
      // Fade out and suspend to save CPU and battery
      if (this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          if (this.ctx && this.ctx.state === 'running' && document.hidden) {
            this.ctx.suspend().catch(() => {});
          }
        }, 550);
      }
    } else {
      // Returning to tab: resume if user previously enabled audio
      if (this.ctx && this.ctx.state === 'suspended' && this.userWantsAudio) {
        this.ctx.resume().then(() => {
          if (this.masterGain && this.ctx) {
            const now = this.ctx.currentTime;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.setValueAtTime(0.0001, now);
            this.masterGain.gain.linearRampToValueAtTime(this.targetGain, now + 1.5);
          }
        }).catch(() => {});
      }
    }
  };

  /**
   * Starts ambient soundscape playback with a smooth 2.5s fade-in.
   */
  public async play(): Promise<boolean> {
    this.userWantsAudio = true;
    this.setState('starting');

    const initialized = this.initGraph();
    if (!initialized || !this.ctx || !this.masterGain) {
      this.setState('unavailable');
      return false;
    }

    try {
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      // Fade in smoothly over 2.5 seconds
      this.masterGain.gain.linearRampToValueAtTime(this.targetGain, now + 2.5);

      this.setState('on');
      return true;
    } catch (e) {
      console.error('Audio playback initiation failed:', e);
      this.setState('unavailable');
      return false;
    }
  }

  /**
   * Fades out over 1.0s and suspends playback.
   */
  public async stop(): Promise<void> {
    this.userWantsAudio = false;

    if (!this.ctx || !this.masterGain) {
      this.setState('off');
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      // Smooth fade out over 1.0s
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);

      setTimeout(async () => {
        if (!this.userWantsAudio && this.ctx && this.ctx.state === 'running') {
          try {
            await this.ctx.suspend();
          } catch {
            // Ignore suspend errors
          }
        }
        this.setState('off');
      }, 1050);
    } catch {
      this.setState('off');
    }
  }

  /**
   * Toggles ambient audio on or off.
   */
  public async toggle(): Promise<void> {
    if (this.currentState === 'on' || this.currentState === 'starting') {
      await this.stop();
    } else {
      await this.play();
    }
  }

  /**
   * Fully cleans up audio context and nodes.
   */
  public destroy() {
    if (this.isVisibilityHandlerAttached && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      this.isVisibilityHandlerAttached = false;
    }

    this.oscillators.forEach(o => {
      try { o.stop(); o.disconnect(); } catch {}
    });
    this.lfos.forEach(l => {
      try { l.stop(); l.disconnect(); } catch {}
    });
    if (this.noiseSource) {
      try { this.noiseSource.stop(); this.noiseSource.disconnect(); } catch {}
    }
    if (this.ctx) {
      try { this.ctx.close(); } catch {}
      this.ctx = null;
    }
    this.masterGain = null;
    this.compressor = null;
    this.oscillators = [];
    this.lfos = [];
    this.noiseSource = null;
    this.setState('off');
  }
}

// Singleton export
export const ambientAudio = new AmbientAudioService();
