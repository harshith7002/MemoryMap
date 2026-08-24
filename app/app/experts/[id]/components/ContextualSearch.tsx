import React from 'react';
import { Expert, QAEntry } from '@/lib/data';
import styles from '../page.module.css';

interface ContextualSearchProps {
  expert: Expert;
  query: string;
  setQuery: (val: string) => void;
  handleContextualAsk: () => void;
  qaResult: QAEntry | null;
}

export default function ContextualSearch({
  expert,
  query,
  setQuery,
  handleContextualAsk,
  qaResult
}: ContextualSearchProps) {
  return (
    <div className={styles.contextualAskCard}>
      <h2 className={styles.sectionTitle}>Ask {expert.name.split(' ')[0]}'s archive</h2>
      <p className={styles.askSub}>Search directly across {expert.name}'s recorded accounts:</p>

      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.askInput}
          placeholder={`Ask something about ${expert.name.split(' ')[0]}'s experience...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleContextualAsk()}
        />
        <button className={styles.askBtn} onClick={handleContextualAsk}>
          Search →
        </button>
      </div>

      {qaResult && (
        <blockquote className={styles.qaResultBox}>
          “{qaResult.answer}”
          <span className={styles.qaRef}>Timestamp Ref: {qaResult.recordingTimestamp}</span>
        </blockquote>
      )}
    </div>
  );
}
