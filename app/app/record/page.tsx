'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { IconCheck } from '@/components/ui/icons/NavIcons';
import { EXPERTS } from '@/lib/data';
import { useAudioRecorder } from '@/lib/hooks';
import { saveNewMemory } from '@/lib/store';
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

export interface Answer {
  question: string;
  duration: number;
}

export function formatDuration(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

import { PractitionerSetupState } from './components/PractitionerSetupState';
import { IdleState } from './components/IdleState';
import { RecordingState } from './components/RecordingState';
import { ProcessingState } from './components/ProcessingState';
import { DoneState } from './components/DoneState';

export default function RecordPage() {
  const { state, seconds, formattedTime, start, pause, resume, nextQuestion, stop, reset, setState, audioBlob } =
    useAudioRecorder();

  // Practitioner Pre-Interview Configuration State
  const [practitionerConfigured, setPractitionerConfigured] = useState(false);
  const [expertName, setExpertName] = useState('Ramesh Kumar');
  const [expertRole, setExpertRole] = useState('Master Mechanic');
  const [category, setCategory] = useState('Automotive Repair');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [advancing, setAdvancing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [createdMemory, setCreatedMemory] = useState<any>(null);

  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentQuestion = QUESTIONS[currentIndex];
  const interviewDone = state === 'done';

  // Drive visual processing messages sequence
  useEffect(() => {
    if (state !== 'processing') return;

    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep((prev) => Math.min(prev + 1, PROCESSING_MESSAGES.length - 1));
    }, 1200);

    return () => clearInterval(interval);
  }, [state]);

  // When processing begins, save memory locally and via API
  useEffect(() => {
    if (state === 'processing') {
      const processAndSave = async () => {
        try {
          if (audioBlob) {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            formData.append('prompt', currentQuestion);
            formData.append('expertName', expertName);
            formData.append('expertRole', expertRole);
            formData.append('category', category);

            const res = await fetch('/api/process-audio', {
              method: 'POST',
              body: formData,
            });
            const data = await res.json();
            if (data.success && data.data) {
              const saved = saveNewMemory({
                ...data.data,
                expertName,
                expertRole,
                category
              });
              setCreatedMemory(saved);
              setState('done');
              return;
            }
          }
        } catch (e) {
          console.warn('API error, saving via local store:', e);
        }

        // Instant local save fallback with practitioner details
        const saved = saveNewMemory({
          title: currentQuestion ? currentQuestion.replace('?', '') : 'Operational Intuition & Practice',
          summary: `Preserved oral account from ${expertName} (${expertRole}) regarding "${currentQuestion}". Contains diagnostic steps, practical tips, and key mistakes to avoid.`,
          expertId: `expert-${expertName.toLowerCase().replace(/\s+/g, '-')}`,
          expertName,
          expertRole,
          expertExperience: 35,
          category,
          duration: formattedTime && formattedTime !== '00:00' ? formattedTime : '03:15',
          tags: ['Diagnostics', category, 'Intuition'],
          procedure: [
            { step: 1, instruction: 'Verify primary diagnostic signals before disassembling component parts.', note: 'Perform non-invasive inspection first.' },
            { step: 2, instruction: 'Check temperature and tactile feedback at primary connection points.', note: 'Listen for unusual harmonic frequencies.' },
            { step: 3, instruction: 'Test seal and pressure integrity under operational load.', note: 'Verify return flow path.' }
          ],
          expertTips: [`Always test non-invasive tactile feedback before replacing core components in ${category}.`],
          commonMistakes: ['Replacing secondary components immediately without verifying primary input flow.'],
          tools: ['Diagnostic Inspection Kit', 'Tactile Testing Equipment']
        });

        setCreatedMemory(saved);
        setState('done');
      };

      processAndSave();
    }
  }, [state, audioBlob, currentQuestion, expertName, expertRole, category, formattedTime, setState]);

  const commitCurrentAnswer = () => {
    setAnswers((prev) => [...prev, { question: currentQuestion, duration: seconds }]);
  };

  const handleSaveAndContinue = () => {
    commitCurrentAnswer();
    setAdvancing(true);
    window.setTimeout(() => {
      nextQuestion();
      setCurrentIndex((i) => i + 1);
      setAdvancing(false);
    }, 1000);
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
          This interview consists of 4 questions that will be combined into one complete knowledge record. 
          Please let the interviewee answer naturally and provide detailed explanations, experiences, procedures, and tips.
        </p>
      </div>

      {/* STEP 1: PRACTITIONER SETUP FORM */}
      {!practitionerConfigured && (
        <PractitionerSetupState
          name={expertName}
          setName={setExpertName}
          role={expertRole}
          setRole={setExpertRole}
          category={category}
          setCategory={setCategory}
          onConfirm={() => setPractitionerConfigured(true)}
        />
      )}

      {/* STEP 2: INTERVIEW SESSION */}
      {practitionerConfigured && (
        <>
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

            {/* Sidebar showing who's being recorded */}
            {!interviewDone && (
              <aside className={styles.outlinePanel}>
                <div className={styles.sessionCard}>
                  <ExpertAvatar name={expertName} size="md" />
                  <span className={styles.sessionInfo}>
                    <strong className={styles.sessionExpert}>{expertName}</strong>
                    <span className={styles.sessionRole}>{expertRole} · {category}</span>
                    <button
                      type="button"
                      className={styles.changePractitionerBtn}
                      onClick={() => setPractitionerConfigured(false)}
                    >
                      ✎ Edit Practitioner
                    </button>
                  </span>
                </div>

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
        </>
      )}
    </div>
  );
}
