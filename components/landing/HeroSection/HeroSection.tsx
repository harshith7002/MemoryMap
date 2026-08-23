'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Column: Text & CTAs */}
        <div className={styles.textContent}>
          <div className={styles.taglineBadge}>
            <span className={styles.badgePulse} />
            <span>Preserve human knowledge before it leaves</span>
          </div>

          <h1 className={styles.title}>
            What if decades of knowledge disappeared with the person who carried it?
          </h1>

          <p className={styles.subtitle}>
            MemoryMap preserves human expertise through natural voice conversations. Capture an expert's voice, transform their experience into structured, searchable knowledge, and pass it on to the next generation.
          </p>

          <div className={styles.actions}>
            <Button href="/app/record" variant="amber" size="lg">
              Preserve a Story
            </Button>
            <Button href="/app/knowledge" variant="secondary" size="lg">
              Explore Knowledge
            </Button>
          </div>

          <div className={styles.trustBadge}>
            <div className={styles.avatarsGroup}>
              <span className={styles.avatar}>👨‍🔧</span>
              <span className={styles.avatar}>👩‍🌾</span>
              <span className={styles.avatar}>👨‍🏫</span>
            </div>
            <span className={styles.trustText}>
              Over <strong>47 expert memories</strong> preserved this month
            </span>
          </div>
        </div>

        {/* Right Column: Split Visual Transformation Card */}
        <div className={styles.visualColumn}>
          <div className={styles.transformationCard}>
            {/* Top Section: Voice Input */}
            <div className={styles.voiceSection}>
              <div className={styles.voiceHeader}>
                <span className={styles.sectionBadge}>VOICE</span>
                <span className={styles.expertMeta}>Ramesh Kumar • Master Mechanic</span>
              </div>
              <blockquote className={styles.voiceQuote}>
                “When this engine starts making that sound, the manual points to the thermostat. But put your palm right here — 80% of the time, it's the water pump.”
              </blockquote>
              <div className={styles.waveformWrapper}>
                <Waveform isAnimating={true} barCount={26} height={32} color="var(--color-amber)" />
                <span className={styles.timeBadge}>02:17</span>
              </div>
            </div>

            {/* Middle Divider: AI Process */}
            <div className={styles.aiDivider}>
              <div className={styles.dividerLine} />
              <div className={styles.aiPill}>
                <span className={styles.sparkleIcon}>✨</span>
                <span>MEMORYMAP AI</span>
              </div>
              <div className={styles.dividerLine} />
            </div>

            {/* Bottom Section: Structured Knowledge Output */}
            <div className={styles.knowledgeSection}>
              <div className={styles.knowledgeHeader}>
                <span className={styles.knowledgeTitle}>Diagnosing Engine Overheating</span>
                <span className={styles.categoryBadge}>Automotive</span>
              </div>

              <div className={styles.gridCards}>
                <div className={styles.kCard}>
                  <span className={styles.kLabel}>📋 PROCEDURE</span>
                  <span className={styles.kVal}>Check water pump lower hose temperature prior to thermostat replacement</span>
                </div>
                <div className={styles.kCard}>
                  <span className={styles.kLabel}>✦ EXPERT TIP</span>
                  <span className={styles.kVal}>Burnt sweet smell at radiator cap indicates head gasket pressure loss</span>
                </div>
                <div className={styles.kCard}>
                  <span className={styles.kLabel}>⚠️ COMMON MISTAKE</span>
                  <span className={styles.kVal}>Swapping thermostat immediately without checking coolant flow</span>
                </div>
                <div className={styles.kCard}>
                  <span className={styles.kLabel}>🛠️ TOOLS EXTRACTED</span>
                  <span className={styles.kVal}>Pressure kit, IR Temp Gun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
