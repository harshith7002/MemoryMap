'use client';

import React from 'react';
import { EXPERTS } from '@/lib/data';
import { ExpertAvatar } from '@/components/ui/Avatar/ExpertAvatar';
import { Button } from '@/components/ui/Button/Button';
import styles from '../page.module.css';

interface PractitionerSetupStateProps {
  name: string;
  setName: (n: string) => void;
  role: string;
  setRole: (r: string) => void;
  category: string;
  setCategory: (c: string) => void;
  onConfirm: () => void;
}

export function PractitionerSetupState({
  name,
  setName,
  role,
  setRole,
  category,
  setCategory,
  onConfirm,
}: PractitionerSetupStateProps) {
  const handleSelectExpert = (exp: typeof EXPERTS[0]) => {
    setName(exp.name);
    setRole(exp.role);
    if (exp.id === 'ramesh-kumar') setCategory('Automotive Repair');
    else if (exp.id === 'anita-rao') setCategory('Pedagogy & Teaching');
    else if (exp.id === 'lakshmi-devi') setCategory('Handloom Craft');
    else if (exp.id === 'sunita-devi') setCategory('Agriculture');
  };

  const categories = [
    'Automotive Repair',
    'Pedagogy & Teaching',
    'Handloom Craft',
    'Agriculture',
    'Woodworking & Carpentry',
    'Culinary Arts',
    'Engineering & Tech'
  ];

  return (
    <div className={styles.setupCard}>
      <div className={styles.setupHeader}>
        <span className={styles.setupEyebrow}>STEP 1 // PRACTITIONER DETAILS</span>
        <h2 className={styles.setupTitle}>Who is sharing their experience today?</h2>
        <p className={styles.setupSub}>
          Before recording, specify the practitioner's name and role so knowledge is attributed correctly in the archive.
        </p>
      </div>

      {/* Quick Preset Selector */}
      <div className={styles.presetSection}>
        <span className={styles.fieldLabel}>Quick Select Existing Practitioner:</span>
        <div className={styles.presetRow}>
          {EXPERTS.map((exp) => (
            <button
              key={exp.id}
              type="button"
              className={`${styles.presetBtn} ${name === exp.name ? styles.presetActive : ''}`}
              onClick={() => handleSelectExpert(exp)}
            >
              <ExpertAvatar src={exp.photoUrl} name={exp.name} size="sm" />
              <span>{exp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim() && role.trim()) onConfirm();
        }}
        className={styles.setupForm}
      >
        <div className={styles.fieldGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Practitioner Name *</label>
            <input
              type="text"
              required
              className={styles.fieldInput}
              placeholder="e.g. Ramesh Kumar, Anita Rao, or your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Role / Profession *</label>
            <input
              type="text"
              required
              className={styles.fieldInput}
              placeholder="e.g. Master Mechanic, Physics Teacher"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Domain / Category</label>
          <select
            className={styles.fieldSelect}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.setupAction}>
          <Button type="submit" variant="primary" size="lg" disabled={!name.trim() || !role.trim()}>
            Start Recording Interview Session →
          </Button>
        </div>
      </form>
    </div>
  );
}
