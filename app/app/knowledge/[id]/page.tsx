'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useMemories } from '@/lib/store';
import { getMemoryById } from '@/lib/data';
import styles from './page.module.css';

import { MemoryHeader } from '@/components/app/knowledge/MemoryHeader';
import { MemoryAudioPlayer } from '@/components/app/knowledge/MemoryAudioPlayer';
import { MemorySection } from '@/components/app/knowledge/MemorySection';

export default function MemoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { memories, loading } = useMemories();
  
  const memory = memories.find((m) => m.id === resolvedParams.id) || getMemoryById(resolvedParams.id) || getMemoryById('demo-memory-1')!;
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

      <MemoryHeader memory={memory} styles={styles} variant="default" />

      <MemoryAudioPlayer 
        memory={memory} 
        styles={styles} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTime={currentTime} 
        handleJumpToTimestamp={handleJumpToTimestamp}
        variant="default"
        renderPart="player"
      />

      {/* Summary */}
      <MemorySection styles={styles} title={`What ${memory.expertName.split(' ')[0]} learned`}>
        <blockquote className={styles.summaryQuote}>“{memory.summary}”</blockquote>
      </MemorySection>

      {/* Procedure */}
      {memory.procedure && memory.procedure.length > 0 && (
        <MemorySection styles={styles} title="Procedure">
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
        </MemorySection>
      )}

      {/* Expert Insight & Common Mistake */}
      <div className={styles.twoColGrid}>
        {memory.expertTips && memory.expertTips.length > 0 && (
          <MemorySection styles={styles} title="Expert insight" titleClassName={styles.sectionTitleAmber}>
            <ul className={styles.bulletList}>
              {memory.expertTips.map((tip, idx) => (
                <li key={idx}>✦ {tip}</li>
              ))}
            </ul>
          </MemorySection>
        )}

        {memory.commonMistakes && memory.commonMistakes.length > 0 && (
          <MemorySection styles={styles} title="Common mistake" titleClassName={styles.sectionTitleRed}>
            <ul className={styles.bulletList}>
              {memory.commonMistakes.map((m, idx) => (
                <li key={idx}>⚠️ {m}</li>
              ))}
            </ul>
          </MemorySection>
        )}
      </div>

      {/* Tools */}
      {memory.tools && memory.tools.length > 0 && (
        <MemorySection styles={styles} title="Tools & materials">
          <div className={styles.toolsRow}>
            {memory.tools.map((t) => (
              <span key={t} className={styles.toolTag}>{t}</span>
            ))}
          </div>
        </MemorySection>
      )}

      {/* Original Source Timestamps */}
      <MemoryAudioPlayer 
        memory={memory} 
        styles={styles} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTime={currentTime} 
        handleJumpToTimestamp={handleJumpToTimestamp}
        variant="default"
        renderPart="timestamps"
      />
    </div>
  );
}
