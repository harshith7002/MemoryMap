import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

interface StepAskProps {
  showQuestionAnswer: boolean;
  setShowQuestionAnswer: (val: boolean) => void;
  setActiveStep: (val: number) => void;
}

export function StepAsk({ showQuestionAnswer, setShowQuestionAnswer, setActiveStep }: StepAskProps) {
  return (
    <div className={styles.stepPane}>
      <h2 className={styles.paneTitle}>04 / Query Ramesh's oral archive</h2>
      <p className={styles.paneDesc}>Test how future learners query Ramesh's preserved knowledge.</p>

      <div className={styles.qaDemoBox}>
        <div className={styles.qHeader}>
          <span className={styles.qLabel}>Learner question:</span>
          <p className={styles.qText}>“My engine overheats after 30 minutes. What should I check first?”</p>
        </div>

        <button
          className={styles.triggerAnswerBtn}
          onClick={() => setShowQuestionAnswer(true)}
        >
          Ask Ramesh's Archive →
        </button>

        {showQuestionAnswer && (
          <div className={styles.aCard}>
            <strong className={styles.aLabel}>Ramesh's preserved answer:</strong>
            <blockquote className={styles.aText}>
              “According to Ramesh's 35 years of experience, check coolant flow before replacing the thermostat. Touch upper vs lower hose temperature: if lower hose remains cold while upper is scalding, your water pump impeller is worn.”
            </blockquote>
          </div>
        )}
      </div>

      <div className={styles.paneActions}>
        <Button onClick={() => setActiveStep(5)} variant="primary" size="md">
          Next: Source Verification →
        </Button>
      </div>
    </div>
  );
}
