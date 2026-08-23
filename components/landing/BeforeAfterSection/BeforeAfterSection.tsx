'use client';

import React from 'react';
import styles from './BeforeAfterSection.module.css';

export const BeforeAfterSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Talk',
      sub: 'Natural Spoken Accounts',
      desc: 'No documentation marathon. Practitioners speak naturally into a phone or microphone.'
    },
    {
      num: '02',
      title: 'Understand',
      sub: 'AI Memory Structuring',
      desc: 'MemoryMap automatically identifies procedures, master tips, warnings, tools, and backstory.'
    },
    {
      num: '03',
      title: 'Preserve',
      sub: 'Permanent Archival Index',
      desc: 'Knowledge is indexed into permanent profiles linked to the original practitioner.'
    },
    {
      num: '04',
      title: 'Pass It On',
      sub: 'Source-Verified Retrieval',
      desc: 'Learners query the archive and receive verified answers with original audio timestamps.'
    }
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>METHODOLOGY</span>
          <h2 className={styles.title}>How MemoryMap Works</h2>
          <p className={styles.subtitle}>
            A simple, dignified process to transform spoken intuition into living institutional memory.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((s) => (
            <div key={s.num} className={styles.stepCard}>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <span className={styles.stepSub}>{s.sub}</span>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
