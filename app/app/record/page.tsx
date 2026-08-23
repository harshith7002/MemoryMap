'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { useAudioRecorder } from '@/lib/hooks';
import styles from './page.module.css';

export default function RecordPage() {
  const router = useRouter();
  const { state, formattedTime, start, pause, resume, stop, reset } = useAudioRecorder();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);

  const prompts = [
    'A diagnostic process only you know how to do',
    'Something that took you years to master by trial and error',
    'A common mistake beginners in your field always make',
    'The most important lesson passed down from your mentor'
  ];

  const processingMessages = [
    'RECORDING // Cataloging acoustic frequency map...',
    'ANALYSIS // Extracting step-by-step diagnostic procedures...',
    'STRUCTURING // Identifying master practical tips & warnings...',
    'INDEXING // Formulating catalog tools & required materials...',
    'ARCHIVING // Linking source timestamp attribution...',
    'COMPLETE // Generating permanent archive catalog entry...'
  ];

  useEffect(() => {
    if (state === 'processing') {
      const interval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingMessages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              router.push('/app/knowledge/demo-memory-1');
            }, 800);
            return prev;
          }
        });
      }, 900);

      return () => clearInterval(interval);
    }
  }, [state, router, processingMessages.length]);

  return (
    <div className={styles.container}>
      {/* Studio Header */}
      <div className={styles.header}>
        <span className={styles.badge}>FIELD AUDIO ARCHIVE STUDIO // STUDIO-01</span>
        <h1 className={styles.title}>Preserve an Oral Account</h1>
        <p className={styles.subtitle}>
          No documentation marathon. Speak naturally as if teaching an apprentice.
        </p>
      </div>

      {/* IDLE STATE */}
      {state === 'idle' && (
        <div className={styles.idleState}>
          <div className={styles.promptCard}>
            <span className={styles.promptHeader}>SELECT ORAL ARCHIVE PROMPT:</span>
            <p className={styles.promptMain}>
              {selectedPrompt ? `“${selectedPrompt}”` : '“Tell us about something you know that took years to learn.”'}
            </p>

            <div className={styles.chipsRow}>
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  className={`${styles.chip} ${selectedPrompt === p ? styles.chipActive : ''}`}
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Archival Mic Trigger */}
          <div className={styles.micContainer}>
            <button className={styles.bigMicButton} onClick={start} aria-label="Start recording">
              🎙️
            </button>
            <span className={styles.micActionText}>Click to Initiate Voice Recording</span>
          </div>

          <div className={styles.privacyNote}>
            🔒 FIELD NOTE: Audio is captured with high-fidelity acoustic indexing & source timestamp attribution.
          </div>
        </div>
      )}

      {/* RECORDING STATE */}
      {state === 'recording' && (
        <div className={styles.activeState}>
          <div className={styles.liveIndicatorRow}>
            <span className={styles.redBlinkDot} />
            <span className={styles.liveText}>FIELD RECORDER ACTIVE</span>
            <span className={styles.timerDisplay}>{formattedTime}</span>
          </div>

          <div className={styles.waveformContainer}>
            <Waveform isAnimating={true} barCount={40} height={50} color="var(--color-brass)" />
          </div>

          <p className={styles.recordingAdvice}>
            “Speak naturally. MemoryMap AI automatically identifies procedures, tips, tools, and backstory.”
          </p>

          <div className={styles.controlsRow}>
            <Button onClick={pause} variant="secondary" size="md">
              ⏸ Pause
            </Button>
            <Button onClick={stop} variant="brass" size="lg">
              ⏹ Finish & Catalog Knowledge
            </Button>
            <Button onClick={reset} variant="ghost" size="md">
              ✕ Cancel
            </Button>
          </div>
        </div>
      )}

      {/* PAUSED STATE */}
      {state === 'paused' && (
        <div className={styles.activeState}>
          <div className={styles.liveIndicatorRow}>
            <span className={styles.pauseBadge}>PAUSED</span>
            <span className={styles.timerDisplay}>{formattedTime}</span>
          </div>

          <div className={styles.waveformContainer}>
            <Waveform isAnimating={false} barCount={40} height={50} color="var(--color-text-muted)" />
          </div>

          <div className={styles.controlsRow}>
            <Button onClick={resume} variant="brass" size="lg">
              ▶ Resume Recording
            </Button>
            <Button onClick={stop} variant="primary" size="md">
              ⏹ Finish & Catalog
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              ✕ Cancel
            </Button>
          </div>
        </div>
      )}

      {/* PROCESSING STATE */}
      {state === 'processing' && (
        <div className={styles.processingState}>
          <div className={styles.spinnerBox}>
            <span className={styles.spinner} />
          </div>

          <h2 className={styles.processingTitle}>Cataloging Spoken Knowledge...</h2>
          <p className={styles.processingStepText}>{processingMessages[processingStep]}</p>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((processingStep + 1) / processingMessages.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
