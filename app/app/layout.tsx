'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: '📊', href: '/app/dashboard' },
    { label: 'Record Voice', icon: '🎙️', href: '/app/record' },
    { label: 'Knowledge Archive', icon: '📚', href: '/app/knowledge' },
    { label: 'Ask MemoryMap', icon: '💬', href: '/app/ask' },
    { label: 'Experts', icon: '👥', href: '/app/experts' },
    { label: 'Timeline', icon: '📅', href: '/app/timeline' },
    { label: 'Settings', icon: '⚙️', href: '/app/settings' },
  ];

  return (
    <div className={styles.appContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.brand}>
            <span className={styles.logoDot} />
            <span className={styles.brandText}>MemoryMap</span>
          </Link>
          <span className={styles.appBadge}>APP</span>
        </div>

        <nav className={styles.navMenu}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.href === '/app/record' && <span className={styles.liveDot} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.demoModeBox}>
            <span className={styles.demoIcon}>✦</span>
            <div className={styles.demoMeta}>
              <span className={styles.demoTitle}>Demo Profile</span>
              <span className={styles.demoSub}>Ramesh Kumar Archive</span>
            </div>
          </div>
          <Link href="/demo" className={styles.demoLink}>
            Switch Demo Mode ➔
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        <header className={styles.topHeader}>
          <div className={styles.headerTitle}>
            <span>MemoryMap Archive Platform</span>
          </div>
          <div className={styles.headerRight}>
            <Link href="/app/record" className={styles.quickRecordBtn}>
              🎙️ Quick Record
            </Link>
            <div className={styles.userAvatar}>👨‍🔧</div>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
