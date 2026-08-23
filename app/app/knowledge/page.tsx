'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEMORIES, searchMemories } from '@/lib/data';
import styles from './page.module.css';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Automotive', 'Education', 'Craft', 'Agriculture'];
  const filteredMemories = searchMemories(query, selectedCategory);

  return (
    <div className={styles.container}>
      {/* Archival Newspaper Header */}
      <div className={styles.header}>
        <div className={styles.topMetaRow}>
          <span className={styles.archiveTag}>THE ARCHIVE // CATALOGUE REGISTRY</span>
          <span className={styles.countTag}>47 PRESERVED MEMORIES</span>
        </div>

        <h1 className={styles.title}>The Archive</h1>
        <p className={styles.subtitle}>
          Thousands of small lessons that would otherwise disappear with time.
        </p>

        {/* Newspaper Style Search Field */}
        <div className={styles.searchBar}>
          <span className={styles.searchPrompt}>SEARCH HUMAN KNOWLEDGE:</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search human knowledge... (e.g. engine acoustic, soil smell, loom tension)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className={styles.filtersRow}>
          <span className={styles.filterLabel}>FILTER TRADE:</span>
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

      {/* Newspaper / Archival Style Catalog List */}
      <div className={styles.newspaperList}>
        {filteredMemories.map((m) => (
          <article key={m.id} className={styles.archiveRow}>
            <div className={styles.idCol}>
              <span className={styles.archiveNum}>{m.catalogId}</span>
              <span className={styles.catBadge}>{m.category}</span>
            </div>

            <div className={styles.mainCol}>
              <h2 className={styles.entryTitle}>
                <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
              </h2>

              <div className={styles.authorMeta}>
                <span>Practitioner: <strong>{m.expertName}</strong></span>
                <span className={styles.dot}>·</span>
                <span>{m.expertRole}</span>
                <span className={styles.dot}>·</span>
                <span>Audio Length: {m.duration}</span>
              </div>

              <blockquote className={styles.quoteExcerpt}>
                “{m.transcript || m.summary}”
              </blockquote>
            </div>

            <div className={styles.actionCol}>
              <Link href={`/app/knowledge/${m.id}`} className={styles.listenBtn}>
                ▶ LISTEN [{m.duration}] →
              </Link>
            </div>
          </article>
        ))}

        {filteredMemories.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No catalog entries found</h3>
            <p>Try resetting search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
