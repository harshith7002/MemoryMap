'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEMORIES } from '@/lib/data';
import { Tag } from '@/components/ui/Tag/Tag';
import styles from '../[id]/page.module.css';

import { MemoryHeader } from '@/components/app/knowledge/MemoryHeader';
import { MemoryAudioPlayer } from '@/components/app/knowledge/MemoryAudioPlayer';
import { MemorySection } from '@/components/app/knowledge/MemorySection';

export default function DemoMemoryPage() {
  const memory = MEMORIES[0]; // Ramesh Kumar demo memory
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('02:17');

  const handleJumpToTimestamp = (timestamp: string) => {
    setCurrentTime(timestamp);
    setIsPlaying(true);
  };

  return (
    <div className={styles.container}>
      <Link href="/app/knowledge" className={styles.backBtn}>
        ← Back to Knowledge Archive
      </Link>

      <MemoryHeader memory={memory} styles={styles} variant="demo" />

      <MemorySection styles={styles} title="💡 What I Learned (Summary)" titleClassName={styles.sectionHeader}>
        <p className={styles.summaryBox}>{memory.summary}</p>
      </MemorySection>

      {memory.procedure && (
        <MemorySection styles={styles} title="📋 Procedure (Extracted Steps)" titleClassName={styles.sectionHeader}>
          <div className={styles.stepsList}>
            {memory.procedure.map((p) => (
              <div key={p.step} className={styles.stepItem}>
                <span className={styles.stepCircle}>{p.step}</span>
                <span className={styles.stepInstruction}>{p.instruction}</span>
              </div>
            ))}
          </div>
        </MemorySection>
      )}

      <div className={styles.twoCol}>
        {memory.expertTips && (
          <MemorySection styles={styles} title="✦ Expert Tips & Insights" titleClassName={styles.sectionHeader}>
            <ul className={styles.tipsList}>
              {memory.expertTips.map((tip, idx) => (
                <li key={idx} className={styles.tipItem}>
                  <span className={styles.starIcon}>✦</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </MemorySection>
        )}

        {memory.commonMistakes && (
          <MemorySection styles={styles} title="⚠️ Common Mistakes to Avoid" titleClassName={styles.sectionHeader}>
            <ul className={styles.mistakesList}>
              {memory.commonMistakes.map((m, idx) => (
                <li key={idx} className={styles.mistakeItem}>
                  <span className={styles.warnIcon}>⚠️</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </MemorySection>
        )}
      </div>

      {memory.tools && (
        <MemorySection styles={styles} title="🛠️ Tools & Materials Extracted" titleClassName={styles.sectionHeader}>
          <div className={styles.toolsRow}>
            {memory.tools.map((tool) => (
              <Tag key={tool} label={tool} variant="brown" size="md" />
            ))}
          </div>
        </MemorySection>
      )}

      {memory.story && (
        <MemorySection 
          styles={styles} 
          title="📖 The Personal Story Behind It" 
          titleClassName={styles.sectionHeaderStory}
          className={styles.sectionCardStory}
        >
          <blockquote className={styles.storyQuote}>“{memory.story}”</blockquote>
        </MemorySection>
      )}

      <MemoryAudioPlayer 
        memory={memory} 
        styles={styles} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTime={currentTime} 
        handleJumpToTimestamp={handleJumpToTimestamp}
        variant="demo"
      />
    </div>
  );
}
