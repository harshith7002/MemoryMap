import React from 'react';
import { IconCheck, IconRecord } from '@/components/ui/icons/NavIcons';
import styles from '../page.module.css';

interface IdleStateProps {
  currentIndex: number;
  currentQuestion: string;
  advancing: boolean;
  totalQuestions: number;
  start: () => void;
}

export function IdleState({ currentIndex, currentQuestion, advancing, totalQuestions, start }: IdleStateProps) {
  if (advancing) {
    return (
      <div className={styles.savedCard}>
        <div className={styles.savedTick}>
          <IconCheck size={22} />
        </div>
        <h2 className={styles.savedTitle}>Response saved.</h2>
        <p className={styles.savedSub}>
          Moving to question {currentIndex + 2} of {totalQuestions}&hellip;
        </p>
      </div>
    );
  }

  return (
    <div className={styles.idleCard}>
      <span className={styles.promptLabel}>Interview question {currentIndex + 1}</span>
      <h2 className={styles.promptTitle}>&ldquo;{currentQuestion}&rdquo;</h2>

      <div className={styles.recordTriggerBox}>
        <button className={styles.recordCircleBtn} onClick={start} aria-label="Start recording">
          <IconRecord size={30} />
        </button>
        <span className={styles.triggerText}>Click to start speaking</span>
      </div>
    </div>
  );
}
