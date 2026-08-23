'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { getMemoryById } from '@/lib/data';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './page.module.css';

export default function MemoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const memory = getMemoryById(resolvedParams.id) || getMemoryById('demo-memory-1')!;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('02:17');

  const handleJumpToTimestamp = (timestamp: string) => {
    setCurrentTime(timestamp);
    setIsPlaying(true);
  };

  return (
    <div className={styles.container}>
      <Link href="/app/knowledge" className={styles.backLink}>
        ← Back to Knowledge Archive
      </Link>

      {/* Preserved Document Header */}
      <div className={styles.docHeader}>
        <div className={styles.docMetaRow}>
          <span className={styles.catalogId}>{memory.catalogId}</span>
          <span className={styles.categoryBadge}>{memory.category}</span>
          <span className={styles.dateRecorded}>Recorded {memory.createdAt}</span>
        </div>

        <h1 className={styles.docTitle}>{memory.title}</h1>

        <div className={styles.authorBar}>
          <ExpertAvatar name={memory.expertName} size="md" />
          <div className={styles.authorDetails}>
            <strong className={styles.authorName}>{memory.expertName}</strong>
            <span className={styles.authorSub}>{memory.expertRole} · {memory.expertExperience} years practice</span>
          </div>
          <span className={styles.durationChip}>⏱️ Audio: {memory.duration}</span>
        </div>
      </div>

      {/* Audio Player Box */}
      <div className={styles.audioCard}>
        <div className={styles.audioCardTop}>
          <div className={styles.trackMeta}>
            <span className={styles.trackTitle}>Spoken Recording</span>
            <span className={styles.timeMeta}>Timestamp: {currentTime} / Total: {memory.duration}</span>
          </div>
          <button
            className={styles.playToggleBtn}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play Spoken Account'}
          </button>
        </div>

        <div className={styles.waveformContainer}>
          <Waveform isAnimating={isPlaying} barCount={40} height={36} color="var(--color-amber)" />
        </div>
      </div>

      {/* Summary */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>What Ramesh learned</h2>
        <blockquote className={styles.summaryQuote}>“{memory.summary}”</blockquote>
      </div>

      {/* Procedure */}
      {memory.procedure && (
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Procedure</h2>
          <div className={styles.stepsList}>
            {memory.procedure.map((p) => (
              <div key={p.step} className={styles.stepRow}>
                <span className={styles.stepNum}>{p.step}</span>
                <div className={styles.stepContent}>
                  <p className={styles.stepText}>{p.instruction}</p>
                  {p.note && <span className={styles.stepNote}>Note: {p.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expert Insight & Common Mistake */}
      <div className={styles.twoColGrid}>
        {memory.expertTips && (
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitleAmber}>Expert insight</h2>
            <ul className={styles.bulletList}>
              {memory.expertTips.map((tip, idx) => (
                <li key={idx}>✦ {tip}</li>
              ))}
            </ul>
          </div>
        )}

        {memory.commonMistakes && (
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitleRed}>Common mistake</h2>
            <ul className={styles.bulletList}>
              {memory.commonMistakes.map((m, idx) => (
                <li key={idx}>⚠️ {m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tools */}
      {memory.tools && (
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Tools & materials</h2>
          <div className={styles.toolsRow}>
            {memory.tools.map((t) => (
              <span key={t} className={styles.toolTag}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Original Source Timestamps */}
      <div className={styles.sourceCard}>
        <h2 className={styles.sectionTitle}>Original source timestamps</h2>
        <p className={styles.sourceSub}>Click any timestamp to jump directly to that point in the recording:</p>

        <div className={styles.timestampButtons}>
          <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('02:17')}>
            🔊 02:17 — Diagnostic procedure
          </button>
          <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('03:45')}>
            🔊 03:45 — Radiator cap aroma test
          </button>
          <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('04:10')}>
            🔊 04:10 — Apprenticeship story
          </button>
        </div>
      </div>
    </div>
  );
}
