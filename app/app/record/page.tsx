'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { IconCheck, IconPause, IconPlay, IconRecord } from '@/components/ui/icons/NavIcons';
import { EXPERTS } from '@/lib/data';
import { useAudioRecorder } from '@/lib/hooks';
import styles from './page.module.css';

const QUESTIONS = [
  'What is something you know that took years to learn?',
  'What is a diagnostic trick only experience teaches?',
  'What common mistake do beginners in your trade make?',
  'What lesson did your mentor pass down to you?',
];

const PROCESSING_MESSAGES = [
  'Listening to spoken accounts...',
  'Identifying procedure steps...',
  'Extracting practical tips...',
  'Formatting tools and story...',
];

const expert = EXPERTS[0];

interface Answer {
  question: string;
  duration: number;
}

function formatDuration(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function RecordPage() {
  const { state, seconds, formattedTime, start, pause, resume, stop, reset, setState } =
    useAudioRecorder();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [advancing, setAdvancing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentQuestion = QUESTIONS[currentIndex];
  const interviewDone = state === 'done';

  // Drive the multi-step "understanding your experience" sequence, then
  // land on the done screen once every question has been processed.
  useEffect(() => {
    if (state !== 'processing') return;

    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < PROCESSING_MESSAGES.length - 1) return prev + 1;
        clearInterval(interval);
        window.setTimeout(() => setState('done'), 500);
        return prev;
      });
    }, 850);

    return () => clearInterval(interval);
  }, [state, setState]);

  const commitCurrentAnswer = () => {
    setAnswers((prev) => [...prev, { question: currentQuestion, duration: seconds }]);
  };

  const handleSaveAndContinue = () => {
    commitCurrentAnswer();
    setAdvancing(true);
    window.setTimeout(() => {
      reset();
      setCurrentIndex((i) => i + 1);
      setAdvancing(false);
    }, 1100);
  };

  const handleFinishInterview = () => {
    commitCurrentAnswer();
    stop();
  };

  const handleRecordAnother = () => {
    reset();
    setCurrentIndex(0);
    setAnswers([]);
    setAdvancing(false);
  };

  const totalRecordedSeconds = answers.reduce((sum, a) => sum + a.duration, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Preserve a memory.</h1>
        <p className={styles.subtitle}>
          You don&rsquo;t need to write it down. Just tell the story, one question at a time.
        </p>
      </div>

      {!interviewDone && (
        <div className={styles.progressRow}>
          <span className={styles.progressLabel}>
            Question {Math.min(currentIndex + 1, totalQuestions)} of {totalQuestions}
          </span>
          <div className={styles.progressTrack}>
            {QUESTIONS.map((_, idx) => {
              const filled = idx < currentIndex || state === 'processing' || (idx === currentIndex && advancing);
              return <span key={idx} className={`${styles.progressSeg} ${filled ? styles.progressSegDone : ''}`} />;
            })}
          </div>
        </div>
      )}

      <div className={`${styles.layout} ${interviewDone ? styles.layoutSingle : ''}`}>
        <div className={styles.mainCol}>
          {/* IDLE — waiting to record the current question */}
          {state === 'idle' && !advancing && (
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
          )}

          {/* Brief confirmation before moving to the next question */}
          {advancing && (
            <div className={styles.savedCard}>
              <div className={styles.savedTick}>
                <IconCheck size={22} />
              </div>
              <h2 className={styles.savedTitle}>Response saved.</h2>
              <p className={styles.savedSub}>
                Moving to question {currentIndex + 2} of {totalQuestions}&hellip;
              </p>
            </div>
          )}

          {/* RECORDING / PAUSED */}
          {(state === 'recording' || state === 'paused') && !advancing && (
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
          )}

          {/* PROCESSING */}
          {state === 'processing' && (
            <div className={styles.processingCard}>
              <div className={styles.spinner} />
              <h2 className={styles.procTitle}>Understanding your experience...</h2>
              <p className={styles.procSub}>{PROCESSING_MESSAGES[processingStep]}</p>
            </div>
          )}

          {/* DONE */}
          {interviewDone && (
            <div className={styles.doneCard}>
              <div className={styles.doneHeader}>
                <h2 className={styles.doneTitle}>Your knowledge has been preserved.</h2>
                <p className={styles.doneSub}>
                  MemoryMap turned {answers.length} spoken {answers.length === 1 ? 'answer' : 'answers'} (
                  {formatDuration(totalRecordedSeconds)} total) into the following:
                </p>
              </div>

              <div className={styles.answeredList}>
                {answers.map((a, idx) => (
                  <div key={idx} className={styles.answeredRow}>
                    <span className={styles.answeredIndex}>{idx + 1}</span>
                    <span className={styles.answeredQuestion}>{a.question}</span>
                    <span className={styles.answeredDuration}>{formatDuration(a.duration)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.extractedGrid}>
                <div className={styles.extractedBox}>
                  <strong className={styles.boxTag}>PROCEDURE</strong>
                  <p className={styles.boxText}>
                    Check coolant circulation flow before replacing the thermostat housing.
                  </p>
                </div>

                <div className={styles.extractedBox}>
                  <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
                  <p className={styles.boxText}>
                    Feel upper vs lower radiator hose temperatures — if lower is cold while upper is
                    scalding, test water pump vanes.
                  </p>
                </div>

                <div className={styles.extractedBox}>
                  <strong className={styles.boxTagRed}>COMMON MISTAKE</strong>
                  <p className={styles.boxText}>
                    Replacing the thermostat immediately without verifying actual impeller cavitation.
                  </p>
                </div>
              </div>

              <div className={styles.doneActions}>
                <Link href="/app/knowledge/demo-memory-1" className={styles.viewRecordBtn}>
                  View full preserved document →
                </Link>
                <Button onClick={handleRecordAnother} variant="secondary" size="md">
                  Record another memory
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Interview outline — who's being recorded and what's left */}
        {!interviewDone && (
          <aside className={styles.outlinePanel}>
            <Link href={`/app/experts/${expert.id}`} className={styles.sessionCard}>
              <ExpertAvatar src={expert.photoUrl} name={expert.name} size="md" />
              <span className={styles.sessionInfo}>
                <span className={styles.sessionExpert}>{expert.name}</span>
                <span className={styles.sessionRole}>{expert.role}</span>
              </span>
            </Link>

            <span className={styles.outlineEyebrow}>Interview outline</span>

            <ol className={styles.outlineList}>
              {QUESTIONS.map((q, idx) => {
                const done = idx < currentIndex || (idx === currentIndex && advancing);
                const current = idx === currentIndex && !advancing && state !== 'processing';
                const answer = answers[idx];

                return (
                  <li
                    key={idx}
                    className={`${styles.outlineItem} ${done ? styles.outlineDone : ''} ${
                      current ? styles.outlineCurrent : ''
                    }`}
                  >
                    <span className={styles.outlineMarker}>
                      {done ? <IconCheck size={12} /> : idx + 1}
                    </span>
                    <span className={styles.outlineTextCol}>
                      <span className={styles.outlineQuestion}>{q}</span>
                      {answer && <span className={styles.outlineDuration}>{formatDuration(answer.duration)}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </aside>
        )}
      </div>
    </div>
  );
}
