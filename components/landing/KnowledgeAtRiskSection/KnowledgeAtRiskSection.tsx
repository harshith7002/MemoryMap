'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { KNOWLEDGE_AT_RISK } from '@/lib/data';
import styles from './KnowledgeAtRiskSection.module.css';

export const KnowledgeAtRiskSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.urgencyBadge}>
            <span className={styles.redPulse} />
            <span>KNOWLEDGE AT RISK</span>
          </div>

          <h2 className={styles.title}>Some knowledge is disappearing right now.</h2>

          <p className={styles.disclaimer}>
            *These are fictional demo examples illustrating the real-world urgency of capturing oral tradition and tacit expertise before it is lost.
          </p>
        </div>

        <div className={styles.riskGrid}>
          {KNOWLEDGE_AT_RISK.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.catBadge}>{item.category}</span>
                <span className={styles.urgencyTag}>CRITICAL</span>
              </div>

              <h3 className={styles.itemTitle}>{item.title}</h3>

              <div className={styles.practitionersBox}>
                <span className={styles.bigCount}>{item.practitionersLeft}</span>
                <span className={styles.countText}>known practitioners remaining</span>
              </div>

              <p className={styles.itemDesc}>{item.description}</p>

              <Button href="/app/record" variant="amber" size="sm" className={styles.preserveBtn}>
                Preserve someone's knowledge →
              </Button>
            </div>
          ))}
        </div>

        <div className={styles.ctaFooter}>
          <p className={styles.ctaText}>
            Do you know an expert retiring soon? Help them archive their life's work today.
          </p>
          <Button href="/app/record" variant="amber" size="lg">
            Start Preserving Expertise
          </Button>
        </div>
      </div>
    </section>
  );
};
