/**
 * Web Audio API based CPR compression metronome
 * Set to 110 BPM (AHA Recommended 100-120 BPM for chest compressions)
 */

class CPRMetronome {
  private audioContext: AudioContext | null = null;
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private onBeatCallback: (() => void) | null = null;
  public bpm: number = 110;

  private initAudio() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public start(onBeat?: () => void) {
    if (this.isRunning) return;
    this.initAudio();
    this.isRunning = true;
    this.onBeatCallback = onBeat || null;

    const intervalMs = (60 / this.bpm) * 1000;

    const playClick = () => {
      if (!this.isRunning || !this.audioContext) return;

      try {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        // High crisp beep for clear timing during high stress
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 note

        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.08);

        if (this.onBeatCallback) {
          this.onBeatCallback();
        }
      } catch (err) {
        console.warn('Audio context click error:', err);
      }

      this.timerId = window.setTimeout(playClick, intervalMs);
    };

    playClick();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const cprMetronome = new CPRMetronome();
