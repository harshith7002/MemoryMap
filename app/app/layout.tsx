'use client';

import React from 'react';
import { Sidebar } from '@/components/app/Sidebar/Sidebar';
import { TopBar } from '@/components/app/TopBar/TopBar';
import styles from './layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.mainWrapper}>
        <TopBar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
