'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ImpactSection.module.css';

export const ImpactSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>WHY MEMORYMAP</span>
          <h2 className={styles.title}>Knowledge Shouldn't Retire.</h2>
          <p className={styles.subtitle}>
            When someone retires, their job ends. But what happens to everything they learned?
          </p>
        </div>

        <div className={styles.compGrid}>
          <div className={styles.compCard}>
            <span className={styles.cardHeaderRed}>WITHOUT MEMORYMAP</span>
            <h3 className={styles.cardTitle}>Knowledge dies in silence</h3>
            <p className={styles.cardDesc}>
              Experience stays locked inside one person's memory. When they leave, decades of intuition, shortcuts, and diagnostic instincts vanish forever.
            </p>
          </div>

          <div className={styles.compCardGreen}>
            <span className={styles.cardHeaderGreen}>WITH MEMORYMAP</span>
            <h3 className={styles.cardTitle}>Knowledge becomes immortal</h3>
            <p className={styles.cardDesc}>
              Experience becomes searchable, teachable, reusable, and attributed to the original creator for future generations.
            </p>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Ready to preserve a lifetime of experience?</h3>
          <p className={styles.ctaSub}>Start documenting your first oral account in under 5 minutes.</p>
          <div className={styles.ctaButtons}>
            <Button href="/app/record" variant="primary" size="lg">
              Start Preserving Now →
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Explore Interactive Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
