'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useExperts } from '@/lib/store';
import { getQAResponse, QAEntry } from '@/lib/data';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import styles from './page.module.css';

export default function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { experts } = useExperts();

  const expert = experts.find((e) => e.id === resolvedParams.id) || experts[0];
  const expertMemories = expert.memoriesList || [];

  const [query, setQuery] = useState('');
  const [qaResult, setQaResult] = useState<QAEntry | null>(null);

  const handleContextualAsk = () => {
    if (!query.trim()) return;
    const res = getQAResponse(query);
    setQaResult(res);
  };

  return (
    <div className={styles.container}>
      <Link href="/app/experts" className={styles.backLink}>
        ← Back to People
      </Link>

      {/* Person Header Profile */}
      <div className={styles.profileHeaderCard}>
        <ExpertAvatar src={expert.photoUrl} name={expert.name} size="xl" />

        <div className={styles.headerMeta}>
          <h1 className={styles.name}>{expert.name}</h1>
          <p className={styles.roleTitle}>{expert.role} · {expert.yearsExperience} years of practice</p>
          <p className={styles.location}>Location: {expert.location} · {expert.memoriesCount} Memories Preserved</p>
          <p className={styles.bioText}>{expert.bio}</p>
        </div>
      </div>

      {/* What He Knows */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>What he knows</h2>
        <div className={styles.skillsGrid}>
          {expert.skills.map((skill) => (
            <span key={skill} className={styles.skillBadge}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Ask Expert's Archive Contextual Search */}
      <div className={styles.contextualAskCard}>
        <h2 className={styles.sectionTitle}>Ask {expert.name.split(' ')[0]}'s archive</h2>
        <p className={styles.askSub}>Search directly across {expert.name}'s recorded accounts:</p>

        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.askInput}
            placeholder={`Ask something about ${expert.name.split(' ')[0]}'s experience...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleContextualAsk()}
          />
          <button className={styles.askBtn} onClick={handleContextualAsk}>
            Search →
          </button>
        </div>

        {qaResult && (
          <blockquote className={styles.qaResultBox}>
            “{qaResult.answer}”
            <span className={styles.qaRef}>Timestamp Ref: {qaResult.recordingTimestamp}</span>
          </blockquote>
        )}
      </div>

      {/* Memories Preserved (Dynamic) */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Memories preserved ({expertMemories.length})</h2>
        <div className={styles.memoriesList}>
          {expertMemories.map((m) => (
            <div key={m.id} className={styles.memoryRow}>
              <div className={styles.memMain}>
                <h3 className={styles.memTitle}>
                  <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
                </h3>
                <p className={styles.memSummary}>{m.summary}</p>
              </div>
              <span className={styles.memDuration}>{m.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* A Life in Practice Timeline (Dynamic) */}
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
    </div>
  );
}
