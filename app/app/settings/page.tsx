'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function SettingsPage() {
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [notifyOnMatch, setNotifyOnMatch] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Archive Settings</h1>
        <p className={styles.subtitle}>Manage your profile, audio processing preferences, and privacy controls.</p>
      </div>

      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>👤 Expert Profile Info</h2>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input type="text" className={styles.input} defaultValue="Ramesh Kumar" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Master Role / Trade</label>
            <input type="text" className={styles.input} defaultValue="Master Mechanic" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.field}>
            <label className={styles.label}>Years of Experience</label>
            <input type="number" className={styles.input} defaultValue="35" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Location / Base Workshop</label>
            <input type="text" className={styles.input} defaultValue="Mumbai, India" />
          </div>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>🎙️ Voice Recording & AI Preferences</h2>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Automatic AI Knowledge Extraction</span>
            <span className={styles.toggleSub}>Automatically extract procedures, tips, and tools after audio recording completes.</span>
          </div>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={autoTranscribe}
            onChange={() => setAutoTranscribe(!autoTranscribe)}
          />
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Apprentice Query Notifications</span>
            <span className={styles.toggleSub}>Receive notifications when a student or apprentice queries your archived memories.</span>
          </div>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={notifyOnMatch}
            onChange={() => setNotifyOnMatch(!notifyOnMatch)}
          />
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Public Archive Visibility</span>
            <span className={styles.toggleSub}>Allow your preserved memories to be searchable in the public MemoryMap Digital Museum.</span>
          </div>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={publicProfile}
            onChange={() => setPublicProfile(!publicProfile)}
          />
        </div>
      </div>

      <div className={styles.actionsRow}>
        <Button variant="amber" size="md">Save Preference Changes</Button>
      </div>
    </div>
  );
}
