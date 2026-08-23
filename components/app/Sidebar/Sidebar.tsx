'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const mainNav = [
    { label: 'Overview', href: '/app/dashboard' },
    { label: 'Record', href: '/app/record' },
    { label: 'Knowledge', href: '/app/knowledge' },
    { label: 'People', href: '/app/experts' },
    { label: 'Timeline', href: '/app/timeline' },
    { label: 'Ask the Archive', href: '/app/ask' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandSection}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoTitle}>MemoryMap</span>
          <span className={styles.logoSubtitle}>Knowledge Archive</span>
        </Link>
      </div>

      <nav className={styles.navMenu}>
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/app/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <Link
          href="/app/settings"
          className={`${styles.navItem} ${pathname === '/app/settings' ? styles.active : ''}`}
        >
          <span>Settings</span>
        </Link>

        <Link href="/demo" className={styles.demoLink}>
          Exhibition Demo →
        </Link>
      </div>
    </aside>
  );
};
