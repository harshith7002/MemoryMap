'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { useAudioRecorder } from '@/lib/hooks';
import styles from './page.module.css';

export default function RecordPage() {
  const router = useRouter();
  const { state, formattedTime, start, pause, resume, stop, reset, setState } = useAudioRecorder();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);

  const prompts = [
    'A diagnostic process only you know how to do',
    'Something that took you years to master by trial and error',
    'A common mistake beginners in your field always make',
    'The most important lesson passed down from your mentor'
  ];

  const processingMessages = [
    'Analyzing acoustic signals and transcript...',
    'Identifying step-by-step diagnostic procedures...',
    'Extracting expert practical tips & warnings...',
    'Cataloging tools and required materials...',
    'Formatting human story & timestamp references...',
    'Finalizing Knowledge Preservation Archive...'
  ];

  // Handle simulated AI processing phase
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
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.badge}>VOICE ARCHIVE STUDIO</span>
        <h1 className={styles.title}>Let's preserve what you know.</h1>
        <p className={styles.subtitle}>
          No forms. No typing marathon. Speak naturally as if teaching an eager apprentice.
        </p>
      </div>

      {/* IDLE STATE */}
      {state === 'idle' && (
        <div className={styles.idleState}>
          <div className={styles.promptCard}>
            <span className={styles.promptHeader}>💡 SUGGESTED PROMPT</span>
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

          {/* Big Pulse Mic Button */}
          <div className={styles.micContainer}>
            <div className={styles.pulseRing} />
            <button className={styles.bigMicButton} onClick={start} aria-label="Start recording">
              🎙️
            </button>
            <span className={styles.micActionText}>Click to Start Recording Voice</span>
          </div>

          <div className={styles.privacyNote}>
            🔒 Your audio stays encrypted. AI extracts knowledge while preserving your original voice.
          </div>
        </div>
      )}

      {/* RECORDING STATE */}
      {state === 'recording' && (
        <div className={styles.activeState}>
          <div className={styles.liveIndicatorRow}>
            <span className={styles.redBlinkDot} />
            <span className={styles.liveText}>RECORDING IN PROGRESS</span>
            <span className={styles.timerDisplay}>{formattedTime}</span>
          </div>

          <div className={styles.waveformContainer}>
            <Waveform isAnimating={true} barCount={36} height={60} color="var(--color-amber)" />
          </div>

          <p className={styles.recordingAdvice}>
            “Speak naturally. Don't worry about structuring — MemoryMap AI identifies procedures, tips, and tools automatically.”
          </p>

          <div className={styles.controlsRow}>
            <Button onClick={pause} variant="secondary" size="md">
              ⏸️ Pause
            </Button>
            <Button onClick={stop} variant="amber" size="lg">
              ⏹️ Stop & Extract Knowledge
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
            <Waveform isAnimating={false} barCount={36} height={60} color="var(--color-charcoal-faint)" />
          </div>

          <div className={styles.controlsRow}>
            <Button onClick={resume} variant="amber" size="lg">
              ▶ Resume Recording
            </Button>
            <Button onClick={stop} variant="primary" size="md">
              ⏹️ Finish & Process
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              ✕ Cancel
            </Button>
          </div>
        </div>
      )}

      {/* PROCESSING STATE (AI KNOWLEDGE EXTRACTION) */}
      {state === 'processing' && (
        <div className={styles.processingState}>
          <div className={styles.spinnerRing}>
            <div className={styles.spinnerInner} />
            <span className={styles.sparkleIcon}>✨</span>
          </div>

          <h2 className={styles.processingTitle}>Transforming Voice to Knowledge...</h2>
          <p className={styles.processingStepText}>{processingMessages[processingStep]}</p>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((processingStep + 1) / processingMessages.length) * 100}%` }}
            />
          </div>

          <div className={styles.aiFeaturesPreview}>
            <span className={styles.featureItem}>✓ Voice Waveform Mapping</span>
            <span className={styles.featureItem}>✓ Procedure Step Extraction</span>
            <span className={styles.featureItem}>✓ Timestamp Source Linking</span>
          </div>
        </div>
      )}
    </div>
  );
}
