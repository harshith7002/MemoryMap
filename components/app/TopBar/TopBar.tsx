'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button/Button';
import styles from './TopBar.module.css';

export const TopBar: React.FC = () => {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === '/app/dashboard') return 'Overview';
    if (pathname === '/app/record') return 'Record';
    if (pathname === '/app/knowledge') return 'Knowledge Archive';
    if (pathname?.startsWith('/app/knowledge/')) return 'Knowledge Archive / Detail';
    if (pathname === '/app/ask') return 'Ask the Archive';
    if (pathname === '/app/experts') return 'People';
    if (pathname?.startsWith('/app/experts/')) return 'People / Profile';
    if (pathname === '/app/timeline') return 'Timeline';
    if (pathname === '/app/settings') return 'Settings';
    return 'MemoryMap';
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.breadcrumb}>
        <span className={styles.titleText}>{getBreadcrumb()}</span>
      </div>

      <div className={styles.rightActions}>
        <Button href="/app/record" variant="primary" size="sm">
          Record knowledge →
        </Button>
      </div>
    </header>
  );
};
