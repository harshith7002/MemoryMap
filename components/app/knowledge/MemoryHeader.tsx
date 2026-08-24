import React from 'react';
import Link from 'next/link';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';

interface MemoryHeaderProps {
  memory: any;
  styles: any;
  variant?: 'default' | 'demo';
}

export function MemoryHeader({ memory, styles, variant = 'default' }: MemoryHeaderProps) {
  if (variant === 'demo') {
    return (
      <div className={styles.header}>
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>{memory.category}</span>
          <span className={styles.aiBadge}>✨ AI Preserved Knowledge</span>
          <span className={styles.dateStamp}>Recorded: {memory.createdAt}</span>
        </div>

        <h1 className={styles.title}>{memory.title}</h1>

        <div className={styles.sourceBar}>
          <div className={styles.authorAvatar}>👨‍🔧</div>
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>
              Source: <Link href={`/app/experts/${memory.expertId}`}>{memory.expertName}</Link>
            </span>
            <span className={styles.authorRole}>
              {memory.expertRole} • {memory.expertExperience} years experience
            </span>
          </div>
          <div className={styles.durationChip}>⏱️ Audio length: {memory.duration}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.docHeader}>
      <div className={styles.docMetaRow}>
        <span className={styles.catalogId}>{memory.catalogId}</span>
        <span className={styles.categoryBadge}>{memory.category}</span>
        <span className={styles.dateRecorded}>Recorded {memory.createdAt}</span>
      </div>

      <h1 className={styles.docTitle}>{memory.title}</h1>

      <div className={styles.authorBar}>
        <ExpertAvatar name={memory.expertName} size="md" />
        <div className={styles.authorDetails}>
          <strong className={styles.authorName}>{memory.expertName}</strong>
          <span className={styles.authorSub}>{memory.expertRole} · {memory.expertExperience} years practice</span>
        </div>
        <span className={styles.durationChip}>⏱️ Audio: {memory.duration}</span>
      </div>
    </div>
  );
}
