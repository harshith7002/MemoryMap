'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { KNOWLEDGE_AT_RISK } from '@/lib/data';
import styles from './KnowledgeAtRiskSection.module.css';

export const KnowledgeAtRiskSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.urgencyTag}>
            <span className={styles.redBlink} />
            <span>CRITICAL ARCHIVAL REGISTRY</span>
          </div>

          <h2 className={styles.title}>Some things are known by very few people.</h2>

          <p className={styles.disclaimer}>
            *Demonstration registry illustrating real-world urgency of capturing oral accounts before practitioners retire.
          </p>
        </div>

        {/* Archival Registry Catalog List */}
        <div className={styles.registryList}>
          {KNOWLEDGE_AT_RISK.map((item) => (
            <div key={item.id} className={styles.registryEntry}>
              <div className={styles.entryMeta}>
                <span className={styles.catId}>{item.catalogId}</span>
                <span className={styles.region}>{item.region}</span>
              </div>

              <div className={styles.titleCol}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>

              <div className={styles.scarcityCol}>
                <span className={styles.countBig}>{item.practitionersLeft}</span>
                <span className={styles.countLabel}>practitioners remaining</span>
              </div>

              <div className={styles.descCol}>
                <p className={styles.description}>{item.description}</p>
              </div>

              <div className={styles.actionCol}>
                <Button href="/app/record" variant="brass" size="sm">
                  Preserve this knowledge →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className={styles.bottomBanner}>
          <p className={styles.bannerText}>
            Do you know an expert or elder retiring soon? Document their oral account today.
          </p>
          <Button href="/app/record" variant="brass" size="lg">
            Record an Oral Account
          </Button>
        </div>
      </div>
    </section>
  );
};
