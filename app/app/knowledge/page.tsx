'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchAllMemories } from '@/lib/store';
import { Memory } from '@/lib/data';
import styles from './page.module.css';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);

  const categories = ['All', 'Automotive Repair', 'Pedagogy & Teaching', 'Handloom Craft', 'Agriculture'];

  useEffect(() => {
    setFilteredMemories(searchAllMemories(query, selectedCategory));
  }, [query, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Knowledge Archive</h1>
        <p className={styles.subtitle}>
          {filteredMemories.length} preserved memories captured directly from experienced practitioners.
        </p>

        {/* Search Input */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search people, skills, stories and knowledge..."
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

      {/* Clean List */}
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
            <p>No preserved memories match your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
