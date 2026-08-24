'use client';

import { useState, useEffect } from 'react';
import { EXPERTS, MEMORIES, Memory, Expert, TimelineEvent, QAEntry, getQAResponse } from './data';

const STORAGE_KEY_MEMORIES = 'memorymap_user_memories';
const EVENT_KEY_UPDATE = 'memorymap_store_update';

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

export function getStoredMemoryById(id: string): Memory | undefined {
  const all = getStoredMemories();
  return all.find((m) => m.id === id);
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
      window.dispatchEvent(new Event(EVENT_KEY_UPDATE));
    } catch (err) {
      console.error('Failed to save memory to storage:', err);
    }
  }

  return created;
}

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  const syncMemories = () => {
    const local = getStoredMemories();
    setMemories(local);
    setLoading(false);
  };

  useEffect(() => {
    syncMemories();

    // Fetch from server as well
    fetch('/api/memories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const serverMemories = data.data;
          const combined = [...serverMemories, ...getStoredMemories()];
          // Deduplicate by ID
          const unique = Array.from(new Map(combined.map((m) => [m.id, m])).values());
          setMemories(unique);
        }
      })
      .catch((err) => console.error('Failed to fetch server memories:', err));

    const handleUpdate = () => syncMemories();
    window.addEventListener(EVENT_KEY_UPDATE, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY_UPDATE, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return { memories, loading };
}

export function useExperts() {
  const { memories } = useMemories();

  const dynamicExperts = EXPERTS.map((expert) => {
    const expertMemories = memories.filter(
      (m) => m.expertId === expert.id || m.expertName.toLowerCase() === expert.name.toLowerCase()
    );

    // Compute dynamic timeline
    const userTimelineEvents: TimelineEvent[] = expertMemories
      .filter((m) => m.id.startsWith('user-memory-') || m.id.startsWith('mem-'))
      .map((m) => ({
        year: 2026,
        event: `Knowledge Preserved — ${m.title}`,
        detail: `Spoken account recorded and structured into catalog record ${m.catalogId} (${m.duration}).`
      }));

    return {
      ...expert,
      memoriesCount: expert.memoriesCount + expertMemories.filter((m) => m.id.startsWith('user-memory-') || m.id.startsWith('mem-')).length,
      memoriesList: expertMemories,
      timeline: [...userTimelineEvents, ...expert.timeline]
    };
  });

  return { experts: dynamicExperts };
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

  const match = memories.find(
    (m) =>
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
