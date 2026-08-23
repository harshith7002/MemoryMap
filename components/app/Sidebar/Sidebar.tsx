'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { EXPERTS } from '@/lib/data';
import {
  IconAsk,
  IconKnowledge,
  IconOverview,
  IconPeople,
  IconRecord,
  IconSettings,
  IconTimeline,
} from '@/components/ui/icons/NavIcons';
import styles from './Sidebar.module.css';

const activeExpert = EXPERTS[0];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const mainNav = [
    { label: 'Overview', href: '/app/dashboard', Icon: IconOverview },
    { label: 'Record', href: '/app/record', Icon: IconRecord },
    { label: 'Knowledge', href: '/app/knowledge', Icon: IconKnowledge },
    { label: 'People', href: '/app/experts', Icon: IconPeople },
    { label: 'Timeline', href: '/app/timeline', Icon: IconTimeline },
    { label: 'Ask the Archive', href: '/app/ask', Icon: IconAsk },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandSection}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoMark}>MM</span>
          <span className={styles.logoText}>
            <span className={styles.logoTitle}>MemoryMap</span>
            <span className={styles.logoSubtitle}>Knowledge Archive</span>
          </span>
        </Link>
      </div>

      <div className={styles.navSection}>
        <span className={styles.navEyebrow}>Navigate</span>
        <nav className={styles.navMenu}>
          {mainNav.map(({ label, href, Icon }) => {
            const isActive =
              pathname === href || (href !== '/app/dashboard' && pathname?.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon className={styles.navIcon} />
                <span className={styles.navLabel}>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.sidebarFooter}>
        <Link href={`/app/experts/${activeExpert.id}`} className={styles.expertCard}>
          <ExpertAvatar src={activeExpert.photoUrl} name={activeExpert.name} size="sm" />
          <span className={styles.expertInfo}>
            <span className={styles.expertName}>{activeExpert.name}</span>
            <span className={styles.expertRole}>{activeExpert.role}</span>
          </span>
        </Link>

        <Link
          href="/app/settings"
          className={`${styles.navItem} ${styles.settingsItem} ${pathname === '/app/settings' ? styles.active : ''}`}
        >
          <IconSettings className={styles.navIcon} />
          <span className={styles.navLabel}>Settings</span>
        </Link>

        <Link href="/demo" className={styles.demoLink}>
          Exhibition demo →
        </Link>
      </div>
    </aside>
  );
};
