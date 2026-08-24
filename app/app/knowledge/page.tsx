'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMemories, searchAllMemories } from '@/lib/store';
import styles from './page.module.css';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { memories, loading } = useMemories();

  const categories = ['All', 'Automotive Repair', 'Pedagogy & Teaching', 'Handloom Craft', 'Agriculture'];
  const filteredMemories = searchAllMemories(memories, query, selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore preserved knowledge</h1>
        <p className={styles.subtitle}>
          Thousands of small lessons and diagnostic insights captured directly from experienced practitioners.
        </p>

        {/* Clean Search Input */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search memories, people and expertise..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className={styles.filtersRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterChip} ${selectedCategory === cat ? styles.chipActive : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Subtle Separator List */}
      <div className={styles.cleanList}>
        {filteredMemories.map((m) => (
          <article key={m.id} className={styles.entryRow}>
            <div className={styles.entryMain}>
              <div className={styles.metaRow}>
                <span className={styles.catBadge}>{m.category}</span>
                <span className={styles.duration}>⏱️ {m.duration}</span>
              </div>

              <h2 className={styles.entryTitle}>
                <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
              </h2>

              <p className={styles.summaryText}>{m.summary}</p>

              <div className={styles.authorMeta}>
                <span>{m.expertName}</span>
                <span className={styles.dot}>·</span>
                <span>{m.expertRole} ({m.expertExperience} yrs exp)</span>
              </div>
            </div>

            <div className={styles.entryAction}>
              <Link href={`/app/knowledge/${m.id}`} className={styles.listenLink}>
                Listen & Read Record →
              </Link>
            </div>
          </article>
        ))}

        {filteredMemories.length === 0 && (
          <div className={styles.emptyState}>
            <p>No preserved memories match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
