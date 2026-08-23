'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import { Button } from '@/components/ui/Button/Button';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
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
            <div className={styles.stepPane}>
              <h2 className={styles.paneTitle}>01 / Listen to Ramesh's original voice recording</h2>
              <p className={styles.paneDesc}>Hear Ramesh describe his cooling system diagnostic procedure in his own spoken voice.</p>

              <div className={styles.audioPlayerCard}>
                <div className={styles.playerTop}>
                  <div className={styles.trackInfo}>
                    <strong className={styles.trackTitle}>{memory.title}</strong>
                    <span className={styles.trackMeta}>Ramesh Kumar · Length: {memory.duration}</span>
                  </div>
                  <button
                    className={styles.playBtn}
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  >
                    {isPlayingAudio ? '⏸ Pause' : '▶ Play (04:32)'}
                  </button>
                </div>

                <div className={styles.waveformWrapper}>
                  <Waveform isAnimating={isPlayingAudio} barCount={36} height={36} color="var(--color-amber)" />
                </div>
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(2)} variant="primary" size="md">
                  Next: Inspect Transcript →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: UNDERSTAND */}
          {activeStep === 2 && (
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
          )}

          {/* STEP 3: PRESERVE */}
          {activeStep === 3 && (
            <div className={styles.stepPane}>
              <h2 className={styles.paneTitle}>03 / AI Knowledge extraction</h2>
              <p className={styles.paneDesc}>MemoryMap automatically extracts procedures, expert tips, common mistakes, and tools.</p>

              <div className={styles.extractionResultGrid}>
                <div className={styles.resultBox}>
                  <strong className={styles.boxTag}>PROCEDURE</strong>
                  <ol className={styles.numList}>
                    {memory.procedure?.slice(0, 3).map((p) => (
                      <li key={p.step}>{p.instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className={styles.resultBox}>
                  <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
                  <ul className={styles.bulletList}>
                    {memory.expertTips?.slice(0, 2).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.paneActions}>
                <Link href="/app/knowledge/demo-memory-1" className={styles.fullMemoryLink}>
                  View Full Memory Record →
                </Link>
                <Button onClick={() => setActiveStep(4)} variant="primary" size="md">
                  Next: Query Archive →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: ASK */}
          {activeStep === 4 && (
            <div className={styles.stepPane}>
              <h2 className={styles.paneTitle}>04 / Query Ramesh's oral archive</h2>
              <p className={styles.paneDesc}>Test how future learners query Ramesh's preserved knowledge.</p>

              <div className={styles.qaDemoBox}>
                <div className={styles.qHeader}>
                  <span className={styles.qLabel}>Learner question:</span>
                  <p className={styles.qText}>“My engine overheats after 30 minutes. What should I check first?”</p>
                </div>

                <button
                  className={styles.triggerAnswerBtn}
                  onClick={() => setShowQuestionAnswer(true)}
                >
                  Ask Ramesh's Archive →
                </button>

                {showQuestionAnswer && (
                  <div className={styles.aCard}>
                    <strong className={styles.aLabel}>Ramesh's preserved answer:</strong>
                    <blockquote className={styles.aText}>
                      “According to Ramesh's 35 years of experience, check coolant flow before replacing the thermostat. Touch upper vs lower hose temperature: if lower hose remains cold while upper is scalding, your water pump impeller is worn.”
                    </blockquote>
                  </div>
                )}
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(5)} variant="primary" size="md">
                  Next: Source Verification →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFY */}
          {activeStep === 5 && (
            <div className={styles.stepPane}>
              <h2 className={styles.paneTitle}>05 / Source timestamp verification</h2>
              <p className={styles.paneDesc}>Verify exactly where in the original audio recording the knowledge originated.</p>

              <div className={styles.attributionCard}>
                <div className={styles.attrHeader}>
                  <span className={styles.attrTag}>SOURCE VERIFICATION</span>
                  <span className={styles.stampBadge}>Timestamp: 02:17–03:04</span>
                </div>

                <div className={styles.attrMeta}>
                  <span>Source: Ramesh Kumar · Master Mechanic (35 yrs)</span>
                  <span>Memory Catalog Entry: Diagnosing Engine Overheating (#ARCH-0047)</span>
                </div>

                <Link href="/app/knowledge/demo-memory-1" className={styles.listenFullBtn}>
                  ▶ Listen to recording at 02:17 →
                </Link>
              </div>

              <div className={styles.demoCompleteBox}>
                <h3 className={styles.completeTitle}>Exhibition Walkthrough Complete</h3>
                <p className={styles.completeText}>
                  You've experienced how MemoryMap captures human wisdom before it's lost and makes it searchable forever.
                </p>
                <div className={styles.finalBtns}>
                  <Button href="/app/record" variant="primary" size="lg">
                    Preserve a Real Memory Now →
                  </Button>
                  <Button href="/app/dashboard" variant="secondary" size="lg">
                    Go to Overview
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
