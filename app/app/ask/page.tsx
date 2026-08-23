'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { queryArchive } from '@/lib/store';
import { QAEntry } from '@/lib/data';
import styles from './page.module.css';

export default function AskPage() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QAEntry | null>(null);

  const exampleQuestions = [
    'What should I check first when an engine overheats?',
    'How do I know if soil is ready for planting without digital sensors?',
    'What is the pencil pause in classroom teaching?'
  ];

  const handleAsk = (queryToAsk?: string) => {
    const q = queryToAsk || question;
    if (!q.trim()) return;

    setQuestion(q);
    setIsLoading(true);
    setResult(null);

    // Call API or local query engine
    fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setResult(data.data);
        } else {
          setResult(queryArchive(q));
        }
        setIsLoading(false);
      })
      .catch(() => {
        setResult(queryArchive(q));
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ask the Archive</h1>
        <p className={styles.subtitle}>
          Search across the experience people have chosen to preserve.
        </p>
      </div>

      {/* Single Search Card */}
      <div className={styles.searchCard}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="What would you like to know? (e.g. What should I check first when an engine overheats?)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            className={styles.queryBtn}
            onClick={() => handleAsk()}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? 'Searching...' : 'Ask →'}
          </button>
        </div>

        <div className={styles.suggestionsRow}>
          <span className={styles.sugLabel}>Suggested:</span>
          {exampleQuestions.map((eq, idx) => (
            <button key={idx} className={styles.sugChip} onClick={() => handleAsk(eq)}>
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className={styles.loadingState}>
          <span className={styles.spinner} />
          <span>Searching preserved oral accounts...</span>
        </div>
      )}

      {/* Result Card */}
      {result && !isLoading && (
        <div className={styles.resultCard}>
          <div className={styles.authorHeader}>
            <strong className={styles.expertName}>From {result.sourceExpert}</strong>
            <span className={styles.expertRole}>{result.sourceRole} · {result.sourceExperience} years experience</span>
          </div>

          <blockquote className={styles.answerQuote}>
            “{result.answer}”
          </blockquote>

          <div className={styles.sourceFooter}>
            <div className={styles.sourceRef}>
              <span className={styles.refTitle}>Source recording · {result.recordingTimestamp}</span>
              <span className={styles.refTime}>{result.memoryTitle}</span>
            </div>

            <Link href={`/app/knowledge/${result.memoryId}`} className={styles.listenLink}>
              ▶ Listen to source →
            </Link>
          </div>

          <div className={styles.whyBox}>
            <span className={styles.whyTitle}>Why this answer:</span>
            <span className={styles.whyTag}>Procedure · {result.sourceRole} · Verified Oral Source</span>
          </div>
        </div>
      )}
    </div>
  );
}
