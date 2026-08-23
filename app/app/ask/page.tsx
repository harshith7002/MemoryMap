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
    }, 1200);
  };

  return (
    <div className={styles.container}>
      {/* Search Engine Header */}
      <div className={styles.header}>
        <span className={styles.badge}>ORAL ARCHIVE QUERY ENGINE</span>
        <h1 className={styles.title}>Ask the archive.</h1>
        <p className={styles.subtitle}>
          Search across decades of unwritten practical experience. Answers are retrieved verbatim with original voice audio timestamps.
        </p>
      </div>

      {/* Query Entry Console */}
      <div className={styles.inputCard}>
        <span className={styles.inputLabel}>ENTER ARCHIVAL QUERY:</span>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="e.g. What should I check first when an engine overheats after 30 minutes of highway driving?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className={styles.exampleChips}>
          <span className={styles.exampleLabel}>SUGGESTED ARCHIVE SEARCHES:</span>
          {exampleQuestions.map((eq, idx) => (
            <button
              key={idx}
              className={styles.chip}
              onClick={() => handleAsk(eq)}
            >
              {eq}
            </button>
          ))}
        </div>

        <div className={styles.actionRow}>
          <span className={styles.privacyNote}>
            🔒 Query returns indexed oral testimony, not generated web summary text.
          </span>
          <button
            className={styles.askButton}
            onClick={() => handleAsk()}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? 'Querying Index...' : '🔍 Query Oral Archive'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingBox}>
          <span className={styles.spinner} />
          <span>Searching 12 preserved oral accounts and field recording transcripts...</span>
        </div>
      )}

      {/* Researched Archive Response Card */}
      {result && !isLoading && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <span className={styles.answerBadge}>VERIFIED ORAL ACCOUNT // {result.catalogId}</span>
            <span className={styles.attrBadge}>SOURCE VERIFIED</span>
          </div>

          <blockquote className={styles.answerText}>“{result.answer}”</blockquote>

          {/* Source Attribution Record Box */}
          <div className={styles.sourceBox}>
            <div className={styles.sourceHeader}>
              <span className={styles.sourceLabel}>SOURCE ATTRIBUTION & AUDIO VERIFICATION</span>
            </div>

            <div className={styles.sourceContent}>
              <div className={styles.authorRow}>
                <div className={styles.authorAvatar}>👨‍🔧</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{result.sourceExpert}</span>
                  <span className={styles.authorRole}>
                    {result.sourceRole} • {result.sourceExperience} years experience
                  </span>
                </div>
              </div>

              <div className={styles.memoryRefBox}>
                <div className={styles.refInfo}>
                  <span className={styles.refTitle}>{result.memoryTitle}</span>
                  <span className={styles.refTime}>Exact Timestamp: {result.recordingTimestamp}</span>
                </div>

                <Link
                  href={`/app/knowledge/${result.memoryId}`}
                  className={styles.listenBtn}
                >
                  🔊 Listen to original audio recording →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
