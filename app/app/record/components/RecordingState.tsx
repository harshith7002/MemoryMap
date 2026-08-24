import React from 'react';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { IconPause, IconPlay } from '@/components/ui/icons/NavIcons';
import styles from '../page.module.css';

interface RecordingStateProps {
  state: string;
  currentQuestion: string;
  formattedTime: string;
  isLastQuestion: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  handleSaveAndContinue: () => void;
  handleFinishInterview: () => void;
}

export function RecordingState({
  state,
  currentQuestion,
  formattedTime,
  isLastQuestion,
  pause,
  resume,
  reset,
  handleSaveAndContinue,
  handleFinishInterview,
}: RecordingStateProps) {
  return (
    <div className={styles.activeRecordCard}>
      <span className={styles.activePromptLabel}>&ldquo;{currentQuestion}&rdquo;</span>

      <div className={styles.timerHeader}>
        <span className={state === 'recording' ? styles.liveBadge : styles.pauseBadge}>
          {state === 'recording' ? '● RECORDING' : 'PAUSED'}
        </span>
        <span className={styles.timerVal}>{formattedTime}</span>
      </div>

      <div className={styles.waveformContainer}>
        <Waveform isAnimating={state === 'recording'} barCount={36} height={40} color="var(--color-amber)" />
      </div>

      <div className={styles.controlsRow}>
        {state === 'recording' ? (
          <Button onClick={pause} variant="secondary" size="md">
            <IconPause size={15} /> Pause
          </Button>
        ) : (
          <Button onClick={resume} variant="primary" size="md">
            <IconPlay size={15} /> Resume
          </Button>
        )}

        <Button
          onClick={isLastQuestion ? handleFinishInterview : handleSaveAndContinue}
          variant="brass"
          size="lg"
        >
          {isLastQuestion ? 'Save & finish interview' : `Save & continue →`}
        </Button>

        <Button onClick={reset} variant="ghost" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}
