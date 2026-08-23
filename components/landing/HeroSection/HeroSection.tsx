'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={styles.fullScreenHero}>
      {/* Top Archive Metadata Bar */}
      <div className={styles.topArchiveBar}>
        <span className={styles.brandTitle}>MEMORYMAP</span>
        <span className={styles.archiveTag}>[ ARCHIVE RECORD #0047 ]</span>
        <span className={styles.catLabel}>ORAL KNOWLEDGE REGISTRY</span>
      </div>

      {/* Hero Viewport: Centered Focus on Ramesh Kumar */}
      <div className={styles.portraitCenterStage}>
        {/* Large Documentary Portrait Frame */}
        <div className={styles.largePortraitFrame}>
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop"
            alt="Ramesh Kumar - Master Mechanic"
            className={styles.portraitImage}
          />
          <div className={styles.photoVignette} />

          {/* Overlay Audio Control Trigger */}
          <div className={styles.audioOverlayBar}>
            <button
              className={styles.playAudioBtn}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ PAUSE AUDIO' : '▶ LISTEN TO RAMESH (02:17)'}
            </button>
            <div className={styles.waveInline}>
              <Waveform isAnimating={isPlaying} barCount={28} height={22} color="var(--color-brass)" />
            </div>
            <span className={styles.timeMono}>02:17 / 04:32</span>
          </div>
        </div>

        {/* Archival Subject Metadata & Caption */}
        <div className={styles.subjectMetaBlock}>
          <h1 className={styles.subjectName}>RAMESH KUMAR</h1>
          <p className={styles.subjectRole}>MASTER MECHANIC · 35 YEARS PRACTICE · MUMBAI WORKSHOP</p>
          <span className={styles.recDateMono}>FIELD RECORDING DATED: 18 AUGUST 2026</span>

          <blockquote className={styles.spokenQuote}>
            “I've learned to hear an engine before I learned to understand it.”
          </blockquote>
        </div>
      </div>

      {/* Product Mission Statement BELOW the visual */}
      <div className={styles.productMissionSection}>
        <div className={styles.missionContainer}>
          <h2 className={styles.missionHeadline}>
            35 years of knowledge should not end on the day someone retires.
          </h2>

          <p className={styles.missionSubtext}>
            MemoryMap records the unwritten practical experience that normally disappears when veteran practitioners leave — transforming natural voice conversations into verified institutional memory.
          </p>

          <div className={styles.ctaRow}>
            <Button href="/app/record" variant="brass" size="lg">
              Preserve Someone's Knowledge →
            </Button>
            <Button href="/app/knowledge" variant="secondary" size="lg">
              Explore the Archive Index
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
