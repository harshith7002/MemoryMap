'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>MemoryMap</span>
          <span className={styles.subMark}>/ Oral Knowledge Archive</span>
        </Link>

        {/* Minimal Editorial Nav Links */}
        <nav className={styles.navLinks}>
          <Link href="/app/knowledge" className={styles.link}>
            Archive
          </Link>
          <Link href="/app/experts" className={styles.link}>
            People
          </Link>
          <a href="#stories" className={styles.link}>
            Stories
          </a>
          <a href="#how-it-works" className={styles.link}>
            How It Works
          </a>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button href="/demo" variant="secondary" size="sm">
            Exhibition Demo
          </Button>
          <Button href="/app/record" variant="primary" size="sm">
            Preserve Knowledge →
          </Button>
        </div>
      </div>
    </header>
  );
};
