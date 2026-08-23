'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function SettingsPage() {
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [notifyOnMatch, setNotifyOnMatch] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your profile, recording preferences, and privacy controls.</p>
      </div>

      {/* Profile */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} defaultValue="Ramesh Kumar" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Role / Trade</label>
            <input type="text" className={styles.input} defaultValue="Master Mechanic" />
          </div>
        </div>
      </div>

      {/* Recording */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Recording</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Automatic Memory Extraction</span>
            <span className={styles.toggleSub}>Extract procedures and tips automatically after voice recording finishes.</span>
          </div>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={autoTranscribe}
            onChange={() => setAutoTranscribe(!autoTranscribe)}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Privacy</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Archive Access</span>
            <span className={styles.toggleSub}>Allow preserved memories to be searchable by learners in the MemoryMap archive.</span>
          </div>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={notifyOnMatch}
            onChange={() => setNotifyOnMatch(!notifyOnMatch)}
          />
        </div>
      </div>

      {/* Archive Actions */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Archive</h2>
        <div className={styles.actionsRow}>
          <Button variant="secondary" size="sm">Export All Knowledge Records</Button>
          <Button variant="ghost" size="sm" style={{ color: '#C0392B' }}>Delete Archive</Button>
        </div>
      </div>

      <div className={styles.saveRow}>
        <Button variant="primary" size="md">Save changes</Button>
      </div>
    </div>
  );
}
