'use client';

import React from 'react';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Talk',
      subtitle: 'No forms. No documentation marathon.',
      desc: 'Experts simply talk naturally into a microphone. MemoryMap prompts them with guided questions about their craft.',
      badge: 'Natural Voice',
      visual: (
        <div className={styles.visualBox}>
          <div className={styles.micCircle}>🎙️</div>
          <Waveform isAnimating={true} barCount={16} height={24} color="var(--color-amber)" />
          <span className={styles.timeLabel}>Rec: 04:32</span>
        </div>
      )
    },
    {
      num: '02',
      title: 'Understand',
      subtitle: 'AI structures spontaneous thoughts.',
      desc: 'MemoryMap identifies step-by-step procedures, expert tips, warnings, tools, and personal backstory.',
      badge: 'AI Extraction',
      visual: (
        <div className={styles.visualBox}>
          <div className={styles.chipsContainer}>
            <span className={styles.chipGreen}>📋 Procedure</span>
            <span className={styles.chipAmber}>✦ Expert Tip</span>
            <span className={styles.chipRed}>⚠️ Warning</span>
            <span className={styles.chipBrown}>🛠️ Tools</span>
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'Preserve',
      subtitle: 'Creates a permanent digital profile.',
      desc: 'Knowledge is indexed into a permanent archive: Expert → Skills → Memories → Procedures → Stories.',
      badge: 'Permanent Archive',
      visual: (
        <div className={styles.visualBox}>
          <div className={styles.flowChain}>
            <span className={styles.node}>Expert</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.node}>Skills</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.node}>Memories</span>
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Pass It On',
      subtitle: 'Future learners search and ask questions.',
      desc: 'Learners query the archive and get verified answers linked directly to original recording timestamps.',
      badge: 'Source Attributed',
      visual: (
        <div className={styles.visualBox}>
          <div className={styles.qaSnippet}>
            <span className={styles.qText}>“What to check when overheating?”</span>
            <span className={styles.aStamp}>🔊 Listen at 02:17</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>SIMPLE PROCESS</span>
          <h2 className={styles.title}>How MemoryMap Works</h2>
          <p className={styles.subtitle}>
            From casual spoken conversation to structured, searchable institutional knowledge in 4 simple steps.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((s, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNumHeader}>
                <span className={styles.stepNum}>{s.num}</span>
                <span className={styles.badge}>{s.badge}</span>
              </div>

              {s.visual}

              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <h4 className={styles.stepSub}>{s.subtitle}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
