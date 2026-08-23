import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <span className={styles.logoDot} />
              <span className={styles.brandText}>MemoryMap</span>
            </Link>
            <p className={styles.tagline}>
              Preserve knowledge before its owner leaves. Transforming spoken wisdom into structured, searchable heritage.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Product</h4>
            <Link href="/demo" className={styles.link}>Demo Mode</Link>
            <Link href="/app/dashboard" className={styles.link}>Dashboard</Link>
            <Link href="/app/record" className={styles.link}>Voice Recorder</Link>
            <Link href="/app/knowledge" className={styles.link}>Knowledge Explorer</Link>
            <Link href="/app/ask" className={styles.link}>Ask MemoryMap</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Preserve</h4>
            <a href="#how-it-works" className={styles.link}>How It Works</a>
            <a href="#stories" className={styles.link}>Human Stories</a>
            <a href="#impact" className={styles.link}>Social Impact</a>
            <Link href="/app/experts" className={styles.link}>Expert Archive</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Mission</h4>
            <p className={styles.missionText}>
              “When someone retires, their job ends. But what happens to everything they learned?”
            </p>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} MemoryMap Inc. Built with reverence for human experience.
          </p>
          <div className={styles.legalLinks}>
            <span className={styles.legalLink}>Privacy Policy</span>
            <span className={styles.legalLink}>Terms of Preservation</span>
            <span className={styles.legalLink}>Ethical AI Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
