'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { useAudioRecorder } from '@/lib/hooks';
import styles from './page.module.css';

export default function RecordPage() {
  const { state, formattedTime, start, pause, resume, stop, reset } = useAudioRecorder();
  const [selectedPrompt, setSelectedPrompt] = useState<string>('What is something you know that took years to learn?');
  const [processingStep, setProcessingStep] = useState(0);

  const prompts = [
    'What is something you know that took years to learn?',
    'What is a diagnostic trick only experience teaches?',
    'What common mistake do beginners in your trade make?',
    'What lesson did your mentor pass down to you?'
  ];

  const processingMessages = [
    'Listening to spoken account...',
    'Identifying procedure steps...',
    'Extracting practical tips...',
    'Formatting tools and story...'
  ];

  useEffect(() => {
    if (state === 'processing') {
      const interval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingMessages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state, processingMessages.length]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Preserve a memory.</h1>
        <p className={styles.subtitle}>
          You don't need to write it down. Just tell the story.
        </p>
      </div>

      {/* IDLE STATE */}
      {state === 'idle' && (
        <div className={styles.idleCard}>
          <div className={styles.promptHeader}>
            <span className={styles.promptLabel}>GUIDED RECORDING PROMPT</span>
            <h2 className={styles.promptTitle}>“{selectedPrompt}”</h2>

            <div className={styles.promptChips}>
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

          <div className={styles.recordTriggerBox}>
            <button className={styles.recordCircleBtn} onClick={start} aria-label="Start recording">
              🎙️
            </button>
            <span className={styles.triggerText}>Click to start speaking</span>
          </div>
        </div>
      )}

      {/* RECORDING / PAUSED STATE */}
      {(state === 'recording' || state === 'paused') && (
        <div className={styles.activeRecordCard}>
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
                ⏸ Pause
              </Button>
            ) : (
              <Button onClick={resume} variant="primary" size="md">
                ▶ Resume
              </Button>
            )}

            <Button onClick={stop} variant="brass" size="lg">
              Finish & Preserve Memory
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* PROCESSING STATE */}
      {state === 'processing' && (
        <div className={styles.processingCard}>
          <div className={styles.spinner} />
          <h2 className={styles.procTitle}>Understanding your experience...</h2>
          <p className={styles.procSub}>{processingMessages[processingStep]}</p>
        </div>
      )}

      {/* FINISHED STATE */}
      {state === 'done' && (
        <div className={styles.doneCard}>
          <div className={styles.doneHeader}>
            <h2 className={styles.doneTitle}>Your knowledge has been preserved.</h2>
            <p className={styles.doneSub}>Here is what MemoryMap extracted from your spoken account:</p>
          </div>

          <div className={styles.extractedGrid}>
            <div className={styles.extractedBox}>
              <strong className={styles.boxTag}>PROCEDURE</strong>
              <p className={styles.boxText}>Check coolant circulation flow before replacing the thermostat housing.</p>
            </div>

            <div className={styles.extractedBox}>
              <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
              <p className={styles.boxText}>Feel upper vs lower radiator hose temperatures — if lower is cold while upper is scalding, test water pump vanes.</p>
            </div>

            <div className={styles.extractedBox}>
              <strong className={styles.boxTagRed}>COMMON MISTAKE</strong>
              <p className={styles.boxText}>Replacing the thermostat immediately without verifying actual impeller cavitation.</p>
            </div>
          </div>

          <div className={styles.doneActions}>
            <Link href="/app/knowledge/demo-memory-1" className={styles.viewRecordBtn}>
              View Full Preserved Document →
            </Link>
            <Button onClick={reset} variant="secondary" size="md">
              Record Another Memory
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
