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
        <span className={styles.badge}>KNOWLEDGE EVOLUTION</span>
        <h1 className={styles.title}>Interactive Knowledge Timeline</h1>
        <p className={styles.subtitle}>
          Track how an expert's practical knowledge, diagnostic instincts, and mastery evolved over decades of hands-on experience.
        </p>

        {/* Expert Selector Tabs */}
        <div className={styles.tabsRow}>
          {EXPERTS.map((exp) => (
            <button
              key={exp.id}
              className={`${styles.tabBtn} ${selectedExpertId === exp.id ? styles.tabActive : ''}`}
              onClick={() => setSelectedExpertId(exp.id)}
            >
              <span className={styles.tabAvatar}>{exp.avatar}</span>
              <div className={styles.tabMeta}>
                <span className={styles.tabName}>{exp.name}</span>
                <span className={styles.tabRole}>{exp.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Card */}
      <div className={styles.timelineCard}>
        <div className={styles.expertBanner}>
          <div className={styles.bannerAvatar}>{selectedExpert.avatar}</div>
          <div className={styles.bannerMeta}>
            <h2 className={styles.bannerName}>{selectedExpert.name}</h2>
            <span className={styles.bannerSub}>
              {selectedExpert.role} • {selectedExpert.yearsExperience} Years in Field • {selectedExpert.location}
            </span>
          </div>
          <span className={styles.memoryBadge}>{selectedExpert.memoriesCount} Memories Archival Profile</span>
        </div>

        {/* Vertical Timeline Track */}
        <div className={styles.timelineTrack}>
          {selectedExpert.timeline.map((event, idx) => (
            <div key={idx} className={styles.timelineNode}>
              <div className={styles.nodeLeft}>
                <span className={styles.yearBadge}>{event.year}</span>
              </div>

              <div className={styles.nodeCenter}>
                <span className={styles.circleMarker} />
              </div>

              <div className={styles.nodeRight}>
                <div className={styles.eventBox}>
                  <h3 className={styles.eventTitle}>{event.event}</h3>
                  {event.detail && <p className={styles.eventDetail}>{event.detail}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
