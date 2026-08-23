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
      memoriesCount: '47 memories preserved',
      avatar: '👨‍🔧',
      location: 'Mumbai, India',
      expertId: 'ramesh-kumar'
    },
    {
      num: '02',
      trade: 'THE TEACHER',
      name: 'David Chen',
      tagline: '32 years of knowing when a student is lost — even when they say they are fine.',
      quote: '“Students nod rhythmically when put on the spot. The lost ones hover their pencils two inches above the page.”',
      memoriesCount: '31 memories preserved',
      avatar: '👨‍🏫',
      location: 'Toronto, Canada',
      expertId: 'david-chen'
    },
    {
      num: '03',
      trade: 'THE ARTISAN',
      name: 'Meera Pillai',
      tagline: '40 years of a weaving technique that was never written down.',
      quote: '“My teacher taught me this when I was 17. Thread tension on a wooden loom is felt by plucking warps like guitar strings.”',
      memoriesCount: '23 memories preserved',
      avatar: '👩‍🌾',
      location: 'Balaramapuram, Kerala',
      expertId: 'meera-pillai'
    },
    {
      num: '04',
      trade: 'THE FARMER',
      name: 'Sunita Devi',
      tagline: 'Three decades of knowledge passed from soil to hands.',
      quote: '“You don\'t plant this crop just because the calendar says May 1st. You squeeze the earth 4 inches deep and smell it.”',
      memoriesCount: '18 memories preserved',
      avatar: '🌾',
      location: 'Himachal Pradesh, India',
      expertId: 'sunita-devi'
    }
  ];

  return (
    <section id="stories" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.metaLabel}>DOCUMENTARY PORTRAITS</span>
          <h2 className={styles.title}>Some knowledge exists only in people's heads.</h2>
          <p className={styles.subtitle}>
            Living accounts from practitioners whose lifelong intuition is being preserved in the MemoryMap archive.
          </p>
        </div>

        {/* Editorial Asymmetric Journal Layout */}
        <div className={styles.storiesFlow}>
          {stories.map((story) => (
            <article key={story.num} className={styles.storyBlock}>
              <div className={styles.numCol}>
                <span className={styles.bigNum}>{story.num}</span>
                <span className={styles.tradeLabel}>{story.trade}</span>
              </div>

              <div className={styles.visualCol}>
                <div className={styles.photoBox}>
                  <span className={styles.avatarEmoji}>{story.avatar}</span>
                  <div className={styles.photoCap}>
                    <span className={styles.name}>{story.name}</span>
                    <span className={styles.location}>{story.location}</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentCol}>
                <h3 className={styles.tagline}>{story.tagline}</h3>
                <blockquote className={styles.quote}>{story.quote}</blockquote>

                <div className={styles.metaFooter}>
                  <span className={styles.archiveCount}>📝 {story.memoriesCount}</span>
                  <Link href={`/app/experts/${story.expertId}`} className={styles.profileLink}>
                    Inspect Expert Profile & Timeline →
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
