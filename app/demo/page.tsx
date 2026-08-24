'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { EXPERTS, MEMORIES } from '@/lib/data';
import styles from './page.module.css';
import { StepListen } from './components/StepListen';
import { StepUnderstand } from './components/StepUnderstand';
import { StepPreserve } from './components/StepPreserve';
import { StepAsk } from './components/StepAsk';
import { StepVerify } from './components/StepVerify';

export default function DemoPage() {
  const expert = EXPERTS[0]; // Ramesh Kumar
  const memory = MEMORIES[0];

  const [activeStep, setActiveStep] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);

  const steps = [
    { id: 1, title: '01 LISTEN', desc: 'Oral Recording' },
    { id: 2, title: '02 UNDERSTAND', desc: 'Transcript' },
    { id: 3, title: '03 PRESERVE', desc: 'AI Extraction' },
    { id: 4, title: '04 ASK', desc: 'Oral Query' },
    { id: 5, title: '05 VERIFY', desc: 'Source Timestamp' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.demoHeader}>
        <span className={styles.exhibitionTag}>EXHIBITION WALKTHROUGH · STEP {activeStep} / 05</span>
        <h1 className={styles.title}>Meet Ramesh.</h1>
        <p className={styles.subtitle}>
          35 years of mechanical knowledge saved from disappearing quietly. Test how MemoryMap captures and retrieves his oral history.
        </p>

        <Link href="/app/dashboard" className={styles.homeLink}>
          ← Go to App Dashboard
        </Link>
      </div>

      {/* Practitioner Spotlight */}
      <div className={styles.expertSpotlight}>
        <ExpertAvatar src={expert.photoUrl} name={expert.name} size="lg" />
        <div className={styles.expertMeta}>
          <h2 className={styles.expertName}>{expert.name}</h2>
          <p className={styles.expertRole}>{expert.role} · {expert.yearsExperience} Years Practice · {expert.location}</p>
        </div>
      </div>

      {/* Exhibition Interactive Box */}
      <div className={styles.interactiveBox}>
        {/* Step Progress Tabs */}
        <div className={styles.stepsBar}>
          {steps.map((s) => (
            <button
              key={s.id}
              className={`${styles.stepTab} ${activeStep === s.id ? styles.stepTabActive : ''} ${activeStep > s.id ? styles.stepCompleted : ''}`}
              onClick={() => setActiveStep(s.id)}
            >
              <span className={styles.stepTabTitle}>{s.title}</span>
              <span className={styles.stepTabDesc}>{s.desc}</span>
            </button>
          ))}
        </div>

        <div className={styles.stepContent}>
          {/* STEP 1: LISTEN */}
          {activeStep === 1 && (
            <StepListen memory={memory} isPlayingAudio={isPlayingAudio} setIsPlayingAudio={setIsPlayingAudio} setActiveStep={setActiveStep} />
          )}

          {/* STEP 2: UNDERSTAND */}
          {activeStep === 2 && (
            <StepUnderstand showTranscript={showTranscript} setShowTranscript={setShowTranscript} setActiveStep={setActiveStep} />
          )}

          {/* STEP 3: PRESERVE */}
          {activeStep === 3 && (
            <StepPreserve memory={memory} setActiveStep={setActiveStep} />
          )}

          {/* STEP 4: ASK */}
          {activeStep === 4 && (
            <StepAsk showQuestionAnswer={showQuestionAnswer} setShowQuestionAnswer={setShowQuestionAnswer} setActiveStep={setActiveStep} />
          )}

          {/* STEP 5: VERIFY */}
          {activeStep === 5 && (
            <StepVerify />
          )}
        </div>
      </div>
    </div>
  );
}
