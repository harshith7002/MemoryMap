'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './ListenToLifeSection.module.css';

export const ListenToLifeSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSegment, setActiveSegment] = useState(1);

  const transcriptSegments = [
    { id: 1, text: "“When this engine starts making that high-pitched metallic ticking, most guys grab the scanner...”", time: "00:14" },
    { id: 2, text: "“...but back in 1994, my master showed me you place your palm right here on the lower housing.”", time: "01:05" },
    { id: 3, text: "“If the lower hose is cold while the top is burning hot, that's not your thermostat sticking...”", time: "02:17" },
    { id: 4, text: "“...that's water pump impeller erosion. And smell the cap — burnt sweet scent means head gasket pressure loss.”", time: "03:45" }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionMeta}>
          <span className={styles.sectionNum}>01 // SIGNATURE EXHIBIT</span>
          <span className={styles.sectionLabel}>ORAL HISTORY RECORDING</span>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Column: Voice Recording Unit */}
          <div className={styles.voiceColumn}>
            <div className={styles.headingGroup}>
              <h2 className={styles.title}>Listen to Ramesh</h2>
              <span className={styles.subtitle}>35 years diagnosing heavy diesel machinery by ear.</span>
            </div>

            <div className={styles.audioExhibitBox}>
              <div className={styles.playerBar}>
                <button
                  className={styles.playToggleBtn}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸ PAUSE ARCHIVE AUDIO' : '▶ PLAY SPOKEN ACCOUNT'}
                </button>
                <span className={styles.timestampMono}>TIMESTAMP: 02:17 / 04:32</span>
              </div>

              <div className={styles.waveformContainer}>
                <Waveform isAnimating={isPlaying} barCount={44} height={40} color="var(--color-brass)" />
              </div>

              {/* Live Transcript Segment Navigation */}
              <div className={styles.transcriptFlow}>
                <span className={styles.flowLabel}>VERBATIM SPOKEN TRANSCRIPT (CLICK SEGMENT):</span>
                {transcriptSegments.map((seg) => (
                  <div
                    key={seg.id}
                    className={`${styles.transcriptCard} ${activeSegment === seg.id ? styles.activeSeg : ''}`}
                    onClick={() => setActiveSegment(seg.id)}
                  >
                    <span className={styles.segTime}>{seg.time}</span>
                    <p className={seg.id === 3 ? styles.highlightText : styles.normalText}>
                      {seg.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Gradual Knowledge Extraction Sequence */}
          <div className={styles.extractionColumn}>
            <div className={styles.extractionHeader}>
              <span className={styles.aiTag}>MEMORYMAP AI STRUCTURING ENGINE</span>
              <h3 className={styles.extractTitle}>Live Extraction Pipeline</h3>
            </div>

            <div className={styles.pipelineFlow}>
              {/* Step 1: Raw Voice Experience */}
              <div className={styles.pipelineStep}>
                <div className={styles.stepMarker}>01</div>
                <div className={styles.stepContent}>
                  <span className={styles.stepType}>EXPERIENCE</span>
                  <h4 className={styles.stepTitle}>Spontaneous Oral Account</h4>
                  <p className={styles.stepDesc}>35 years of unwritten diagnostic instincts captured via microphone.</p>
                </div>
              </div>

              <div className={styles.connectorArrow}>↓</div>

              {/* Step 2: Extracted Procedure */}
              <div className={`${styles.pipelineStep} ${styles.highlightedStep}`}>
                <div className={styles.stepMarker}>02</div>
                <div className={styles.stepContent}>
                  <span className={styles.stepTypeGreen}>PROCEDURE</span>
                  <h4 className={styles.stepTitle}>Cooling Circulation Sequence</h4>
                  <p className={styles.stepDesc}>Touch lower hose prior to removing thermostat housing.</p>
                </div>
              </div>

              <div className={styles.connectorArrow}>↓</div>

              {/* Step 3: Master Tip */}
              <div className={styles.pipelineStep}>
                <div className={styles.stepMarker}>03</div>
                <div className={styles.stepContent}>
                  <span className={styles.stepTypeBrass}>EXPERT TIP</span>
                  <h4 className={styles.stepTitle}>Aroma & Tactile Signatures</h4>
                  <p className={styles.stepDesc}>Burnt sweet scent at reservoir cap = head gasket pressure seepage.</p>
                </div>
              </div>

              <div className={styles.connectorArrow}>↓</div>

              {/* Step 4: Permanent Archive Catalog Record */}
              <div className={styles.pipelineStepFinal}>
                <span className={styles.finalCatalogNum}>CATALOG RECORD #ARCH-2026-0047</span>
                <h4 className={styles.finalTitle}>Permanent Preserved Knowledge</h4>
                <Link href="/app/knowledge/demo-memory-1" className={styles.exploreRecordBtn}>
                  Inspect Complete Catalog Entry →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
