'use client';

import React from 'react';
import styles from './BeforeAfterSection.module.css';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.metaLabel}>DOCUMENTARY TRANSFORMATION</span>
          <h2 className={styles.title}>From Spoken Thought to Preserved Heritage</h2>
          <p className={styles.subtitle}>
            A dramatic contrast between unrecorded oral speech and a permanent, source-verified catalog entry.
          </p>
        </div>

        <div className={styles.transformationGrid}>
          {/* LEFT: Before */}
          <div className={styles.paneBefore}>
            <div className={styles.paneMetaHeader}>
              <span className={styles.tagBefore}>BEFORE // SPOKEN RECORDING</span>
              <span className={styles.timeTag}>8 MINUTES AUDIO</span>
            </div>

            <div className={styles.audioExhibitCard}>
              <div className={styles.audioWaveMeta}>
                <span>🎙️ Ramesh Kumar (35 yrs)</span>
                <span className={styles.monoTime}>08:14</span>
              </div>

              <div className={styles.transcriptQuoteBox}>
                <blockquote className={styles.quoteText}>
                  “...Yeah so when you start up that engine in the morning, if it makes that metallic ticking, most guys grab the scanner. But back in 1994 my master showed me... you put your hand right on the thermostat housing line. Is it vibrating? If it's vibrating and the lower hose is cold while the top is burning hot, that's not your thermostat sticking, that's water pump impeller erosion... Oh and don't forget to smell the radiator cap! If it smells like burnt sugar, your head gasket is seeping...”
                </blockquote>
              </div>

              <div className={styles.statusBoxRed}>
                ❌ Unstructured • Trapped in unindexed voice recording
              </div>
            </div>
          </div>

          {/* CENTER: Archival Transformation Indicator */}
          <div className={styles.centerArrowCol}>
            <div className={styles.transformPill}>
              <span className={styles.arrowIcon}>➔</span>
              <span className={styles.pillText}>MEMORYMAP STRUCTURING</span>
            </div>
          </div>

          {/* RIGHT: After */}
          <div className={styles.paneAfter}>
            <div className={styles.paneMetaHeader}>
              <span className={styles.tagAfter}>AFTER // CATALOG ENTRY #ARCH-2026-0047</span>
              <span className={styles.timeTagGreen}>VERIFIED ARCHIVE</span>
            </div>

            <div className={styles.catalogRecordCard}>
              <div className={styles.recordHeader}>
                <h3 className={styles.recordTitle}>Diagnosing Engine Overheating</h3>
                <span className={styles.catBadge}>Automotive Diagnostics</span>
              </div>

              <div className={styles.extractedCountsRow}>
                <div className={styles.countBadge}>1 Procedure</div>
                <div className={styles.countBadge}>4 Expert Tips</div>
                <div className={styles.countBadge}>2 Warnings</div>
                <div className={styles.countBadge}>3 Tools</div>
              </div>

              <div className={styles.previewStepBox}>
                <span className={styles.stepNum}>STEP 1</span>
                <span className={styles.stepText}>
                  Check tactile lower hose temperature prior to thermostat removal.
                </span>
              </div>

              <div className={styles.previewTipBox}>
                <span className={styles.tipLabel}>✦ MASTER TIP</span>
                <span className={styles.tipText}>
                  Burnt sweet scent at reservoir cap = head gasket pressure seepage.
                </span>
              </div>

              <div className={styles.verifiedFooter}>
                <span className={styles.checkMark}>✓</span>
                <span>Verified Source: Ramesh Kumar • Audio Timestamp: 02:17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
