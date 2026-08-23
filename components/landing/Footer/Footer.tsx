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
              <span className={styles.brandTitle}>MemoryMap</span>
              <span className={styles.brandSub}>/ Oral Knowledge Archive</span>
            </Link>
            <p className={styles.tagline}>
              Preserving human experience before it leaves. Transforming natural voice accounts into searchable digital heritage.
            </p>
          </div>

          <div className={styles.linksCol}>
            <span className={styles.colHeader}>ARCHIVE INDEX</span>
            <Link href="/app/knowledge" className={styles.link}>The Archive</Link>
            <Link href="/app/experts" className={styles.link}>People Directory</Link>
            <Link href="/app/ask" className={styles.link}>Oral Search</Link>
            <Link href="/app/timeline" className={styles.link}>Evolution Timeline</Link>
          </div>

          <div className={styles.linksCol}>
            <span className={styles.colHeader}>EXHIBITION</span>
            <Link href="/demo" className={styles.link}>Exhibition Demo</Link>
            <Link href="/app/record" className={styles.link}>Field Voice Recorder</Link>
            <a href="#how-it-works" className={styles.link}>Methodology</a>
            <a href="#stories" className={styles.link}>Human Stories</a>
          </div>

          <div className={styles.colophonBox}>
            <span className={styles.colophonHeader}>COLOPHON</span>
            <p className={styles.colophonText}>
              “When someone retires, their job ends. But what happens to everything they learned?”
            </p>
            <span className={styles.catalogId}>CATALOGUE REGISTRY REF #2026-MM</span>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} MemoryMap Oral Archive. Preserving human knowledge with reverence.
          </p>
          <div className={styles.legalLinks}>
            <span>Ethical AI Guidelines</span>
            <span>·</span>
            <span>Archival Privacy</span>
            <span>·</span>
            <span>Source Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
