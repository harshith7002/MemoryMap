import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

interface StepUnderstandProps {
  showTranscript: boolean;
  setShowTranscript: (val: boolean) => void;
  setActiveStep: (val: number) => void;
}

export function StepUnderstand({ showTranscript, setShowTranscript, setActiveStep }: StepUnderstandProps) {
  return (
    <div className={styles.stepPane}>
      <h2 className={styles.paneTitle}>02 / Spoken verbatim transcript</h2>
      <p className={styles.paneDesc}>Spoken accounts are spontaneous and unstructured before AI processing.</p>

      <div className={styles.transcriptCard}>
        <button
          className={styles.toggleTranscriptBtn}
          onClick={() => setShowTranscript(!showTranscript)}
        >
          {showTranscript ? 'Hide Spoken Transcript' : 'Show Full Spoken Transcript'}
        </button>

        {showTranscript ? (
          <blockquote className={styles.rawTranscriptText}>
            “When this engine starts making that high-pitched metallic ticking, most guys grab the scanner. But if you put your hand right on the thermostat housing... you feel the pulse. The manual points to replacing the thermostat, but 80% of the time, it's water pump impeller cavitation or early head gasket pressure loss...”
          </blockquote>
        ) : (
          <p className={styles.transcriptPlaceholder}>
            Click the button above to view Ramesh's raw verbatim oral transcript...
          </p>
        )}
      </div>

      <div className={styles.paneActions}>
        <Button onClick={() => setActiveStep(3)} variant="primary" size="md">
          Next: View AI Extraction →
        </Button>
      </div>
    </div>
  );
}
