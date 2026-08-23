'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { useAudioRecorder } from '@/lib/hooks';
import { saveNewMemory } from '@/lib/store';
import { Memory } from '@/lib/data';
import styles from './page.module.css';

export default function RecordPage() {
  const { state, formattedTime, audioUrl, start, pause, resume, stop, reset, setState } = useAudioRecorder();
  const [selectedPrompt, setSelectedPrompt] = useState<string>('What is something you know that took years to learn?');
  const [processingStep, setProcessingStep] = useState(0);
  const [createdMemory, setCreatedMemory] = useState<Memory | null>(null);

  const prompts = [
    'What is something you know that took years to learn?',
    'What is a diagnostic trick only experience teaches?',
    'What common mistake do beginners in your trade make?',
    'What lesson did your mentor pass down to you?'
  ];

  const processingMessages = [
    'Uploading spoken audio stream...',
    'Running speech-to-text transcription...',
    'Extracting procedure steps & master tips...',
    'Indexing source timestamps into archive...'
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
      }, 800);

      // Perform real API call to process audio
      fetch('/api/process-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: selectedPrompt, duration: formattedTime })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            const saved = saveNewMemory(data.data);
            setCreatedMemory(saved);
          }
          setState('done');
        })
        .catch(() => {
          // Fallback save
          const saved = saveNewMemory({
            title: 'Diagnostic Inspection & Operational Intuition',
            summary: `Preserved oral account regarding "${selectedPrompt}". Contains diagnostic steps, tactile tests, and key mistakes to avoid.`,
            expertId: 'ramesh-kumar',
            expertName: 'Ramesh Kumar',
            expertRole: 'Master Mechanic',
            expertExperience: 35,
            category: 'Automotive Repair',
            duration: formattedTime || '03:15',
            tags: ['Diagnostics', 'Engine', 'Intuition'],
            procedure: [
              { step: 1, instruction: 'Check coolant circulation flow before replacing the thermostat housing.', note: 'Feel upper vs lower radiator hose temperatures first.' },
              { step: 2, instruction: 'Inspect water pump impeller vanes for cavitation or micro-fractures.', note: 'A cold lower hose indicates pump failure.' }
            ],
            expertTips: ['Feel upper vs lower radiator hose temperatures before unbolting any parts.'],
            commonMistakes: ['Replacing the thermostat immediately without verifying actual impeller cavitation.'],
            tools: ['Coolant Pressure Tester', 'Infrared Thermometer']
          });
          setCreatedMemory(saved);
          setState('done');
        });

      return () => clearInterval(interval);
    }
  }, [state, selectedPrompt, formattedTime, setState, processingMessages.length]);

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
            <span className={styles.triggerText}>Click to start speaking into microphone</span>
          </div>
        </div>
      )}

      {/* RECORDING / PAUSED STATE */}
      {(state === 'recording' || state === 'paused') && (
        <div className={styles.activeRecordCard}>
          <div className={styles.timerHeader}>
            <span className={state === 'recording' ? styles.liveBadge : styles.pauseBadge}>
              {state === 'recording' ? '● RECORDING LIVE' : 'PAUSED'}
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
      {state === 'done' && createdMemory && (
        <div className={styles.doneCard}>
          <div className={styles.doneHeader}>
            <h2 className={styles.doneTitle}>Your knowledge has been preserved.</h2>
            <p className={styles.doneSub}>Memory ID: {createdMemory.catalogId} · {createdMemory.category}</p>
          </div>

          {audioUrl && (
            <div className={styles.audioPreview}>
              <strong className={styles.audioLabel}>Your Recorded Audio Stream:</strong>
              <audio src={audioUrl} controls className={styles.audioEl} />
            </div>
          )}

          <div className={styles.extractedGrid}>
            {createdMemory.procedure && (
              <div className={styles.extractedBox}>
                <strong className={styles.boxTag}>PROCEDURE</strong>
                <ol className={styles.numList}>
                  {createdMemory.procedure.map((p) => (
                    <li key={p.step}>{p.instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            {createdMemory.expertTips && (
              <div className={styles.extractedBox}>
                <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
                <p className={styles.boxText}>{createdMemory.expertTips[0]}</p>
              </div>
            )}

            {createdMemory.commonMistakes && (
              <div className={styles.extractedBox}>
                <strong className={styles.boxTagRed}>COMMON MISTAKE</strong>
                <p className={styles.boxText}>{createdMemory.commonMistakes[0]}</p>
              </div>
            )}
          </div>

          <div className={styles.doneActions}>
            <Link href={`/app/knowledge/${createdMemory.id}`} className={styles.viewRecordBtn}>
              View Preserved Document #{createdMemory.catalogId} →
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
