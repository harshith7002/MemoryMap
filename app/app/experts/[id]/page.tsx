'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { getExpertById, getMemoriesByExpert } from '@/lib/data';
import { Tag } from '@/components/ui/Tag/Tag';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export default function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const expert = getExpertById(resolvedParams.id) || getExpertById('ramesh-kumar')!;
  const expertMemories = getMemoriesByExpert(expert.id);

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link href="/app/experts" className={styles.backBtn}>
        ← Back to Practitioners Directory
      </Link>

      {/* Museum Profile Header */}
      <div className={styles.profileHeaderCard}>
        <div className={styles.avatarBig}>{expert.avatar}</div>

        <div className={styles.headerInfo}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{expert.name}</h1>
            <span className={styles.catalogBadge}>{expert.catalogId}</span>
          </div>

          <p className={styles.roleTitle}>
            {expert.role} • {expert.yearsExperience} Years Experience
          </p>

          <p className={styles.location}>📍 Location: {expert.location} ({expert.coordinates})</p>
          <p className={styles.bio}>{expert.bio}</p>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{expert.memoriesCount}</span>
              <span className={styles.statLabel}>Archived Entries</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{expert.skills.length}</span>
              <span className={styles.statLabel}>Mastered Instincts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{expert.yearsExperience} yrs</span>
              <span className={styles.statLabel}>Active Practice</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mastered Skills Section */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>🛠️ MASTERED SKILLS & PRACTICAL INSTINCTS</h2>
        <div className={styles.skillsGrid}>
          {expert.skills.map((skill) => (
            <Tag key={skill} label={skill} variant="amber" size="md" />
          ))}
        </div>
      </div>

      {/* Museum Exhibition Career & Evolution Timeline */}
      <div className={styles.sectionCard}>
        <div className={styles.timelineHeader}>
          <h2 className={styles.sectionTitle}>📅 CAREER & KNOWLEDGE EVOLUTION TIMELINE</h2>
          <span className={styles.timelineSub}>Decades of milestone growth, field notes, and tacit learning</span>
        </div>

        <div className={styles.museumTimeline}>
          {expert.timeline.map((item, idx) => (
            <div key={idx} className={styles.timelineNode}>
              <div className={styles.yearNode}>
                <span className={styles.yearText}>{item.year}</span>
                <span className={styles.nodeMarker} />
              </div>

              <div className={styles.eventBox}>
                <div className={styles.eventTop}>
                  <h3 className={styles.eventTitle}>{item.event}</h3>
                  {item.archiveRef && <span className={styles.archiveRefTag}>{item.archiveRef}</span>}
                </div>
                {item.detail && <p className={styles.eventDetail}>{item.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preserved Memories by this Expert */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>📝 CATALOGED MEMORIES BY {expert.name.toUpperCase()}</h2>

        <div className={styles.memoriesGrid}>
          {expertMemories.map((m) => (
            <Card key={m.id} variant="default" catalogId={m.catalogId} className={styles.memoryCard}>
              <div className={styles.memHeader}>
                <span className={styles.catBadge}>{m.category}</span>
                <span className={styles.duration}>⏱️ {m.duration}</span>
              </div>

              <h3 className={styles.memTitle}>
                <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
              </h3>

              <p className={styles.memSummary}>{m.summary}</p>

              <Link href={`/app/knowledge/${m.id}`} className={styles.viewMemLink}>
                Inspect Extracted Knowledge & Audio Source →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
