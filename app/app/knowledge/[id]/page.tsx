'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { getMemoryById } from '@/lib/data';
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
        ← Back to Archive Index
      </Link>

      {/* Archival Catalog Document Header */}
      <div className={styles.documentHeader}>
        <div className={styles.catalogMetaRow}>
          <span className={styles.catalogIdTag}>{memory.catalogId}</span>
          <span className={styles.catBadge}>{memory.category}</span>
          <span className={styles.dateStamp}>RECORDED: {memory.createdAt}</span>
        </div>

        <h1 className={styles.title}>{memory.title}</h1>

        {/* Source Attribution Unit */}
        <div className={styles.sourceBar}>
          <div className={styles.authorAvatar}>👨‍🔧</div>
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>
              Source Practitioner: <Link href={`/app/experts/${memory.expertId}`}>{memory.expertName}</Link>
            </span>
            <span className={styles.authorRole}>
              {memory.expertRole} • {memory.expertExperience} years experience
            </span>
          </div>
          <div className={styles.durationChip}>⏱️ Audio length: {memory.duration}</div>
        </div>
      </div>

      {/* Section 1: Summary / Verbatim Insight */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionHeader}>SUMMARY // PRACTITIONER INSIGHT</h2>
        <p className={styles.summaryText}>“{memory.summary}”</p>
      </div>

      {/* Section 2: Procedure Steps */}
      {memory.procedure && (
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionHeader}>EXTRACTED PROCEDURE SEQUENCE</h2>
          <div className={styles.stepsList}>
            {memory.procedure.map((p) => (
              <div key={p.step} className={styles.stepItem}>
                <span className={styles.stepSquare}>{p.step}</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepInstruction}>{p.instruction}</span>
                  {p.note && <span className={styles.stepNote}>Note: {p.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout: Expert Tips + Common Mistakes */}
      <div className={styles.twoCol}>
        {/* Expert Tips */}
        {memory.expertTips && (
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeader}>✦ MASTER PRACTITIONER TIPS</h2>
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
            <h2 className={styles.sectionHeader}>⚠️ COMMON MISTAKES TO AVOID</h2>
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
          <h2 className={styles.sectionHeader}>🛠️ REQUIRED TOOLS & MATERIALS</h2>
          <div className={styles.toolsRow}>
            {memory.tools.map((tool) => (
              <Tag key={tool} label={tool} variant="brown" size="md" />
            ))}
          </div>
        </div>
      )}

      {/* Section: Personal Backstory */}
      {memory.story && (
        <div className={styles.sectionCardStory}>
          <h2 className={styles.sectionHeaderStory}>📖 PERSONAL NARRATIVE & BACKSTORY</h2>
          <blockquote className={styles.storyQuote}>“{memory.story}”</blockquote>
        </div>
      )}

      {/* Archival Audio Source Player */}
      <div className={styles.audioPlayerCard}>
        <div className={styles.playerHeader}>
          <div className={styles.playerTitleRow}>
            <span className={styles.playerIcon}>🎙️</span>
            <div>
              <h3 className={styles.playerTitle}>Original Spoken Account Audio</h3>
              <span className={styles.playerSubtitle}>
                Source: {memory.expertName} • Verified Field Recording
              </span>
            </div>
          </div>
          <button
            className={styles.playButtonBig}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause Audio' : '▶ Play Spoken Account'}
          </button>
        </div>

        {/* Waveform */}
        <div className={styles.waveformBox}>
          <Waveform isAnimating={isPlaying} barCount={44} height={40} color="var(--color-brass)" />
          <div className={styles.timeMeta}>
            <span>TIMESTAMP: {currentTime}</span>
            <span>TOTAL: {memory.duration}</span>
          </div>
        </div>

        {/* Source Timestamps Link Bar */}
        <div className={styles.timestampSection}>
          <span className={styles.timestampLabel}>TIMESTAMP VERIFICATION SOURCES (CLICK TO PLAY):</span>
          <div className={styles.timestampButtons}>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('02:17')}
            >
              🔊 02:17 — Water pump cavitation diagnostic
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('03:45')}
            >
              🔊 03:45 — Radiator cap aroma test
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('04:10')}
            >
              🔊 04:10 — Apprenticeship narrative
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
