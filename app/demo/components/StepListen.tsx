import React from 'react';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

interface StepListenProps {
  memory: any;
  isPlayingAudio: boolean;
  setIsPlayingAudio: (val: boolean) => void;
  setActiveStep: (val: number) => void;
}

export function StepListen({ memory, isPlayingAudio, setIsPlayingAudio, setActiveStep }: StepListenProps) {
  return (
    <div className={styles.stepPane}>
      <h2 className={styles.paneTitle}>01 / Listen to Ramesh's original voice recording</h2>
      <p className={styles.paneDesc}>Hear Ramesh describe his cooling system diagnostic procedure in his own spoken voice.</p>

      <div className={styles.audioPlayerCard}>
        <div className={styles.playerTop}>
          <div className={styles.trackInfo}>
            <strong className={styles.trackTitle}>{memory.title}</strong>
            <span className={styles.trackMeta}>Ramesh Kumar · Length: {memory.duration}</span>
          </div>
          <button
            className={styles.playBtn}
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          >
            {isPlayingAudio ? '⏸ Pause' : '▶ Play (04:32)'}
          </button>
        </div>

        <div className={styles.waveformWrapper}>
          <Waveform isAnimating={isPlayingAudio} barCount={36} height={36} color="var(--color-amber)" />
        </div>
      </div>

      <div className={styles.paneActions}>
        <Button onClick={() => setActiveStep(2)} variant="primary" size="md">
          Next: Inspect Transcript →
        </Button>
      </div>
    </div>
  );
}
