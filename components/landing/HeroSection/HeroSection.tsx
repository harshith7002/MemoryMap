'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Top Archive Registry Classification Header */}
      <div className={styles.metaTop}>
        <span className={styles.catalogNum}>CATALOG REGISTRY // VOL. 2026</span>
        <span className={styles.archiveType}>DOCUMENTARY ORAL ARCHIVE</span>
      </div>

      <div className={styles.container}>
        {/* Editorial Typography Banner */}
        <div className={styles.headerBlock}>
          <h1 className={styles.titleStatement}>Some knowledge disappears quietly.</h1>

          <div className={styles.narrativeStanza}>
            <p className={styles.stanzaLine}>A mechanic retires.</p>
            <p className={styles.stanzaLine}>A teacher leaves the classroom.</p>
            <p className={styles.stanzaLine}>An artisan puts down their tools.</p>
            <p className={styles.stanzaHighlight}>And decades of unwritten experience leave with them.</p>
          </div>

          <p className={styles.missionSummary}>
            MemoryMap preserves what experience taught them through natural voice recordings, transforming spoken stories into verified, searchable institutional knowledge.
          </p>

          <div className={styles.ctaRow}>
            <Button href="/app/record" variant="primary" size="lg">
              Preserve someone's knowledge →
            </Button>
            <Button href="/app/knowledge" variant="secondary" size="lg">
              Explore the archive
            </Button>
          </div>
        </div>

        {/* Archival Documentary Visual Unit */}
        <div className={styles.archivalFrame}>
          <div className={styles.photoContainer}>
            {/* Visual Grain & Photo Crop Treatment */}
            <div className={styles.archivalImageWrap}>
              <div className={styles.portraitPlaceholder}>
                <span className={styles.expertEmoji}>👨‍🔧</span>
                <div className={styles.photoOverlayGradient} />
              </div>
            </div>

            {/* Audio & Archival Metadata Unit */}
            <div className={styles.archivalMetaCard}>
              <div className={styles.metaTopRow}>
                <span className={styles.liveAudioBadge}>● FIELD RECORDING #0047</span>
                <span className={styles.recDate}>18 August 2026</span>
              </div>

              <blockquote className={styles.spokenQuote}>
                “When this engine starts making that sound... you put your palm on the lower hose. 80% of the time, the manual is wrong about the thermostat.”
              </blockquote>

              <div className={styles.waveformPlayerBar}>
                <span className={styles.playIcon}>▶</span>
                <Waveform isAnimating={true} barCount={36} height={28} color="var(--color-brass)" />
                <span className={styles.timeTag}>02:17 / 04:32</span>
              </div>

              <div className={styles.subjectCaption}>
                <strong className={styles.subjectName}>Ramesh Kumar</strong>
                <span className={styles.subjectRole}>Master Mechanic · 35 years experience · Mumbai Workshop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
