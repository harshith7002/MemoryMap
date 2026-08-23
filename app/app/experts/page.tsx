'use client';

import React from 'react';
import Link from 'next/link';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { EXPERTS } from '@/lib/data';
import styles from './page.module.css';

export default function ExpertsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>People</h1>
        <p className={styles.subtitle}>
          The people behind the knowledge — master mechanics, teachers, artisans, and organic farmers whose unwritten intuition is preserved.
        </p>
      </div>

      <div className={styles.peopleGrid}>
        {EXPERTS.map((person) => (
          <div key={person.id} className={styles.personCard}>
            <div className={styles.cardTop}>
              <ExpertAvatar src={person.photoUrl} name={person.name} size="lg" />
              <div className={styles.personMeta}>
                <h2 className={styles.personName}>
                  <Link href={`/app/experts/${person.id}`}>{person.name}</Link>
                </h2>
                <span className={styles.personRole}>{person.role}</span>
                <span className={styles.personExp}>{person.yearsExperience} years practice · {person.location}</span>
              </div>
            </div>

            <p className={styles.bioText}>{person.bio}</p>

            <div className={styles.skillsRow}>
              {person.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>{skill}</span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.memoriesCount}>{person.memoriesCount} memories preserved</span>
              <Link href={`/app/experts/${person.id}`} className={styles.viewBtn}>
                View Profile & Timeline →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
