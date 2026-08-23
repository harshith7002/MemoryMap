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
          <span className={styles.tag}>CRITICAL HERITAGE</span>
          <h2 className={styles.title}>Some things are known by very few people.</h2>
          <p className={styles.subtitle}>
            Demonstration list illustrating real-world urgency of capturing oral accounts before practitioners retire.
          </p>
        </div>

        <div className={styles.riskGrid}>
          {KNOWLEDGE_AT_RISK.map((item) => (
            <div key={item.id} className={styles.riskCard}>
              <div className={styles.cardHeader}>
                <span className={styles.region}>{item.region}</span>
                <span className={styles.category}>{item.category}</span>
              </div>

              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.cardFooter}>
                <div className={styles.scarcityInfo}>
                  <strong className={styles.countNum}>{item.practitionersLeft}</strong>
                  <span className={styles.countText}>practitioners remaining</span>
                </div>

                <Button href="/app/record" variant="brass" size="sm">
                  Preserve →
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bannerRow}>
          <div className={styles.bannerText}>
            <h3>Know a retiring expert or artisan?</h3>
            <p>It takes just a 5-minute conversation to record their first memory.</p>
          </div>
          <Button href="/app/record" variant="brass" size="lg">
            Record an Oral Account →
          </Button>
        </div>
      </div>
    </section>
  );
};
