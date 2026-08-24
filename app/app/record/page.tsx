'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { IconCheck } from '@/components/ui/icons/NavIcons';
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

export interface Answer {
  question: string;
  duration: number;
}

export function formatDuration(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

import { IdleState } from './components/IdleState';
import { RecordingState } from './components/RecordingState';
import { ProcessingState } from './components/ProcessingState';
import { DoneState } from './components/DoneState';

export default function RecordPage() {
  const { state, seconds, formattedTime, start, pause, resume, stop, reset, setState, audioBlob } =
    useAudioRecorder();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [advancing, setAdvancing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  // Store the newly created memory from backend
  const [createdMemory, setCreatedMemory] = useState<any>(null);

  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentQuestion = QUESTIONS[currentIndex];
  const interviewDone = state === 'done';

  // Drive the multi-step "understanding your experience" sequence, then
  // land on the done screen once every question has been processed.
  useEffect(() => {
    if (state !== 'processing') return;
    
    // Auto-advance visual messages slowly while waiting
    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep((prev) => Math.min(prev + 1, PROCESSING_MESSAGES.length - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [state]);

  // When audio blob is ready and we are processing, hit the backend
  useEffect(() => {
    if (state === 'processing' && audioBlob) {
      const processAudio = async () => {
        try {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          formData.append('prompt', currentQuestion);
          
          const res = await fetch('/api/process-audio', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.success && data.data) {
            setCreatedMemory(data.data);
          } else {
             console.error("Backend error:", data.error);
          }
        } catch (e) {
           console.error("Failed to process audio:", e);
        } finally {
           setState('done');
        }
      };
      processAudio();
    }
  }, [state, audioBlob, setState, currentQuestion]);

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
          {/* IDLE or ADVANCING */}
          {(state === 'idle' || advancing) && (
            <IdleState
              currentIndex={currentIndex}
              currentQuestion={currentQuestion}
              advancing={advancing}
              totalQuestions={totalQuestions}
              start={start}
            />
          )}

          {/* RECORDING / PAUSED */}
          {(state === 'recording' || state === 'paused') && !advancing && (
            <RecordingState
              state={state}
              currentQuestion={currentQuestion}
              formattedTime={formattedTime}
              isLastQuestion={isLastQuestion}
              pause={pause}
              resume={resume}
              reset={reset}
              handleSaveAndContinue={handleSaveAndContinue}
              handleFinishInterview={handleFinishInterview}
            />
          )}

          {/* PROCESSING */}
          {state === 'processing' && (
            <ProcessingState
              processingStep={processingStep}
              processingMessages={PROCESSING_MESSAGES}
            />
          )}

          {/* DONE */}
          {interviewDone && (
            <DoneState
              answers={answers}
              totalRecordedSeconds={totalRecordedSeconds}
              formatDuration={formatDuration}
              handleRecordAnother={handleRecordAnother}
              createdMemory={createdMemory}
            />
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
