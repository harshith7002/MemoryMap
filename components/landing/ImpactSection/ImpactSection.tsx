'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ImpactSection.module.css';

export const ImpactSection: React.FC = () => {
  const impacts = [
    {
      icon: '🛡️',
      title: 'Preserve Disappearing Expertise',
      desc: 'Ensure tacit knowledge built over 30+ years is permanently documented before retirement.'
    },
    {
      icon: '🌱',
      title: 'Help Younger Generations Learn',
      desc: 'Give apprentices and junior engineers direct access to master tips that manuals miss.'
    },
    {
      icon: '🏛️',
      title: 'Document Heritage & Craft',
      desc: 'Create an intelligent digital museum of traditional techniques and cultural heritage.'
    },
    {
      icon: '🏢',
      title: 'Reduce Operational Knowledge Loss',
      desc: 'Prevent costly mistakes and downtime when veteran technicians leave organizations.'
    },
    {
      icon: '⭐',
      title: 'Give Experts a Lasting Digital Legacy',
      desc: 'Celebrate human stories and ensure their wisdom continues helping others indefinitely.'
    }
  ];

  return (
    <section id="impact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>SOCIAL IMPACT</span>
          <h2 className={styles.title}>Knowledge Shouldn't Retire.</h2>
          <p className={styles.subtitle}>
            When someone retires, their job ends. But what happens to everything they learned?
          </p>
        </div>

        {/* Comparison Row */}
        <div className={styles.comparisonRow}>
          <div className={styles.compBoxBefore}>
            <span className={styles.boxTag}>WITHOUT MEMORYMAP</span>
            <h3 className={styles.boxTitle}>Knowledge dies in silence</h3>
            <p className={styles.boxDesc}>
              Experience stays locked inside one person's memory. When they leave, decades of intuition, shortcuts, and diagnostic instincts vanish forever.
            </p>
          </div>

          <div className={styles.arrowDivider}>➔</div>

          <div className={styles.compBoxAfter}>
            <span className={styles.boxTagGreen}>WITH MEMORYMAP</span>
            <h3 className={styles.boxTitle}>Knowledge becomes immortal</h3>
            <p className={styles.boxDesc}>
              Experience becomes searchable, teachable, reusable, and attributed to the original creator for future generations.
            </p>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className={styles.grid}>
          {impacts.map((item, idx) => (
            <div key={idx} className={styles.impactCard}>
              <div className={styles.iconCircle}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA Banner */}
        <div className={styles.finalBanner}>
          <h3 className={styles.bannerTitle}>
            Ready to preserve a lifetime of experience?
          </h3>
          <p className={styles.bannerSubtitle}>
            It takes just 5 minutes of talking to capture an expert's first memory.
          </p>
          <div className={styles.bannerActions}>
            <Button href="/app/record" variant="amber" size="lg">
              Start Preserving Now
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Explore Demo Mode
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
