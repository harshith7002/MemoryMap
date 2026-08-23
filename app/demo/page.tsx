'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { EXPERTS, MEMORIES } from '@/lib/data';
import styles from './page.module.css';

export default function DemoPage() {
  const expert = EXPERTS[0]; // Ramesh Kumar
  const memory = MEMORIES[0];

  const [activeStep, setActiveStep] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);

  const steps = [
    { id: 1, title: 'Listen to Original Recording', icon: '🎙️' },
    { id: 2, title: 'Inspect Raw Spoken Transcript', icon: '📝' },
    { id: 3, title: 'View AI Knowledge Extraction', icon: '✨' },
    { id: 4, title: 'Query Archive with Ask MemoryMap', icon: '💬' },
    { id: 5, title: 'Verify Audio Timestamp Source', icon: '⏱️' }
  ];

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.demoBanner}>
        <div className={styles.badgeRow}>
          <span className={styles.demoBadge}>✦ HACKATHON DEMO MODE</span>
          <span className={styles.noAuthBadge}>Zero Authentication • Instant Experience</span>
        </div>

        <h1 className={styles.title}>Preserve & Query Master Mechanical Expertise</h1>
        <p className={styles.subtitle}>
          Step into the shoes of an apprentice querying 35 years of Ramesh Kumar's diagnostic experience.
        </p>

        <Link href="/" className={styles.homeLink}>
          ← Back to MemoryMap Home
        </Link>
      </div>

      {/* Expert Spotlight Card */}
      <div className={styles.expertSpotlight}>
        <div className={styles.expertAvatar}>{expert.avatar}</div>
        <div className={styles.expertMeta}>
          <h2 className={styles.expertName}>{expert.name}</h2>
          <p className={styles.expertRole}>{expert.role} • {expert.yearsExperience} Years Experience</p>
          <p className={styles.expertBio}>{expert.bio}</p>
        </div>
        <div className={styles.expertStats}>
          <div className={styles.eStat}>
            <span className={styles.eVal}>{expert.memoriesCount}</span>
            <span className={styles.eLabel}>Memories</span>
          </div>
          <div className={styles.eStat}>
            <span className={styles.eVal}>35 yrs</span>
            <span className={styles.eLabel}>Mastery</span>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Experience Panel */}
      <div className={styles.interactiveBox}>
        <div className={styles.stepsBar}>
          {steps.map((s) => (
            <button
              key={s.id}
              className={`${styles.stepTab} ${activeStep === s.id ? styles.stepTabActive : ''} ${activeStep > s.id ? styles.stepCompleted : ''}`}
              onClick={() => setActiveStep(s.id)}
            >
              <span className={styles.stepNum}>{s.id}</span>
              <span className={styles.stepTabTitle}>{s.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.stepContent}>
          {/* STEP 1: Listen to Recording */}
          {activeStep === 1 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>STEP 01 OF 05</span>
                <h2 className={styles.paneTitle}>Play Original Voice Audio</h2>
                <p className={styles.paneDesc}>
                  Hear Ramesh Kumar describe his diagnostic approach in his own natural speaking voice.
                </p>
              </div>

              <div className={styles.audioPlayerCard}>
                <div className={styles.playerTop}>
                  <div className={styles.trackInfo}>
                    <span className={styles.trackTitle}>{memory.title}</span>
                    <span className={styles.trackMeta}>Ramesh Kumar • Audio Length: {memory.duration}</span>
                  </div>
                  <button
                    className={styles.playBtnBig}
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  >
                    {isPlayingAudio ? '⏸️ Pause' : '▶ Play Audio (04:32)'}
                  </button>
                </div>

                <div className={styles.waveformWrapper}>
                  <Waveform isAnimating={isPlayingAudio} barCount={40} height={48} color="var(--color-amber)" />
                  <div className={styles.timeLine}>
                    <span>02:17</span>
                    <span>04:32</span>
                  </div>
                </div>
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(2)} variant="amber" size="md">
                  Next Step: Read Spoken Transcript →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Spoken Transcript */}
          {activeStep === 2 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>STEP 02 OF 05</span>
                <h2 className={styles.paneTitle}>Raw Spoken Transcript</h2>
                <p className={styles.paneDesc}>
                  Before AI structuring, spoken thoughts are spontaneous and unstructured.
                </p>
              </div>

              <div className={styles.transcriptCard}>
                <button
                  className={styles.toggleTranscriptBtn}
                  onClick={() => setShowTranscript(!showTranscript)}
                >
                  {showTranscript ? 'Hide Raw Transcript' : 'Show Full Spoken Transcript'}
                </button>

                {showTranscript ? (
                  <blockquote className={styles.rawTranscriptText}>
                    “When this engine starts making that high-pitched metallic ticking, most guys grab the scanner. But if you put your hand right on the thermostat housing... you feel the pulse. The manual points to replacing the thermostat, but 80% of the time, it's water pump impeller cavitation or early head gasket pressure loss...”
                  </blockquote>
                ) : (
                  <p className={styles.transcriptPlaceholder}>
                    Click the button above to expand Ramesh's raw spoken transcript...
                  </p>
                )}
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(3)} variant="amber" size="md">
                  Next Step: See AI Knowledge Extraction →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Knowledge Extraction */}
          {activeStep === 3 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>STEP 03 OF 05</span>
                <h2 className={styles.paneTitle}>AI Knowledge Extraction</h2>
                <p className={styles.paneDesc}>
                  MemoryMap AI automatically extracts procedures, expert tips, common mistakes, and tools.
                </p>
              </div>

              <div className={styles.extractionResultGrid}>
                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}>📋 Extracted Procedure</h3>
                  <ol className={styles.numList}>
                    {memory.procedure?.slice(0, 3).map((p) => (
                      <li key={p.step}>{p.instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}>✦ Master Tips</h3>
                  <ul className={styles.bulletList}>
                    {memory.expertTips?.slice(0, 2).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.paneActions}>
                <Link href="/app/knowledge/demo-memory-1" className={styles.fullMemoryLink}>
                  View Complete Extracted Memory Card ➔
                </Link>
                <Button onClick={() => setActiveStep(4)} variant="amber" size="md">
                  Next Step: Ask a Question →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Ask MemoryMap */}
          {activeStep === 4 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>STEP 04 OF 05</span>
                <h2 className={styles.paneTitle}>Ask MemoryMap AI Archive</h2>
                <p className={styles.paneDesc}>
                  Experience how future learners query Ramesh's preserved knowledge.
                </p>
              </div>

              <div className={styles.qaDemoBox}>
                <div className={styles.qHeader}>
                  <span className={styles.qLabel}>Learner Question:</span>
                  <span className={styles.qText}>“My engine overheats after 30 minutes. What should I check first?”</span>
                </div>

                <button
                  className={styles.triggerAnswerBtn}
                  onClick={() => setShowQuestionAnswer(true)}
                >
                  🔍 Query Ramesh Kumar's Archive
                </button>

                {showQuestionAnswer && (
                  <div className={styles.aCard}>
                    <span className={styles.aLabel}>Ramesh's Preserved Answer:</span>
                    <blockquote className={styles.aText}>
                      “According to Ramesh's 35 years of experience, check coolant flow before replacing the thermostat. Feel upper vs lower hose temperature: if lower hose remains cold while upper is scalding, your water pump impeller is worn.”
                    </blockquote>
                  </div>
                )}
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(5)} variant="amber" size="md">
                  Next Step: Verify Timestamp Source →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Timestamp Source Linking */}
          {activeStep === 5 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>STEP 05 OF 05</span>
                <h2 className={styles.paneTitle}>Source Audio Timestamp Attribution</h2>
                <p className={styles.paneDesc}>
                  Verify exactly where in the original recording the knowledge originated.
                </p>
              </div>

              <div className={styles.attributionCard}>
                <div className={styles.attrHeader}>
                  <span className={styles.attrTag}>TIMESTAMP VERIFICATION</span>
                  <span className={styles.stampBadge}>Recording: 02:17–03:04</span>
                </div>

                <div className={styles.attrMeta}>
                  <span>Source Expert: Ramesh Kumar • Master Mechanic (35 yrs)</span>
                  <span>Memory: Diagnosing Engine Overheating</span>
                </div>

                <Link
                  href="/app/knowledge/demo-memory-1"
                  className={styles.listenFullBtn}
                >
                  🔊 Listen to Audio at Timestamp 02:17 ➔
                </Link>
              </div>

              <div className={styles.demoCompleteBox}>
                <h3 className={styles.completeTitle}>🎉 Demo Experience Complete</h3>
                <p className={styles.completeText}>
                  You've experienced how MemoryMap captures human wisdom and makes it searchable forever.
                </p>
                <div className={styles.finalBtns}>
                  <Button href="/app/record" variant="amber" size="lg">
                    Preserve a Real Story Now
                  </Button>
                  <Button href="/app/dashboard" variant="secondary" size="lg">
                    Go to Full Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
