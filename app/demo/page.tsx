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
    { id: 1, title: '01 LISTEN', desc: 'Oral Audio Account' },
    { id: 2, title: '02 UNDERSTAND', desc: 'Spoken Transcript' },
    { id: 3, title: '03 PRESERVE', desc: 'AI Structuring' },
    { id: 4, title: '04 ASK', desc: 'Oral Query' },
    { id: 5, title: '05 VERIFY', desc: 'Timestamp Source' }
  ];

  return (
    <div className={styles.container}>
      {/* Exhibition Header */}
      <div className={styles.demoBanner}>
        <div className={styles.badgeRow}>
          <span className={styles.exhibitionTag}>MUSEUM EXHIBITION DEMO MODE</span>
          <span className={styles.stepProgressTag}>EXHIBIT STEP {activeStep} / 05</span>
        </div>

        <h1 className={styles.title}>Meet Ramesh.</h1>
        <p className={styles.subtitle}>
          35 years of mechanical knowledge saved from disappearing quietly. Test how MemoryMap captures and retrieves his oral history.
        </p>

        <Link href="/" className={styles.homeLink}>
          ← Return to MemoryMap Main Page
        </Link>
      </div>

      {/* Practitioner Portrait Card */}
      <div className={styles.expertSpotlight}>
        <div className={styles.expertPhotoFrame}>
          <img src={expert.photoUrl} alt={expert.name} className="docu-photo" />
        </div>

        <div className={styles.expertMeta}>
          <span className={styles.catId}>{expert.catalogId}</span>
          <h2 className={styles.expertName}>{expert.name}</h2>
          <p className={styles.expertRole}>{expert.role} • {expert.yearsExperience} Years Experience • {expert.location}</p>
          <p className={styles.expertBio}>{expert.bio}</p>
        </div>

        <div className={styles.expertStats}>
          <div className={styles.eStat}>
            <span className={styles.eVal}>{expert.memoriesCount}</span>
            <span className={styles.eLabel}>Archived Memories</span>
          </div>
          <div className={styles.eStat}>
            <span className={styles.eVal}>35 yrs</span>
            <span className={styles.eLabel}>Mastery</span>
          </div>
        </div>
      </div>

      {/* Exhibition Interactive Gallery Box */}
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

        {/* Step Gallery Pane */}
        <div className={styles.stepContent}>
          {/* STEP 1: LISTEN */}
          {activeStep === 1 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>EXHIBIT 01 / 05 // LISTEN</span>
                <h2 className={styles.paneTitle}>Play Ramesh's Original Voice Audio</h2>
                <p className={styles.paneDesc}>
                  Hear Ramesh Kumar describe his diagnostic procedure in his own spoken voice.
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
                    {isPlayingAudio ? '⏸ Pause Spoken Account' : '▶ Play Audio (04:32)'}
                  </button>
                </div>

                <div className={styles.waveformWrapper}>
                  <Waveform isAnimating={isPlayingAudio} barCount={40} height={44} color="var(--color-brass)" />
                  <div className={styles.timeLine}>
                    <span>TIMESTAMP: 02:17</span>
                    <span>TOTAL: 04:32</span>
                  </div>
                </div>
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(2)} variant="brass" size="md">
                  Next Exhibit: Inspect Spoken Transcript →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: UNDERSTAND */}
          {activeStep === 2 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>EXHIBIT 02 / 05 // UNDERSTAND</span>
                <h2 className={styles.paneTitle}>Verbatim Spoken Transcript</h2>
                <p className={styles.paneDesc}>
                  Spoken accounts are spontaneous and unstructured before AI processing.
                </p>
              </div>

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
                    Click the toggle above to expand Ramesh's raw verbatim oral transcript...
                  </p>
                )}
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(3)} variant="brass" size="md">
                  Next Exhibit: See AI Knowledge Extraction →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: PRESERVE */}
          {activeStep === 3 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>EXHIBIT 03 / 05 // PRESERVE</span>
                <h2 className={styles.paneTitle}>AI Knowledge Extraction</h2>
                <p className={styles.paneDesc}>
                  MemoryMap automatically extracts procedures, expert tips, common mistakes, and tools.
                </p>
              </div>

              <div className={styles.extractionResultGrid}>
                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}>📋 EXTRACTED PROCEDURE</h3>
                  <ol className={styles.numList}>
                    {memory.procedure?.slice(0, 3).map((p) => (
                      <li key={p.step}>{p.instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}>✦ MASTER PRACTITIONER TIPS</h3>
                  <ul className={styles.bulletList}>
                    {memory.expertTips?.slice(0, 2).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.paneActions}>
                <Link href="/app/knowledge/demo-memory-1" className={styles.fullMemoryLink}>
                  Inspect Full Extracted Memory Card Entry ➔
                </Link>
                <Button onClick={() => setActiveStep(4)} variant="brass" size="md">
                  Next Exhibit: Ask Ramesh's Archive →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: ASK */}
          {activeStep === 4 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>EXHIBIT 04 / 05 // ASK</span>
                <h2 className={styles.paneTitle}>Query Ramesh's Oral Archive</h2>
                <p className={styles.paneDesc}>
                  Test how future learners query Ramesh's preserved knowledge.
                </p>
              </div>

              <div className={styles.qaDemoBox}>
                <div className={styles.qHeader}>
                  <span className={styles.qLabel}>LEARNER QUESTION:</span>
                  <span className={styles.qText}>“My engine overheats after 30 minutes. What should I check first?”</span>
                </div>

                <button
                  className={styles.triggerAnswerBtn}
                  onClick={() => setShowQuestionAnswer(true)}
                >
                  🔍 Query Ramesh Kumar's Archive Index
                </button>

                {showQuestionAnswer && (
                  <div className={styles.aCard}>
                    <span className={styles.aLabel}>RAMESH'S PRESERVED ANSWER:</span>
                    <blockquote className={styles.aText}>
                      “According to Ramesh's 35 years of experience, check coolant flow before replacing the thermostat. Touch upper vs lower hose temperature: if lower hose remains cold while upper is scalding, your water pump impeller is worn.”
                    </blockquote>
                  </div>
                )}
              </div>

              <div className={styles.paneActions}>
                <Button onClick={() => setActiveStep(5)} variant="brass" size="md">
                  Next Exhibit: Verify Audio Timestamp Source →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFY */}
          {activeStep === 5 && (
            <div className={styles.stepPane}>
              <div className={styles.paneHeader}>
                <span className={styles.paneStepTag}>EXHIBIT 05 / 05 // VERIFY</span>
                <h2 className={styles.paneTitle}>Source Audio Timestamp Attribution</h2>
                <p className={styles.paneDesc}>
                  Verify exactly where in the original audio recording the knowledge originated.
                </p>
              </div>

              <div className={styles.attributionCard}>
                <div className={styles.attrHeader}>
                  <span className={styles.attrTag}>SOURCE TIMESTAMP VERIFICATION</span>
                  <span className={styles.stampBadge}>TIMESTAMP: 02:17–03:04</span>
                </div>

                <div className={styles.attrMeta}>
                  <span>Source Practitioner: Ramesh Kumar • Master Mechanic (35 yrs)</span>
                  <span>Memory Catalog Entry: Diagnosing Engine Overheating (#ARCH-0047)</span>
                </div>

                <Link
                  href="/app/knowledge/demo-memory-1"
                  className={styles.listenFullBtn}
                >
                  🔊 Listen to Audio Recording at Timestamp 02:17 ➔
                </Link>
              </div>

              <div className={styles.demoCompleteBox}>
                <h3 className={styles.completeTitle}>🎉 Exhibition Walkthrough Complete</h3>
                <p className={styles.completeText}>
                  You've experienced how MemoryMap captures human wisdom before it's lost and makes it searchable forever.
                </p>
                <div className={styles.finalBtns}>
                  <Button href="/app/record" variant="brass" size="lg">
                    Preserve a Real Story Now →
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
