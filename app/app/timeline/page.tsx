'use client';

import React, { useState } from 'react';
import { EXPERTS } from '@/lib/data';
import styles from './page.module.css';

export default function TimelinePage() {
  const [selectedExpertId, setSelectedExpertId] = useState('ramesh-kumar');
  const selectedExpert = EXPERTS.find((e) => e.id === selectedExpertId) || EXPERTS[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Knowledge Evolution Timeline</h1>
        <p className={styles.subtitle}>
          Track how master diagnostic instincts and unwritten field experience evolved across decades of practice.
        </p>

        {/* Practitioner Tabs */}
        <div className={styles.tabsRow}>
          {EXPERTS.map((exp) => (
            <button
              key={exp.id}
              className={`${styles.tabBtn} ${selectedExpertId === exp.id ? styles.tabActive : ''}`}
              onClick={() => setSelectedExpertId(exp.id)}
            >
              <img src={exp.photoUrl} alt={exp.name} className={styles.tabAvatar} />
              <div className={styles.tabInfo}>
                <span className={styles.tabName}>{exp.name}</span>
                <span className={styles.tabRole}>{exp.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Single Vertical Line Timeline Card */}
      <div className={styles.timelineCard}>
        <div className={styles.expertHeader}>
          <img src={selectedExpert.photoUrl} alt={selectedExpert.name} className={styles.expertImg} />
          <div className={styles.expertMeta}>
            <h2 className={styles.expertName}>{selectedExpert.name}</h2>
            <p className={styles.expertRole}>{selectedExpert.role} · {selectedExpert.yearsExperience} Years Practice · {selectedExpert.location}</p>
          </div>
        </div>

        <div className={styles.verticalTrack}>
          {selectedExpert.timeline.map((event, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <div className={styles.yearCol}>
                <span className={styles.yearText}>{event.year}</span>
              </div>

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
