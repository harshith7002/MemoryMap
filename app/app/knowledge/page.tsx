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
      {/* Archive Index Header */}
      <div className={styles.header}>
        <span className={styles.archiveTag}>MEMORYMAP CATALOGUE // INDEX & REGISTRY</span>
        <h1 className={styles.title}>The Archive</h1>
        <p className={styles.subtitle}>
          Thousands of small lessons and diagnostic insights that would otherwise disappear with time.
        </p>

        {/* Archival Search Input */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchPrompt}>SEARCH ARCHIVE:</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search human knowledge by craft, engine acoustic, soil smell, loom tension..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')}>
              ✕ CLEAR
            </button>
          )}
        </div>

        {/* Archival Filter Bar */}
        <div className={styles.filtersBar}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>TRADE / FIELD:</span>
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
            <span className={styles.filterLabel}>PRACTITIONER:</span>
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

      {/* Index Count Status */}
      <div className={styles.resultsInfo}>
        <span>INDEX REGISTRY: SHOWING {filteredMemories.length} CATALOGED ACCOUNTS</span>
      </div>

      {/* Archive Entries List */}
      <div className={styles.archiveList}>
        {filteredMemories.map((m) => (
          <Card key={m.id} variant="default" catalogId={m.catalogId} className={styles.archiveEntryCard}>
            <div className={styles.cardHeader}>
              <span className={styles.catBadge}>{m.category}</span>
              <span className={styles.durationMono}>AUDIO: {m.duration}</span>
            </div>

            <h2 className={styles.entryTitle}>
              <Link href={`/app/knowledge/${m.id}`}>{m.title}</Link>
            </h2>

            <div className={styles.practitionerMeta}>
              <span>Practitioner: {m.expertName}</span>
              <span className={styles.dot}>·</span>
              <span>{m.expertRole}</span>
              <span className={styles.dot}>·</span>
              <span>{m.expertExperience} yrs experience</span>
            </div>

            <p className={styles.summaryText}>“{m.summary}”</p>

            <div className={styles.tagsRow}>
              {m.tags.slice(0, 4).map((t) => (
                <Tag key={t} label={t} variant="amber" />
              ))}
            </div>

            <div className={styles.cardFooter}>
              <Link href={`/app/knowledge/${m.id}`} className={styles.listenLink}>
                Listen to Source Audio & Inspect Procedure →
              </Link>
            </div>
          </Card>
        ))}

        {filteredMemories.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📂</span>
            <h3>No catalog records match your query</h3>
            <p>Try searching for terms like "engine", "soil", "loom", or "teaching".</p>
            <button className={styles.resetBtn} onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedExpert('All'); }}>
              Reset Archive Index Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
