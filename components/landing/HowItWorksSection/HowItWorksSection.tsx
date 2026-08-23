'use client';

import React from 'react';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Talk',
      sub: 'Spontaneous oral account.',
      desc: 'No documentation marathon. Experts speak naturally into a phone or microphone.',
      code: 'VOICE_CAPTURE'
    },
    {
      num: '02',
      title: 'Understand',
      sub: 'AI structures spoken thought.',
      desc: 'MemoryMap identifies procedures, expert insights, warnings, tools, and personal backstory.',
      code: 'NLP_EXTRACTION'
    },
    {
      num: '03',
      title: 'Preserve',
      sub: 'Permanent archival cataloging.',
      desc: 'Knowledge is indexed into a permanent profile: Expert → Skills → Memories → Procedures → Stories.',
      code: 'CATALOG_INDEXING'
    },
    {
      num: '04',
      title: 'Pass It On',
      sub: 'Source-verified query engine.',
      desc: 'Future learners search and ask questions, receiving verified answers with original audio timestamps.',
      code: 'TIMESTAMP_RETRIEVAL'
    }
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.metaLabel}>ARCHIVAL METHODOLOGY</span>
          <h2 className={styles.title}>From Spoken Experience to Living Knowledge</h2>
          <p className={styles.subtitle}>
            How MemoryMap converts spontaneous oral tradition into permanent, verifiable institutional memory.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((s) => (
            <div key={s.num} className={styles.stepCard}>
              <div className={styles.cardTop}>
                <span className={styles.stepNum}>{s.num}</span>
                <span className={styles.stepCode}>{s.code}</span>
              </div>

              <h3 className={styles.stepTitle}>{s.title}</h3>
              <h4 className={styles.stepSub}>{s.sub}</h4>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
