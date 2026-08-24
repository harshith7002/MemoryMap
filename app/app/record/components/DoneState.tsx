import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';
import { Answer } from '../page';

interface DoneStateProps {
  answers: Answer[];
  totalRecordedSeconds: number;
  formatDuration: (totalSeconds: number) => string;
  handleRecordAnother: () => void;
  createdMemory?: any;
}

export function DoneState({
  answers,
  totalRecordedSeconds,
  formatDuration,
  handleRecordAnother,
  createdMemory
}: DoneStateProps) {
  return (
    <div className={styles.doneCard}>
      <div className={styles.doneHeader}>
        <h2 className={styles.doneTitle}>Your knowledge has been preserved.</h2>
        <p className={styles.doneSub}>
          MemoryMap turned {answers.length} spoken {answers.length === 1 ? 'answer' : 'answers'} (
          {formatDuration(totalRecordedSeconds)} total) into the following:
        </p>
      </div>

      <div className={styles.answeredList}>
        {answers.map((a, idx) => (
          <div key={idx} className={styles.answeredRow}>
            <span className={styles.answeredIndex}>{idx + 1}</span>
            <span className={styles.answeredQuestion}>{a.question}</span>
            <span className={styles.answeredDuration}>{formatDuration(a.duration)}</span>
          </div>
        ))}
      </div>

      <div className={styles.extractedGrid}>
        {createdMemory?.procedure && createdMemory.procedure.length > 0 && (
          <div className={styles.extractedBox}>
            <strong className={styles.boxTag}>PROCEDURE</strong>
            <p className={styles.boxText}>
              {createdMemory.procedure[0]?.instruction}
            </p>
          </div>
        )}

        {createdMemory?.expertTips && createdMemory.expertTips.length > 0 && (
          <div className={styles.extractedBox}>
            <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
            <p className={styles.boxText}>
              {createdMemory.expertTips[0]}
            </p>
          </div>
        )}

        {createdMemory?.commonMistakes && createdMemory.commonMistakes.length > 0 && (
          <div className={styles.extractedBox}>
            <strong className={styles.boxTagRed}>COMMON MISTAKE</strong>
            <p className={styles.boxText}>
              {createdMemory.commonMistakes[0]}
            </p>
          </div>
        )}
      </div>

      <div className={styles.doneActions}>
        <Link href={createdMemory ? `/app/knowledge/${createdMemory.id}` : "/app/knowledge/demo-memory-1"} className={styles.viewRecordBtn}>
          View full preserved document →
        </Link>
        <Button onClick={handleRecordAnother} variant="secondary" size="md">
          Record another memory
        </Button>
      </div>
    </div>
  );
}
