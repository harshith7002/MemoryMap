'use client';

import React, { useState } from 'react';
import { useExperts } from '@/lib/store';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import styles from './page.module.css';

export default function TimelinePage() {
  const { experts } = useExperts();
  const [selectedExpertId, setSelectedExpertId] = useState('ramesh-kumar');

  const selectedExpert = experts.find((e) => e.id === selectedExpertId) || experts[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>35 years, preserved.</h1>
        <p className={styles.subtitle}>
          A lifetime of experience, mapped from apprenticeship to mastery.
        </p>

        {/* Practitioner Tabs */}
        <div className={styles.tabsRow}>
          {experts.map((exp) => (
            <button
              key={exp.id}
              className={`${styles.tabBtn} ${selectedExpertId === exp.id ? styles.tabActive : ''}`}
              onClick={() => setSelectedExpertId(exp.id)}
            >
              <ExpertAvatar src={exp.photoUrl} name={exp.name} size="sm" />
              <div className={styles.tabInfo}>
                <span className={styles.tabName}>{exp.name}</span>
                <span className={styles.tabRole}>{exp.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Single Vertical Track Timeline */}
      <div className={styles.timelineCard}>
        <div className={styles.expertHeader}>
          <ExpertAvatar src={selectedExpert.photoUrl} name={selectedExpert.name} size="lg" />
          <div className={styles.expertMeta}>
            <h2 className={styles.expertName}>{selectedExpert.name}</h2>
            <p className={styles.expertRole}>
              {selectedExpert.role} · {selectedExpert.yearsExperience} Years Practice · {selectedExpert.location}
            </p>
          </div>
        </div>

        <div className={styles.verticalTrack}>
          {selectedExpert.timeline.map((event, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <div className={styles.yearCol}>{event.year}</div>
              <div className={styles.markerCol}>
                <span className={styles.dotMarker} />
              </div>
              <div className={styles.contentCol}>
                <h3 className={styles.eventTitle}>{event.event}</h3>
                {event.detail && <p className={styles.eventDetail}>{event.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
