'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card/Card';
import { Tag } from '@/components/ui/Tag/Tag';
import { MEMORIES, searchMemories } from '@/lib/data';
import styles from './page.module.css';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExpert, setSelectedExpert] = useState('All');

  const categories = ['All', 'Automotive', 'Education', 'Craft', 'Agriculture'];
  const experts = ['All', 'Ramesh Kumar', 'David Chen', 'Meera Pillai', 'Sunita Devi'];

  const filteredMemories = searchMemories(query, selectedCategory).filter((m) => {
    if (selectedExpert !== 'All') {
      return m.expertName === selectedExpert;
    }
    return true;
  });

  return (
    <div className={styles.container}>
      {/* Search & Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Knowledge Library</h1>
        <p className={styles.subtitle}>
          Explore structured wisdom extracted from oral recordings. Verified by experts, linked to source audio.
        </p>

        {/* Large Search Bar */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Ask or search anything about preserved memories (e.g. engine, soil, loom, students)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Category:</span>
            <div className={styles.chipsGroup}>
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

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Expert:</span>
            <select
              className={styles.selectDropdown}
              value={selectedExpert}
              onChange={(e) => setSelectedExpert(e.target.value)}
            >
              {experts.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={styles.resultsInfo}>
        <span>Showing {filteredMemories.length} preserved memories</span>
      </div>

      {/* Cards Grid */}
      <div className={styles.grid}>
        {filteredMemories.map((m) => (
          <Card key={m.id} variant="default" className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.categoryBadge}>{m.category}</span>
              <span className={styles.durationBadge}>⏱️ {m.duration}</span>
            </div>

            <h2 className={styles.cardTitle}>
              <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
            </h2>

            <div className={styles.expertMeta}>
              <span>{m.expertName}</span>
              <span className={styles.dot}>•</span>
              <span>{m.expertRole}</span>
            </div>

            <p className={styles.summary}>{m.summary}</p>

            <div className={styles.tagsRow}>
              {m.tags.slice(0, 3).map((t) => (
                <Tag key={t} label={t} variant="amber" />
              ))}
            </div>

            <div className={styles.cardFooter}>
              <Link href={`/app/knowledge/${m.id}`} className={styles.viewLink}>
                View Extracted Knowledge & Audio →
              </Link>
            </div>
          </Card>
        ))}

        {filteredMemories.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📂</span>
            <h3>No memories match your query</h3>
            <p>Try searching for terms like "engine", "soil", "loom", or "teaching".</p>
            <button className={styles.resetBtn} onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedExpert('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
