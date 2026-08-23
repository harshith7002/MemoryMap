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
        <span className={styles.badge}>DOCUMENTARY PRACTITIONER DIRECTORY</span>
        <h1 className={styles.title}>The People Behind the Knowledge</h1>
        <p className={styles.subtitle}>
          Master mechanics, artisans, teachers, and organic farmers whose oral accounts form the foundation of the MemoryMap archive.
        </p>
      </div>

      <div className={styles.grid}>
        {EXPERTS.map((expert) => (
          <Card key={expert.id} variant="default" catalogId={expert.catalogId} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatarFrame}>
                <img src={expert.photoUrl} alt={expert.name} className={styles.avatarImg} />
              </div>
              <div className={styles.headerMeta}>
                <h2 className={styles.name}>
                  <Link href={`/app/experts/${expert.id}`}>{expert.name}</Link>
                </h2>
                <span className={styles.role}>{expert.role}</span>
                <span className={styles.experience}>{expert.yearsExperience} years in field · {expert.location}</span>
              </div>
            </div>

            <p className={styles.bio}>{expert.bio}</p>

            <div className={styles.skillsSection}>
              <span className={styles.skillsTitle}>MASTERED SKILLS & INSTINCTS:</span>
              <div className={styles.skillsRow}>
                {expert.skills.map((skill) => (
                  <Tag key={skill} label={skill} variant="amber" />
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.memoriesCount}>
                📝 {expert.memoriesCount} cataloged accounts
              </span>
              <Link href={`/app/experts/${expert.id}`} className={styles.viewProfileBtn}>
                Inspect Timeline & Archive →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
