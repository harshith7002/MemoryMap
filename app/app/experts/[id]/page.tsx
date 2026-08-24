'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { getExpertById, getQAResponse, QAEntry } from '@/lib/data';
import { useMemories } from '@/lib/store';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import styles from './page.module.css';
import ExpertHeader from './components/ExpertHeader';
import ExpertSkills from './components/ExpertSkills';
import ContextualSearch from './components/ContextualSearch';
import ExpertTimeline from './components/ExpertTimeline';

export default function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const expert = getExpertById(resolvedParams.id) || getExpertById('ramesh-kumar')!;
  
  const { memories } = useMemories();
  const expertMemories = memories.filter((m) => m.expertId === expert.id);

  const [query, setQuery] = useState('');
  const [qaResult, setQaResult] = useState<QAEntry | null>(null);

  const handleContextualAsk = () => {
    if (!query.trim()) return;
    const res = getQAResponse(query);
    setQaResult(res);
  };

  return (
    <div className={styles.container}>
      <Link href="/app/experts" className={styles.backLink}>
        ← Back to People
      </Link>

      <ExpertHeader expert={expert} />

      <ExpertSkills expert={expert} />

      <ContextualSearch
        expert={expert}
        query={query}
        setQuery={setQuery}
        handleContextualAsk={handleContextualAsk}
        qaResult={qaResult}
      />

      {/* Memories Preserved */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Memories preserved ({expertMemories.length})</h2>
        <div className={styles.memoriesList}>
          {expertMemories.map((m) => (
            <div key={m.id} className={styles.memoryRow}>
              <div className={styles.memMain}>
                <h3 className={styles.memTitle}>
                  <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
                </h3>
                <p className={styles.memSummary}>{m.summary}</p>
              </div>
              <span className={styles.memDuration}>{m.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <ExpertTimeline expert={expert} />
    </div>
  );
}
