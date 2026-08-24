import React from 'react';
import styles from '../page.module.css';

interface ProcessingStateProps {
  processingStep: number;
  processingMessages: string[];
}

export function ProcessingState({ processingStep, processingMessages }: ProcessingStateProps) {
  return (
    <div className={styles.processingCard}>
      <div className={styles.spinner} />
      <h2 className={styles.procTitle}>Understanding your experience...</h2>
      <p className={styles.procSub}>{processingMessages[processingStep]}</p>
    </div>
  );
}
