'use client';

import React from 'react';
import Link from 'next/link';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection: React.FC = () => {
  const stories = [
    {
      trade: 'THE MECHANIC',
      title: '35 years of knowing what manuals don\'t.',
      name: 'Ramesh Kumar',
      role: 'Master Mechanic · Mumbai',
      quote: '“You learn to hear an engine before you learn to understand it.”',
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
      expertId: 'ramesh-kumar'
    },
    {
      trade: 'THE TEACHER',
      title: '32 years of knowing when a student needs help.',
      name: 'Anita Rao',
      role: 'Veteran Physics Teacher · Bangalore',
      quote: '“Students nod rhythmically when put on the spot. The lost ones hover their pencils two inches above the page.”',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
      expertId: 'anita-rao'
    },
    {
      trade: 'THE ARTISAN',
      title: '40 years of a technique that was never written down.',
      name: 'Lakshmi Devi',
      role: 'Master Artisan Weaver · Kerala',
      quote: '“Thread tension on a wooden loom is felt by plucking warps like guitar strings.”',
      photoUrl: 'https://images.unsplash.com/photo-1606744888344-49423b3ef308?q=80&w=800&auto=format&fit=crop',
      expertId: 'lakshmi-devi'
    },
    {
      trade: 'THE FARMER',
      title: 'Three decades of knowledge passed from soil to hands.',
      name: 'Sunita Devi',
      role: 'Traditional Organic Farmer · Himachal Pradesh',
      quote: '“You don\'t plant just because the calendar says May 1st. You squeeze the earth 4 inches deep and smell it.”',
      photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
      expertId: 'sunita-devi'
    }
  ];

  return (
    <section id="stories" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>PRACTITIONER STORIES</span>
          <h2 className={styles.mainTitle}>Knowledge Lives in People</h2>
          <p className={styles.subtitle}>
            Explore preserved accounts from experts across trades whose unwritten intuition is now archived.
          </p>
        </div>

        <div className={styles.storiesList}>
          {stories.map((s, idx) => (
            <div key={idx} className={styles.storyRow}>
              <div className={styles.imageCol}>
                <div className={styles.photoFrame}>
                  <img src={s.photoUrl} alt={s.name} className="clean-photo" />
                </div>
              </div>

              <div className={styles.contentCol}>
                <span className={styles.tradeLabel}>{s.trade}</span>
                <h3 className={styles.storyHeadline}>{s.title}</h3>
                <blockquote className={styles.quoteText}>{s.quote}</blockquote>

                <div className={styles.metaFooter}>
                  <div className={styles.expertDetails}>
                    <strong className={styles.expertName}>{s.name}</strong>
                    <span className={styles.expertRole}>{s.role}</span>
                  </div>

                  <Link href={`/app/experts/${s.expertId}`} className={styles.profileBtn}>
                    View Timeline & Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
