'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './ListenToLifeSection.module.css';

export const ListenToLifeSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>PRODUCT INTERFACE</span>
          <h2 className={styles.title}>From Voice → Knowledge</h2>
          <p className={styles.subtitle}>
            Spoken accounts are captured in natural voice, then automatically structured into verified procedures, tips, and warnings.
          </p>
        </div>

        {/* Clean Product Interface Grid */}
        <div className={styles.demoProductGrid}>
          {/* LEFT: Audio Player & Spoken Transcript */}
          <div className={styles.playerCol}>
            <div className={styles.playerCard}>
              <div className={styles.playerHeader}>
                <div className={styles.trackInfo}>
                  <strong className={styles.trackAuthor}>Ramesh Kumar</strong>
                  <span className={styles.trackMeta}>Master Mechanic · Audio Timestamp: 02:17</span>
                </div>
                <button
                  className={styles.playToggle}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>

              <div className={styles.waveformWrapper}>
                <Waveform isAnimating={isPlaying} barCount={36} height={36} color="var(--color-amber)" />
              </div>

              <div className={styles.transcriptBox}>
                <span className={styles.boxLabel}>VERBATIM TRANSCRIPT</span>
                <blockquote className={styles.quoteText}>
                  “When this engine starts making that high-pitched metallic ticking, most guys grab the scanner. But if you put your hand right on the thermostat housing... you feel the pulse. 80% of the time, it's water pump impeller erosion...”
                </blockquote>
              </div>
            </div>
          </div>

          {/* RIGHT: Clean Extracted Structured Result */}
          <div className={styles.resultCol}>
            <div className={styles.structuredCard}>
              <div className={styles.cardTop}>
                <span className={styles.catTag}>Automotive Repair</span>
                <span className={styles.catalogId}>ARCH-0047</span>
              </div>

              <h3 className={styles.entryTitle}>Diagnosing Engine Overheating</h3>

              <div className={styles.sectionBlock}>
                <span className={styles.blockTitle}>PROCEDURE</span>
                <p className={styles.blockContent}>
                  Check coolant circulation flow before replacing the thermostat housing.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.blockTitleAmber}>EXPERT TIP</span>
                <p className={styles.blockContent}>
                  Feel upper vs lower radiator hose temperatures — if lower is cold while upper is scalding, test water pump vanes.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.blockTitleRed}>COMMON MISTAKE</span>
                <p className={styles.blockContent}>
                  Replacing the thermostat immediately without verifying actual impeller cavitation.
                </p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.sourceTag}>Verbatim Audio Source: 02:17</span>
                <Link href="/app/knowledge/demo-memory-1" className={styles.inspectBtn}>
                  Inspect Full Record →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
