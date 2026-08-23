'use client';

import React from 'react';
import Link from 'next/link';
import styles from './StorySection.module.css';

export const StorySection: React.FC = () => {
  const stories = [
    {
      num: '01',
      trade: 'THE MECHANIC',
      name: 'Ramesh Kumar',
      tagline: '35 years of diagnosing what manuals miss.',
      quote: '“You learn to hear a machine before you learn to understand it.”',
      memoriesCount: '47 memories cataloged',
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
      location: 'Mumbai, Maharashtra',
      expertId: 'ramesh-kumar'
    },
    {
      num: '02',
      trade: 'THE TEACHER',
      name: 'Anita Rao',
      tagline: '32 years of knowing when a student is lost — even when they say they are fine.',
      quote: '“Students nod rhythmically when put on the spot. The lost ones hover their pencils two inches above the page.”',
      memoriesCount: '31 memories cataloged',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
      location: 'Bangalore, Karnataka',
      expertId: 'anita-rao'
    },
    {
      num: '03',
      trade: 'THE ARTISAN',
      name: 'Lakshmi Devi',
      tagline: '40 years of a weaving technique that was never written down.',
      quote: '“My teacher taught me this when I was 17. Thread tension on a wooden loom is felt by plucking warps like guitar strings.”',
      memoriesCount: '23 memories cataloged',
      photoUrl: 'https://images.unsplash.com/photo-1606744888344-49423b3ef308?q=80&w=800&auto=format&fit=crop',
      location: 'Balaramapuram, Kerala',
      expertId: 'lakshmi-devi'
    },
    {
      num: '04',
      trade: 'THE FARMER',
      name: 'Sunita Devi',
      tagline: 'Three decades of knowledge passed from soil to hands.',
      quote: '“You don\'t plant this crop just because the calendar says May 1st. You squeeze the earth 4 inches deep and smell it.”',
      memoriesCount: '18 memories cataloged',
      photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
      location: 'Himachal Pradesh, India',
      expertId: 'sunita-devi'
    }
  ];

  return (
    <section id="stories" className={styles.paperSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.monoLabel}>[ DOCUMENTARY PORTRAITS // FIELD EXHIBIT ]</span>
          <h2 className={styles.title}>Some knowledge exists only in people's heads.</h2>
          <p className={styles.subtitle}>
            Demonstration accounts from real practitioners whose lifelong intuition is being documented in the MemoryMap oral archive.
          </p>
        </div>

        {/* Full-Bleed Alternating Photo Journal Layout */}
        <div className={styles.journalFlow}>
          {stories.map((story, idx) => (
            <article
              key={story.num}
              className={`${styles.journalRow} ${idx % 2 === 1 ? styles.rowReverse : ''}`}
            >
              {/* Photo Column */}
              <div className={styles.photoCol}>
                <div className={styles.photoFrame}>
                  <img
                    src={story.photoUrl}
                    alt={story.name}
                    className="docu-photo"
                  />
                  <div className={styles.photoMetaOverlay}>
                    <span className={styles.photoNum}>{story.num} // {story.trade}</span>
                    <span className={styles.photoLoc}>{story.location}</span>
                  </div>
                </div>
              </div>

              {/* Story Content Column */}
              <div className={styles.textCol}>
                <div className={styles.metaTop}>
                  <span className={styles.tradeBadge}>{story.trade}</span>
                  <span className={styles.countBadge}>{story.memoriesCount}</span>
                </div>

                <h3 className={styles.subjectName}>{story.name}</h3>
                <h4 className={styles.tagline}>{story.tagline}</h4>

                <blockquote className={styles.quoteBox}>
                  {story.quote}
                </blockquote>

                <div className={styles.actionFooter}>
                  <Link href={`/app/experts/${story.expertId}`} className={styles.profileBtn}>
                    Inspect Timeline & Preserved Memories →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
