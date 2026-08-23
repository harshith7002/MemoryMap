'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card/Card';
import { Tag } from '@/components/ui/Tag/Tag';
import { EXPERTS } from '@/lib/data';
import styles from './page.module.css';

export default function ExpertsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>EXPERT ARCHIVE</span>
        <h1 className={styles.title}>The People Behind the Knowledge</h1>
        <p className={styles.subtitle}>
          Meet the master artisans, mechanics, teachers, and farmers whose decades of practical experience are preserved in MemoryMap.
        </p>
      </div>

      <div className={styles.grid}>
        {EXPERTS.map((expert) => (
          <Card key={expert.id} variant="default" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>{expert.avatar}</div>
              <div className={styles.headerMeta}>
                <h2 className={styles.name}>
                  <Link href={`/app/experts/${expert.id}`}>{expert.name}</Link>
                </h2>
                <span className={styles.role}>{expert.role}</span>
                <span className={styles.experience}>⏱️ {expert.yearsExperience} years experience</span>
              </div>
            </div>

            <p className={styles.bio}>{expert.bio}</p>

            <div className={styles.skillsSection}>
              <span className={styles.skillsTitle}>Key Mastered Skills:</span>
              <div className={styles.skillsRow}>
                {expert.skills.map((skill) => (
                  <Tag key={skill} label={skill} variant="amber" />
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.memoriesCount}>
                📝 {expert.memoriesCount} memories archived
              </span>
              <Link href={`/app/experts/${expert.id}`} className={styles.viewProfileBtn}>
                View Full Profile & Timeline →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
