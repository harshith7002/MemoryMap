import React from 'react';
import { Expert } from '@/lib/data';
import styles from '../page.module.css';

interface ExpertTimelineProps {
  expert: Expert;
}

export default function ExpertTimeline({ expert }: ExpertTimelineProps) {
  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>A life in practice</h2>

      <div className={styles.timelineTrack}>
        {expert.timeline.map((item, idx) => (
          <div key={idx} className={styles.timelineItem}>
            <div className={styles.yearCol}>{item.year}</div>
            <div className={styles.markerCol} />
            <div className={styles.contentCol}>
              <h3 className={styles.eventTitle}>{item.event}</h3>
              {item.detail && <p className={styles.eventDetail}>{item.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
