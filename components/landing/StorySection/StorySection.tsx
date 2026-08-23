'use client';

import React from 'react';
import styles from './StorySection.module.css';

export const StorySection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainHeadline}>
            35 years of experience can live inside one person's memory.
          </h2>
        </div>

        <div className={styles.contentGrid}>
          {/* Large Clean Photo */}
          <div className={styles.imageCol}>
            <div className={styles.photoBox}>
              <img
                src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1000&auto=format&fit=crop"
                alt="Ramesh Kumar diagnosing an engine"
                className="clean-photo"
              />
            </div>
          </div>

          {/* Story & Metrics */}
          <div className={styles.infoCol}>
            <blockquote className={styles.quoteText}>
              “I've learned to hear an engine before I learned to understand it.”
            </blockquote>

            <div className={styles.authorMeta}>
              <strong className={styles.authorName}>Ramesh Kumar</strong>
              <span className={styles.authorRole}>Master Mechanic · Mumbai Workshop</span>
            </div>

            <div className={styles.metricsRow}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>01</span>
                <span className={styles.metricLabel}>recording</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>04:32</span>
                <span className={styles.metricLabel}>minutes spoken</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>07</span>
                <span className={styles.metricLabel}>knowledge points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
