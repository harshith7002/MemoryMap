import React from 'react';
import { Expert } from '@/lib/data';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import styles from '../page.module.css';

interface ExpertHeaderProps {
  expert: Expert;
}

export default function ExpertHeader({ expert }: ExpertHeaderProps) {
  return (
    <div className={styles.profileHeaderCard}>
      <ExpertAvatar src={expert.photoUrl} name={expert.name} size="xl" />

      <div className={styles.headerMeta}>
        <h1 className={styles.name}>{expert.name}</h1>
        <p className={styles.roleTitle}>{expert.role} · {expert.yearsExperience} years of practice</p>
        <p className={styles.location}>Location: {expert.location}</p>
        <p className={styles.bioText}>{expert.bio}</p>
      </div>
    </div>
  );
}
