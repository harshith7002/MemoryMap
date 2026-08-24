'use client';

import { useState, useEffect, useMemo } from 'react';
import { EXPERTS, MEMORIES, Memory, QAEntry, getQAResponse } from './data';

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>(MEMORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/memories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // Combine fetched server memories with demo memories to avoid empty state
          // Assuming server memory IDs start with 'user-memory-'
          const serverMemories = data.data;
          setMemories([...serverMemories, ...MEMORIES]);
        }
      })
      .catch(err => console.error('Failed to fetch memories:', err))
      .finally(() => setLoading(false));
  }, []);

  return { memories, loading };
}

export function searchAllMemories(memories: Memory[], query: string, category: string = 'All'): Memory[] {
  return memories.filter((m) => {
    const matchesCat = category === 'All' || m.category.toLowerCase() === category.toLowerCase();
    const q = query.toLowerCase();
    const matchesQuery =
      !query ||
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.expertName.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}

export function queryArchive(memories: Memory[], question: string): QAEntry {
  const qLower = question.toLowerCase();

  const match = memories.find((m) =>
    m.title.toLowerCase().includes(qLower) ||
    m.summary.toLowerCase().includes(qLower) ||
    (m.expertTips && m.expertTips.some((t) => t.toLowerCase().includes(qLower)))
  );

  if (match) {
    return {
      id: `qa-${Date.now()}`,
      question,
      answer: match.summary,
      sourceExpert: match.expertName,
      sourceRole: match.expertRole,
      sourceExperience: match.expertExperience,
      recordingTimestamp: '01:45',
      memoryId: match.id,
      memoryTitle: match.title,
      catalogId: match.catalogId
    };
  }

  return getQAResponse(question);
}
