'use client';

import { EXPERTS, MEMORIES, Memory, Expert, QAEntry, getQAResponse } from './data';

const STORAGE_KEY_MEMORIES = 'memorymap_user_memories';

export function getStoredMemories(): Memory[] {
  if (typeof window === 'undefined') return MEMORIES;
  try {
    const data = localStorage.getItem(STORAGE_KEY_MEMORIES);
    if (!data) return MEMORIES;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? [...parsed, ...MEMORIES] : MEMORIES;
  } catch (err) {
    console.error('Failed to read memories from storage:', err);
    return MEMORIES;
  }
}

export function saveNewMemory(newMemory: Omit<Memory, 'id' | 'catalogId' | 'createdAt'>): Memory {
  const allCurrent = getStoredMemories();
  const nextNum = allCurrent.length + 48;
  const catalogId = `ARCH-00${nextNum}`;
  const id = `user-memory-${Date.now()}`;

  const created: Memory = {
    ...newMemory,
    id,
    catalogId,
    tags: newMemory.tags || ['Intuition', 'Diagnostics'],
    createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  if (typeof window !== 'undefined') {
    try {
      const existingUserMems = JSON.parse(localStorage.getItem(STORAGE_KEY_MEMORIES) || '[]');
      const updated = [created, ...existingUserMems];
      localStorage.setItem(STORAGE_KEY_MEMORIES, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save memory to storage:', err);
    }
  }

  return created;
}

export function searchAllMemories(query: string, category: string = 'All'): Memory[] {
  const all = getStoredMemories();
  return all.filter((m) => {
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

export function queryArchive(question: string): QAEntry {
  const allMemories = getStoredMemories();
  const qLower = question.toLowerCase();

  // Try matching stored memories first
  const match = allMemories.find((m) =>
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
