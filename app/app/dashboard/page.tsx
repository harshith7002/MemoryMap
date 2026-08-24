'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { getDemoStats, getExpertById } from '@/lib/data';
import { useMemories } from '@/lib/store';
import styles from './page.module.css';

export default function DashboardPage() {
  const stats = getDemoStats();
  const { memories } = useMemories();

  return (
    <div className={styles.container}>
      {/* Header & Overall Preserved Stats */}
      <div className={styles.headerBlock}>
        <h1 className={styles.pageTitle}>Your knowledge archive</h1>
        <p className={styles.statsSummary}>
          <strong>{stats.memoriesPreserved} memories preserved</strong> · {stats.proceduresExtracted} procedures · {stats.minutesRecorded} minutes recorded · {stats.storiesRecorded} experts
        </p>
      </div>

      {/* Prominent Action Callout */}
      <div className={styles.calloutCard}>
        <div className={styles.calloutContent}>
          <h2 className={styles.calloutTitle}>Preserve something you know.</h2>
          <p className={styles.calloutText}>
            Start a voice recording and let MemoryMap turn experience into searchable knowledge.
          </p>
        </div>
        <Button href="/app/record" variant="primary" size="lg">
          Record a memory →
        </Button>
      </div>

      {/* Recent Memories List */}
      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent memories</h2>
          <Link href="/app/knowledge" className={styles.viewAllLink}>
            View all memories →
          </Link>
        </div>

        <div className={styles.memoriesList}>
          {memories.map((m) => {
            const expert = getExpertById(m.expertId);

            return (
              <article key={m.id} className={styles.memoryRow}>
                <ExpertAvatar src={expert?.photoUrl} name={m.expertName} size="md" />

                <div className={styles.memoryMetaCol}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.memoryTitle}>
                      <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
                    </h3>
                    <span className={styles.categoryBadge}>{m.category}</span>
                  </div>

                  <div className={styles.authorRow}>
                    <span>{m.expertName}</span>
                    <span className={styles.dot}>·</span>
                    <span>{m.expertRole}</span>
                    <span className={styles.dot}>·</span>
                    <span>{m.duration}</span>
                  </div>
                </div>

                <div className={styles.actionCol}>
                  <Link href={`/app/knowledge/${m.id}`} className={styles.listenBtn}>
                    ▶ Listen & View →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
