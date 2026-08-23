'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './StorySection.module.css';

export const StorySection: React.FC = () => {
  const stories = [
    {
      role: 'Retiring Mechanic',
      experience: '35 years of experience',
      avatar: '👨‍🔧',
      quote: '“I\'ve fixed hundreds of these engines. The manual won\'t tell you what that sound means.”',
      expertName: 'Ramesh Kumar',
      category: 'Automotive'
    },
    {
      role: 'Master Artisan',
      experience: '40 years of craft',
      avatar: '👩‍🌾',
      quote: '“My teacher taught me this technique when I was 17. I never wrote it down.”',
      expertName: 'Meera Pillai',
      category: 'Handloom Craft'
    },
    {
      role: 'Veteran Teacher',
      experience: '32 years in the classroom',
      avatar: '👨‍🏫',
      quote: '“You can tell when a student doesn\'t understand, even when they say they do.”',
      expertName: 'David Chen',
      category: 'Pedagogy'
    },
    {
      role: 'Organic Farmer',
      experience: '30 years of local knowledge',
      avatar: '🌾',
      quote: '“You don\'t plant this crop just because the calendar says so. You watch the soil.”',
      expertName: 'Sunita Devi',
      category: 'Agriculture'
    }
  ];

  return (
    <section id="stories" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>HUMAN STORIES</span>
          <h2 className={styles.title}>Some knowledge exists only in people's heads.</h2>
          <p className={styles.subtitle}>
            Every day, thousands of experts step away from their lifelong work. Here are real stories of expertise preserved before it disappeared.
          </p>
        </div>

        <div className={styles.grid}>
          {stories.map((s, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarCircle}>{s.avatar}</div>
                <div className={styles.meta}>
                  <h3 className={styles.roleTitle}>{s.role}</h3>
                  <span className={styles.experienceBadge}>{s.experience}</span>
                </div>
              </div>

              <blockquote className={styles.quote}>{s.quote}</blockquote>

              <div className={styles.cardFooter}>
                <span className={styles.expertName}>{s.expertName} • {s.category}</span>
                <Button href="/app/record" variant="ghost" size="sm" className={styles.preserveBtn}>
                  Preserve expertise →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
