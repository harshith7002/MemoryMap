'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <span className={styles.logoDot} />
          <span className={styles.brandText}>MemoryMap</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <a href="#how-it-works" className={styles.navLink}>
            How It Works
          </a>
          <a href="#stories" className={styles.navLink}>
            Stories
          </a>
          <a href="#impact" className={styles.navLink}>
            Impact
          </a>
          <Link href="/app/knowledge" className={styles.navLink}>
            Explorer
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button href="/demo" variant="ghost" size="sm">
            Try Demo
          </Button>
          <Button href="/app/dashboard" variant="amber" size="sm">
            Preserve Knowledge
          </Button>

          {/* Mobile menu toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          <a
            href="#how-it-works"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#stories"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Stories
          </a>
          <a
            href="#impact"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Impact
          </a>
          <Link
            href="/app/knowledge"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Explorer
          </Link>
          <div className={styles.mobileActions}>
            <Button href="/demo" variant="secondary" size="md" className={styles.fullWidth}>
              Try Demo
            </Button>
            <Button href="/app/dashboard" variant="amber" size="md" className={styles.fullWidth}>
              Preserve Knowledge
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};
