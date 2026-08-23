'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Control Center', code: 'ARCH-01', href: '/app/dashboard' },
    { label: 'Field Recording', code: 'STUDIO', href: '/app/record' },
    { label: 'Archive Catalog', code: 'INDEX', href: '/app/knowledge' },
    { label: 'Oral Search', code: 'QUERY', href: '/app/ask' },
    { label: 'Practitioners', code: 'PEOPLE', href: '/app/experts' },
    { label: 'Evolution Track', code: 'TIMELINE', href: '/app/timeline' },
    { label: 'Settings', code: 'SYS-CFG', href: '/app/settings' },
  ];

  return (
    <div className={styles.appContainer}>
      {/* Archival Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandTitle}>MemoryMap</span>
            <span className={styles.brandSub}>ORAL ARCHIVE PLATFORM</span>
          </Link>
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
                <span className={styles.navCode}>{item.code}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.href === '/app/record' && <span className={styles.livePulse} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.archiveMetaBox}>
            <span className={styles.metaTitle}>DEMO ARCHIVAL PROFILE</span>
            <span className={styles.metaName}>Ramesh Kumar Archive</span>
            <span className={styles.metaCode}>CATALOG #EXPRT-1989-0047</span>
          </div>
          <Link href="/demo" className={styles.exhibitionLink}>
            Interactive Exhibition Demo ➔
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        <header className={styles.topHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.sysTag}>MEMORYMAP DIGITAL MUSEUM & ARCHIVE</span>
          </div>
          <div className={styles.headerRight}>
            <Link href="/app/record" className={styles.recordActionBtn}>
              🎙️ Record Oral Account
            </Link>
            <div className={styles.expertAvatar}>👨‍🔧</div>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
