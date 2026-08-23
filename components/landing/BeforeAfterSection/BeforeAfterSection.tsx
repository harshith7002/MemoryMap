'use client';

import React from 'react';
import styles from './BeforeAfterSection.module.css';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>TRANSFORMATION</span>
          <h2 className={styles.title}>From Conversation to Structured Knowledge</h2>
          <p className={styles.subtitle}>
            See how MemoryMap converts 8 minutes of spontaneous spoken thoughts into clean, actionable, verified knowledge cards.
          </p>
        </div>

        <div className={styles.comparisonGrid}>
          {/* LEFT: Before */}
          <div className={styles.columnBefore}>
            <div className={styles.colHeader}>
              <span className={styles.colBadgeRed}>BEFORE MEMORYMAP</span>
              <span className={styles.colMeta}>8-minute raw voice recording</span>
            </div>

            <div className={styles.rawTranscriptCard}>
              <div className={styles.audioWaveHeader}>
                <span>🎙️ Spoken Recording</span>
                <span className={styles.monoTime}>08:14</span>
              </div>

              <div className={styles.transcriptBox}>
                <p className={styles.transcriptText}>
                  “...Yeah so like I was saying, when you start up that engine in the morning, if it makes that metallic ticking sound, most guys grab the scanner. But you know, back in 94 my master showed me... you don't start swapping parts. You put your hand right on the thermostat housing housing line. Is it vibrating? If it's vibrating and the lower hose is cold while the top is burning hot, that's not your thermostat sticking, that's water pump impeller erosion... Oh and don't forget to smell the radiator cap! If it smells like burnt sugar, your head gasket is seeping...”
                </p>
              </div>

              <div className={styles.transcriptFooter}>
                <span className={styles.warningTag}>❌ Messy • Unstructured • Trapped in Audio</span>
              </div>
            </div>
          </div>

          {/* CENTER: Arrow Transform Indicator */}
          <div className={styles.transformCenter}>
            <div className={styles.transformPill}>
              <span className={styles.sparkle}>✨</span>
              <span>AI STRUCTURING</span>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </div>

          {/* RIGHT: After */}
          <div className={styles.columnAfter}>
            <div className={styles.colHeader}>
              <span className={styles.colBadgeGreen}>AFTER MEMORYMAP</span>
              <span className={styles.colMeta}>Instant structured knowledge</span>
            </div>

            <div className={styles.extractedKnowledgeCard}>
              <div className={styles.extractionSummaryHeader}>
                <h3 className={styles.memoryTitle}>Diagnosing Engine Overheating</h3>
                <span className={styles.catTag}>Automotive Diagnostics</span>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>1</span>
                  <span className={styles.statLabel}>Procedure</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>4</span>
                  <span className={styles.statLabel}>Expert Tips</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>2</span>
                  <span className={styles.statLabel}>Warnings</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>3</span>
                  <span className={styles.statLabel}>Tools</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>1</span>
                  <span className={styles.statLabel}>Story</span>
                </div>
              </div>

              <div className={styles.previewStep}>
                <span className={styles.stepBadge}>Step 1</span>
                <span className={styles.stepText}>
                  Feel upper vs lower hose temperature prior to thermostat removal.
                </span>
              </div>

              <div className={styles.previewTip}>
                <span className={styles.tipBadge}>✦ Tip</span>
                <span className={styles.tipText}>
                  Burnt sweet smell at radiator cap indicates head gasket seepage.
                </span>
              </div>

              <div className={styles.verifiedFooter}>
                <span className={styles.checkIcon}>✓</span>
                <span>Verified Source: Ramesh Kumar (35 yrs) • Timestamp: 02:17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
