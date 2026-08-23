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
    'My engine overheats after 30 minutes. What should I check first?',
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
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.badge}>INTELLIGENT ARCHIVE SEARCH</span>
        <h1 className={styles.title}>Ask the people who already know.</h1>
        <p className={styles.subtitle}>
          Query thousands of preserved memories. Every answer is directly attributed to an expert with original audio timestamps.
        </p>
      </div>

      {/* Input Box */}
      <div className={styles.inputCard}>
        <label className={styles.inputLabel}>What question do you want to ask the archive?</label>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="e.g. My engine overheats after 30 minutes. What should I check first?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className={styles.exampleChips}>
          <span className={styles.exampleLabel}>Try asking:</span>
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
            🔒 Queries search indexed human memories, not generic internet text.
          </span>
          <button
            className={styles.askButton}
            onClick={() => handleAsk()}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? 'Searching Archive...' : '🔍 Query MemoryMap Archive'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <span>Searching 12 preserved expert memories and voice transcripts...</span>
        </div>
      )}

      {/* Result Display */}
      {result && !isLoading && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <span className={styles.answerBadge}>✦ VERIFIED EXPERT ANSWER</span>
            <span className={styles.attrBadge}>Source Attributed</span>
          </div>

          <blockquote className={styles.answerText}>“{result.answer}”</blockquote>

          {/* Source Attribution Box */}
          <div className={styles.sourceBox}>
            <div className={styles.sourceHeader}>
              <span className={styles.sourceLabel}>ORIGINAL SOURCE ATTRIBUTION</span>
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
                  <span className={styles.refTime}>Audio Timestamp: {result.recordingTimestamp}</span>
                </div>

                <Link
                  href={`/app/knowledge/${result.memoryId}`}
                  className={styles.listenBtn}
                >
                  🔊 Listen to this recording part →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
