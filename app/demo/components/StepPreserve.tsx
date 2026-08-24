import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

interface StepPreserveProps {
  memory: any;
  setActiveStep: (val: number) => void;
}

export function StepPreserve({ memory, setActiveStep }: StepPreserveProps) {
  return (
    <div className={styles.stepPane}>
      <h2 className={styles.paneTitle}>03 / AI Knowledge extraction</h2>
      <p className={styles.paneDesc}>MemoryMap automatically extracts procedures, expert tips, common mistakes, and tools.</p>

      <div className={styles.extractionResultGrid}>
        <div className={styles.resultBox}>
          <strong className={styles.boxTag}>PROCEDURE</strong>
          <ol className={styles.numList}>
            {memory.procedure?.slice(0, 3).map((p: any) => (
              <li key={p.step}>{p.instruction}</li>
            ))}
          </ol>
        </div>

        <div className={styles.resultBox}>
          <strong className={styles.boxTagAmber}>EXPERT TIP</strong>
          <ul className={styles.bulletList}>
            {memory.expertTips?.slice(0, 2).map((t: string, idx: number) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.paneActions}>
        <Link href="/app/knowledge/demo-memory-1" className={styles.fullMemoryLink}>
          View Full Memory Record →
        </Link>
        <Button onClick={() => setActiveStep(4)} variant="primary" size="md">
          Next: Query Archive →
        </Button>
      </div>
    </div>
  );
}
