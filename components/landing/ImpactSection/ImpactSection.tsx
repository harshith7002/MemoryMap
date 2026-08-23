'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ImpactSection.module.css';

export const ImpactSection: React.FC = () => {
  const pillars = [
    {
      id: '01',
      title: 'Preserve Disappearing Expertise',
      desc: 'Ensure tacit knowledge built over 30+ years is permanently documented before retirement.'
    },
    {
      id: '02',
      title: 'Pass Wisdom to Next Generations',
      desc: 'Give apprentices and junior engineers direct access to master tips that official manuals omit.'
    },
    {
      id: '03',
      title: 'Document Heritage & Craft',
      desc: 'Create an intelligent digital museum of traditional techniques and cultural heritage.'
    },
    {
      id: '04',
      title: 'Prevent Operational Knowledge Loss',
      desc: 'Eliminate costly diagnostic mistakes and downtime when veteran technicians leave organizations.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.metaLabel}>INSTITUTIONAL IMPACT</span>
          <h2 className={styles.title}>Knowledge Shouldn't Retire.</h2>
          <p className={styles.subtitle}>
            When someone retires, their job ends. But what happens to everything they learned?
          </p>
        </div>

        {/* Archival Comparison Grid */}
        <div className={styles.comparisonGrid}>
          <div className={styles.compBoxDark}>
            <span className={styles.boxTagRed}>WITHOUT MEMORYMAP</span>
            <h3 className={styles.boxTitle}>Knowledge dies in silence</h3>
            <p className={styles.boxDesc}>
              Experience stays locked inside one person's memory. When they leave, decades of intuition, shortcuts, and diagnostic instincts vanish forever.
            </p>
          </div>

          <div className={styles.compBoxLight}>
            <span className={styles.boxTagGreen}>WITH MEMORYMAP</span>
            <h3 className={styles.boxTitle}>Knowledge becomes immortal</h3>
            <p className={styles.boxDesc}>
              Experience becomes searchable, teachable, reusable, and attributed to the original creator for future generations.
            </p>
          </div>
        </div>

        {/* Impact Pillars */}
        <div className={styles.pillarsGrid}>
          {pillars.map((p) => (
            <div key={p.id} className={styles.pillarCard}>
              <span className={styles.pillarNum}>{p.id}</span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Archival Banner */}
        <div className={styles.finalCallout}>
          <div className={styles.calloutText}>
            <h3 className={styles.calloutTitle}>Ready to preserve a lifetime of experience?</h3>
            <p className={styles.calloutSub}>It takes just 5 minutes of talking to record an expert's first memory.</p>
          </div>

          <div className={styles.calloutActions}>
            <Button href="/app/record" variant="brass" size="lg">
              Start Preserving Now →
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Explore Interactive Exhibition
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
