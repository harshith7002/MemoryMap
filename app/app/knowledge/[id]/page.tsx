'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { getMemoryById, Memory } from '@/lib/data';
import { Tag } from '@/components/ui/Tag/Tag';
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
      {/* Back button */}
      <Link href="/app/knowledge" className={styles.backBtn}>
        ← Back to Knowledge Archive
      </Link>

      {/* Top Header */}
      <div className={styles.header}>
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>{memory.category}</span>
          <span className={styles.aiBadge}>✨ AI Preserved Knowledge</span>
          <span className={styles.dateStamp}>Recorded: {memory.createdAt}</span>
        </div>

        <h1 className={styles.title}>{memory.title}</h1>

        {/* Source Attribution Bar */}
        <div className={styles.sourceBar}>
          <div className={styles.authorAvatar}>👨‍🔧</div>
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>
              Source: <Link href={`/app/experts/${memory.expertId}`}>{memory.expertName}</Link>
            </span>
            <span className={styles.authorRole}>
              {memory.expertRole} • {memory.expertExperience} years experience
            </span>
          </div>
          <div className={styles.durationChip}>⏱️ Audio length: {memory.duration}</div>
        </div>
      </div>

      {/* Section 1: What I Learned / Summary */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionHeader}>💡 What I Learned (Summary)</h2>
        <p className={styles.summaryBox}>{memory.summary}</p>
      </div>

      {/* Section 2: Procedure Steps */}
      {memory.procedure && (
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionHeader}>📋 Procedure (Extracted Steps)</h2>
          <div className={styles.stepsList}>
            {memory.procedure.map((p) => (
              <div key={p.step} className={styles.stepItem}>
                <span className={styles.stepCircle}>{p.step}</span>
                <span className={styles.stepInstruction}>{p.instruction}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two column layout: Expert Tips + Common Mistakes */}
      <div className={styles.twoCol}>
        {/* Expert Tips */}
        {memory.expertTips && (
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeader}>✦ Expert Tips & Insights</h2>
            <ul className={styles.tipsList}>
              {memory.expertTips.map((tip, idx) => (
                <li key={idx} className={styles.tipItem}>
                  <span className={styles.starIcon}>✦</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Mistakes */}
        {memory.commonMistakes && (
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeader}>⚠️ Common Mistakes to Avoid</h2>
            <ul className={styles.mistakesList}>
              {memory.commonMistakes.map((m, idx) => (
                <li key={idx} className={styles.mistakeItem}>
                  <span className={styles.warnIcon}>⚠️</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Section: Tools & Materials */}
      {memory.tools && (
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionHeader}>🛠️ Tools & Materials Extracted</h2>
          <div className={styles.toolsRow}>
            {memory.tools.map((tool) => (
              <Tag key={tool} label={tool} variant="brown" size="md" />
            ))}
          </div>
        </div>
      )}

      {/* Section: The Story Behind It */}
      {memory.story && (
        <div className={styles.sectionCardStory}>
          <h2 className={styles.sectionHeaderStory}>📖 The Personal Story Behind It</h2>
          <blockquote className={styles.storyQuote}>“{memory.story}”</blockquote>
        </div>
      )}

      {/* Section: Audio Player UI with Source Timestamps */}
      <div className={styles.audioPlayerCard}>
        <div className={styles.playerHeader}>
          <div className={styles.playerTitleRow}>
            <span className={styles.playerIcon}>🎙️</span>
            <div>
              <h3 className={styles.playerTitle}>Original Spoken Recording</h3>
              <span className={styles.playerSubtitle}>
                Verify source audio timestamp — {memory.expertName}
              </span>
            </div>
          </div>
          <button
            className={styles.playButtonBig}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️ Pause' : '▶ Play Audio'}
          </button>
        </div>

        {/* Waveform */}
        <div className={styles.waveformBox}>
          <Waveform isAnimating={isPlaying} barCount={42} height={44} color="var(--color-amber)" />
          <div className={styles.timeMeta}>
            <span>{currentTime}</span>
            <span>{memory.duration}</span>
          </div>
        </div>

        {/* Timestamps Jump Links */}
        <div className={styles.timestampSection}>
          <span className={styles.timestampLabel}>Jump to source timestamp:</span>
          <div className={styles.timestampButtons}>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('02:17')}
            >
              🔊 02:17 — Diagnostic procedure
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('03:45')}
            >
              🔊 03:45 — Expert tip on radiator cap
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('04:10')}
            >
              🔊 04:10 — Story of the apprentice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
