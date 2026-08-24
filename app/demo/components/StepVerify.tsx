import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

export function StepVerify() {
  return (
    <div className={styles.stepPane}>
      <h2 className={styles.paneTitle}>05 / Source timestamp verification</h2>
      <p className={styles.paneDesc}>Verify exactly where in the original audio recording the knowledge originated.</p>

      <div className={styles.attributionCard}>
        <div className={styles.attrHeader}>
          <span className={styles.attrTag}>SOURCE VERIFICATION</span>
          <span className={styles.stampBadge}>Timestamp: 02:17–03:04</span>
        </div>

        <div className={styles.attrMeta}>
          <span>Source: Ramesh Kumar · Master Mechanic (35 yrs)</span>
          <span>Memory Catalog Entry: Diagnosing Engine Overheating (#ARCH-0047)</span>
        </div>

        <Link href="/app/knowledge/demo-memory-1" className={styles.listenFullBtn}>
          ▶ Listen to recording at 02:17 →
        </Link>
      </div>

      <div className={styles.demoCompleteBox}>
        <h3 className={styles.completeTitle}>Exhibition Walkthrough Complete</h3>
        <p className={styles.completeText}>
          You've experienced how MemoryMap captures human wisdom before it's lost and makes it searchable forever.
        </p>
        <div className={styles.finalBtns}>
          <Button href="/app/record" variant="primary" size="lg">
            Preserve a Real Memory Now →
          </Button>
          <Button href="/app/dashboard" variant="secondary" size="lg">
            Go to Overview
          </Button>
        </div>
      </div>
    </div>
  );
}
