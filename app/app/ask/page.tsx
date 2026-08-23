'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getQAResponse, QAEntry } from '@/lib/data';
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

    setTimeout(() => {
      const response = getQAResponse(q);
      setResult(response);
      setIsLoading(false);
    }, 900);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ask the archive.</h1>
        <p className={styles.subtitle}>
          Search across decades of unwritten practical experience. Answers are retrieved directly from original oral accounts.
        </p>
      </div>

      {/* Clean Single Search Input Box */}
      <div className={styles.searchCard}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="e.g. What should I check first when an engine overheats?"
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

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingState}>
          <span className={styles.spinner} />
          <span>Searching 12 preserved oral accounts...</span>
        </div>
      )}

      {/* Clean Answer Card */}
      {result && !isLoading && (
        <div className={styles.resultCard}>
          <div className={styles.authorHeader}>
            <strong className={styles.expertName}>{result.sourceExpert}</strong>
            <span className={styles.expertRole}>{result.sourceRole} · {result.sourceExperience} years experience</span>
          </div>

          <blockquote className={styles.answerQuote}>
            “{result.answer}”
          </blockquote>

          <div className={styles.sourceFooter}>
            <div className={styles.sourceRef}>
              <span className={styles.refTitle}>{result.memoryTitle}</span>
              <span className={styles.refTime}>Timestamp: {result.recordingTimestamp}</span>
            </div>

            <Link href={`/app/knowledge/${result.memoryId}`} className={styles.listenLink}>
              ▶ Listen to original audio source →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
