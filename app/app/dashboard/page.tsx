'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Tag } from '@/components/ui/Tag/Tag';
import { MEMORIES, EXPERTS, KNOWLEDGE_AT_RISK, getDemoStats } from '@/lib/data';
import styles from './page.module.css';

export default function DashboardPage() {
  const stats = getDemoStats();

  return (
    <div className={styles.container}>
      {/* Archival Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeText}>
          <span className={styles.catalogTag}>ARCHIVAL DESK // REGISTRY CONTROL</span>
          <h1 className={styles.greeting}>Ramesh Kumar Archive</h1>
          <p className={styles.tagline}>Oral history preservation & diagnostic knowledge database</p>
        </div>
        <Button href="/app/record" variant="brass" size="md">
          🎙️ Record Oral Account
        </Button>
      </div>

      {/* Archival Stats Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statCode}>INDEX_MEM</span>
          <span className={styles.statNum}>{stats.memoriesPreserved}</span>
          <span className={styles.statLabel}>Memories Cataloged</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statCode}>INDEX_PROC</span>
          <span className={styles.statNum}>{stats.proceduresExtracted}</span>
          <span className={styles.statLabel}>Procedures Extracted</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statCode}>INDEX_STOR</span>
          <span className={styles.statNum}>{stats.storiesRecorded}</span>
          <span className={styles.statLabel}>Stories Documented</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statCode}>INDEX_AUD</span>
          <span className={styles.statNum}>{stats.minutesRecorded}m</span>
          <span className={styles.statLabel}>Audio Archives</span>
        </div>
      </div>

      {/* Main Grid: Catalog Entries + Sidebar */}
      <div className={styles.mainGrid}>
        {/* Left Column: Recent Catalog Entries */}
        <div className={styles.memoriesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Catalog Entries</h2>
            <Link href="/app/knowledge" className={styles.viewAllLink}>
              View Complete Index →
            </Link>
          </div>

          <div className={styles.memoriesList}>
            {MEMORIES.map((m) => (
              <Card key={m.id} variant="default" catalogId={m.catalogId} className={styles.memoryCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryTag}>{m.category}</span>
                  <span className={styles.durationTag}>⏱️ {m.duration}</span>
                </div>

                <h3 className={styles.cardTitle}>
                  <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
                </h3>

                <div className={styles.expertAuthor}>
                  <span>Source: {m.expertName}</span>
                  <span className={styles.dot}>·</span>
                  <span>{m.expertRole}</span>
                  <span className={styles.dot}>·</span>
                  <span>{m.expertExperience} yrs exp</span>
                </div>

                <p className={styles.summaryText}>{m.summary}</p>

                <div className={styles.tagsRow}>
                  {m.tags.slice(0, 3).map((t) => (
                    <Tag key={t} label={t} variant="amber" />
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <Link href={`/app/knowledge/${m.id}`} className={styles.viewDetailsBtn}>
                    Inspect Extracted Knowledge & Audio Source →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.sideCol}>
          {/* Featured Practitioners */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Practitioners Index</h3>
            <div className={styles.expertsList}>
              {EXPERTS.slice(0, 3).map((exp) => (
                <Link key={exp.id} href={`/app/experts/${exp.id}`} className={styles.expertItem}>
                  <div className={styles.expAvatar}>{exp.avatar}</div>
                  <div className={styles.expInfo}>
                    <span className={styles.expName}>{exp.name}</span>
                    <span className={styles.expRole}>{exp.role}</span>
                  </div>
                  <span className={styles.expCount}>{exp.memoriesCount} entries</span>
                </Link>
              ))}
            </div>
            <Link href="/app/experts" className={styles.sideLink}>
              Browse All Practitioners →
            </Link>
          </div>

          {/* Critical Knowledge Registry */}
          <div className={styles.sideCardUrgent}>
            <div className={styles.urgentHeader}>
              <span className={styles.redDot} />
              <h3 className={styles.sideTitleUrgent}>Scarcity Registry</h3>
            </div>
            <p className={styles.urgentSub}>Techniques with critical practitioner count:</p>

            <div className={styles.urgentList}>
              {KNOWLEDGE_AT_RISK.slice(0, 2).map((item) => (
                <div key={item.id} className={styles.urgentItem}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCount}>{item.practitionersLeft} practitioners remaining</span>
                </div>
              ))}
            </div>

            <Button href="/app/record" variant="brass" size="sm" className={styles.fullWidth}>
              Document Someone's Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
