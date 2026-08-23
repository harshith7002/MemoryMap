'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/app/knowledge', label: 'Archive' },
  { href: '/app/experts', label: 'People' },
  { href: '/#stories', label: 'Stories' },
  { href: '/#how-it-works', label: 'About' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile panel on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand */}
        <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.mark}>MM</span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>MemoryMap</span>
            <span className={styles.brandTag}>Oral Knowledge Archive</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.navLinks} aria-label="Primary">
          {NAV_LINKS.map((item) => {
            const isActive = item.href.startsWith('/app') && pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <Button href="/demo" variant="secondary" size="sm">
            Exhibition demo
          </Button>
          <Button href="/app/record" variant="brass" size="sm">
            Preserve knowledge →
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineTop : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineMid : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineBottom : ''}`} />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ''}`}
      >
        <nav className={styles.mobileLinks} aria-label="Mobile">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Button href="/demo" variant="secondary" size="md" className={styles.mobileButton}>
            Exhibition demo
          </Button>
          <Button href="/app/record" variant="brass" size="md" className={styles.mobileButton}>
            Preserve knowledge →
          </Button>
        </div>
      </div>
    </header>
  );
};
