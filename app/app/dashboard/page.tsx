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
      {/* Header Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeText}>
          <h1 className={styles.greeting}>Welcome back, Ramesh</h1>
          <p className={styles.tagline}>Your personal knowledge preservation archive</p>
        </div>
        <Button href="/app/record" variant="amber" size="md">
          🎙️ Preserve New Memory
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>{stats.memoriesPreserved}</span>
            <span className={styles.statLabel}>Memories Preserved</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>{stats.proceduresExtracted}</span>
            <span className={styles.statLabel}>Procedures Extracted</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📖</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>{stats.storiesRecorded}</span>
            <span className={styles.statLabel}>Stories Recorded</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎙️</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>{stats.minutesRecorded}m</span>
            <span className={styles.statLabel}>Audio Recordings</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Memories + Sidebar Cards */}
      <div className={styles.mainGrid}>
        {/* Left Column: Recent Memories */}
        <div className={styles.memoriesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Preserved Memories</h2>
            <Link href="/app/knowledge" className={styles.viewAllLink}>
              View All Archive →
            </Link>
          </div>

          <div className={styles.memoriesList}>
            {MEMORIES.map((m) => (
              <Card key={m.id} variant="default" className={styles.memoryCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryBadge}>{m.category}</span>
                    <span className={styles.durationBadge}>⏱️ {m.duration}</span>
                  </div>
                  <Link href={`/app/knowledge/${m.id}`} className={styles.playIconBtn}>
                    ▶
                  </Link>
                </div>

                <h3 className={styles.cardTitle}>
                  <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
                </h3>

                <div className={styles.expertAuthor}>
                  <span>{m.expertName}</span>
                  <span className={styles.dot}>•</span>
                  <span>{m.expertRole}</span>
                  <span className={styles.dot}>•</span>
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
                    View Extracted Knowledge & Audio →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Featured Experts + Knowledge at Risk */}
        <div className={styles.sideCol}>
          {/* Featured Experts Box */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>👥 Featured Experts</h3>
            <div className={styles.expertsList}>
              {EXPERTS.slice(0, 3).map((exp) => (
                <Link key={exp.id} href={`/app/experts/${exp.id}`} className={styles.expertItem}>
                  <div className={styles.expAvatar}>{exp.avatar}</div>
                  <div className={styles.expInfo}>
                    <span className={styles.expName}>{exp.name}</span>
                    <span className={styles.expRole}>{exp.role}</span>
                  </div>
                  <span className={styles.expCount}>{exp.memoriesCount} memories</span>
                </Link>
              ))}
            </div>
            <Link href="/app/experts" className={styles.sideLink}>
              Browse All Experts →
            </Link>
          </div>

          {/* Knowledge at Risk Alert Box */}
          <div className={styles.sideCardUrgent}>
            <div className={styles.urgentHeader}>
              <span className={styles.redDot} />
              <h3 className={styles.sideTitleUrgent}>Knowledge at Risk</h3>
            </div>
            <p className={styles.urgentSub}>Critical heritage needing immediate preservation:</p>

            <div className={styles.urgentList}>
              {KNOWLEDGE_AT_RISK.slice(0, 2).map((item) => (
                <div key={item.id} className={styles.urgentItem}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCount}>{item.practitionersLeft} practitioners left</span>
                </div>
              ))}
            </div>

            <Button href="/app/record" variant="amber" size="sm" className={styles.fullWidth}>
              Preserve Someone's Story Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
