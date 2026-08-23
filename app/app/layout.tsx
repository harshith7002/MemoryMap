'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Control Center', href: '/app/dashboard' },
    { label: 'Record Voice', href: '/app/record' },
    { label: 'Knowledge Archive', href: '/app/knowledge' },
    { label: 'Ask MemoryMap', href: '/app/ask' },
    { label: 'Practitioners', href: '/app/experts' },
    { label: 'Timeline Track', href: '/app/timeline' },
    { label: 'Settings', href: '/app/settings' },
  ];

  return (
    <div className={styles.appContainer}>
      {/* Clean Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.brandTitle}>
            MemoryMap
          </Link>
          <span className={styles.brandSub}>Knowledge Archive</span>
        </div>

        <nav className={styles.navMenu}>
          {navItems.map((item) => {
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
          <Link href="/demo" className={styles.demoLink}>
            Interactive Exhibition Demo ➔
          </Link>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className={styles.mainWrapper}>
        <header className={styles.topHeader}>
          <span className={styles.headerTitle}>MemoryMap Digital Archive</span>
          <div className={styles.headerActions}>
            <Link href="/app/record" className={styles.recordBtn}>
              🎙️ Record Account
            </Link>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
