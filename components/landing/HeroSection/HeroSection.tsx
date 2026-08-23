'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Left Column: Headline & Narrative */}
        <div className={styles.leftCol}>
          <h1 className={styles.headline}>Some knowledge disappears quietly.</h1>

          <div className={styles.narrativeGroup}>
            <p className={styles.narrativeLine}>A mechanic retires.</p>
            <p className={styles.narrativeLine}>A teacher leaves the classroom.</p>
            <p className={styles.narrativeLine}>An artisan puts down their tools.</p>
          </div>

          <p className={styles.summaryText}>
            <strong>MemoryMap preserves what experience taught them</strong> — capturing natural voice accounts and transforming tacit intuition into searchable institutional knowledge.
          </p>

          <div className={styles.ctaRow}>
            <Button href="/app/record" variant="primary" size="lg">
              Preserve knowledge →
            </Button>
            <Button href="/app/knowledge" variant="secondary" size="lg">
              Explore the archive
            </Button>
          </div>
        </div>

        {/* Right Column: Documentary Portrait of Ramesh Kumar */}
        <div className={styles.rightCol}>
          <div className={styles.portraitCard}>
            <div className={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop"
                alt="Ramesh Kumar - Master Mechanic"
                className="clean-photo"
              />
            </div>

            <div className={styles.captionBar}>
              <div className={styles.captionInfo}>
                <strong className={styles.expertName}>Ramesh Kumar</strong>
                <span className={styles.expertRole}>Master Mechanic · 35 years practice</span>
              </div>

              <div className={styles.audioPlayer}>
                <button
                  className={styles.playBtn}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <div className={styles.waveBox}>
                  <Waveform isAnimating={isPlaying} barCount={20} height={20} color="var(--color-amber)" />
                </div>
                <span className={styles.timeTag}>02:17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
