import React from 'react';
import { Expert } from '@/lib/data';
import styles from '../page.module.css';

interface ExpertSkillsProps {
  expert: Expert;
}

export default function ExpertSkills({ expert }: ExpertSkillsProps) {
  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>What he knows</h2>
      <div className={styles.skillsGrid}>
        {expert.skills.map((skill) => (
          <span key={skill} className={styles.skillBadge}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
