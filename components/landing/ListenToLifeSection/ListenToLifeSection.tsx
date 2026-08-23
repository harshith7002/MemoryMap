'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waveform } from '@/components/ui/Waveform/Waveform';
import styles from './ListenToLifeSection.module.css';

export const ListenToLifeSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStage, setActiveStage] = useState<number>(3); // 1: Voice, 2: Transcript, 3: Extraction

  return (
    <section className={styles.fullBleedSection}>
      <div className={styles.container}>
        {/* Section Metadata */}
        <div className={styles.sectionHeader}>
          <span className={styles.monoTag}>[ EXHIBIT 02 // ARCHIVAL TRANSFORMATION ]</span>
          <h2 className={styles.title}>Knowledge Is Alive</h2>
          <p className={styles.subtitle}>
            Watch spontaneous oral accounts evolve into verified, structured institutional memory.
          </p>
        </div>

        {/* Transformation Pipeline Stage Selector */}
        <div className={styles.stageBar}>
          <button
            className={`${styles.stageTab} ${activeStage === 1 ? styles.stageActive : ''}`}
            onClick={() => setActiveStage(1)}
          >
            <span className={styles.stageNum}>01</span>
            <span className={styles.stageName}>RAW VOICE RECORDING</span>
          </button>
          <span className={styles.stageArrow}>➔</span>

          <button
            className={`${styles.stageTab} ${activeStage === 2 ? styles.stageActive : ''}`}
            onClick={() => setActiveStage(2)}
          >
            <span className={styles.stageNum}>02</span>
            <span className={styles.stageName}>SPOKEN TRANSCRIPT</span>
          </button>
          <span className={styles.stageArrow}>➔</span>

          <button
            className={`${styles.stageTab} ${activeStage === 3 ? styles.stageActive : ''}`}
            onClick={() => setActiveStage(3)}
          >
            <span className={styles.stageNum}>03</span>
            <span className={styles.stageName}>AI EXTRACTION & CATALOGING</span>
          </button>
        </div>

        {/* Live Transformation Board */}
        <div className={styles.transformationBoard}>
          {/* STAGE 1: RAW VOICE */}
          {activeStage === 1 && (
            <div className={styles.stagePane}>
              <div className={styles.paneMeta}>STAGE 01 // ACOUSTIC VOICE CAPTURE</div>
              <div className={styles.audioPlayerBox}>
                <div className={styles.playerControls}>
                  <button
                    className={styles.playBtn}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? '⏸ PAUSE ARCHIVE AUDIO' : '▶ PLAY SPOKEN ACCOUNT'}
                  </button>
                  <span className={styles.timeMono}>TIMESTAMP: 02:17 / 04:32</span>
                </div>

                <div className={styles.waveformContainer}>
                  <Waveform isAnimating={isPlaying} barCount={48} height={40} color="var(--color-brass)" />
                </div>
                <p className={styles.paneDesc}>
                  Unfiltered 8-minute audio captured in a workshop setting. Trapped in audio file format without indexing.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 2: TRANSCRIPT */}
          {activeStage === 2 && (
            <div className={styles.stagePane}>
              <div className={styles.paneMeta}>STAGE 02 // SPOKEN VERBATIM TRANSCRIPT</div>
              <blockquote className={styles.rawTranscriptQuote}>
                “When this engine starts making that high-pitched metallic ticking, most guys grab the scanner. But if you put your hand right on the thermostat housing... you feel the pulse. If the lower hose is cold while the top is scalding hot, that's water pump impeller erosion...”
              </blockquote>
            </div>
          )}

          {/* STAGE 3: AI EXTRACTION (SIGNATURE DEMO) */}
          {activeStage === 3 && (
            <div className={styles.stagePane}>
              <div className={styles.paneMeta}>STAGE 03 // EXTRACTED & CATALOGED KNOWLEDGE RECORD</div>

              <div className={styles.extractionCardsGrid}>
                {/* Extracted Procedure */}
                <div className={styles.extractedCard}>
                  <span className={styles.cardTypeGreen}>[ PROCEDURE ]</span>
                  <h3 className={styles.cardTitle}>Cooling System Circulation Test</h3>
                  <p className={styles.cardDesc}>Check coolant flow and hose temperature differential before replacing thermostat housing.</p>
                  <span className={styles.sourceTag}>Verbatim Audio Ref: 02:17</span>
                </div>

                {/* Extracted Expert Tip */}
                <div className={styles.extractedCard}>
                  <span className={styles.cardTypeBrass}>[ MASTER PRACTITIONER TIP ]</span>
                  <h3 className={styles.cardTitle}>Tactile & Aroma Diagnostics</h3>
                  <p className={styles.cardDesc}>Burnt sweet scent at reservoir cap indicates early cylinder head gasket pressure seepage.</p>
                  <span className={styles.sourceTag}>Verbatim Audio Ref: 03:45</span>
                </div>

                {/* Extracted Common Mistake */}
                <div className={styles.extractedCard}>
                  <span className={styles.cardTypeRust}>[ COMMON MISTAKE TO AVOID ]</span>
                  <h3 className={styles.cardTitle}>Premature Thermostat Swap</h3>
                  <p className={styles.cardDesc}>Replacing the thermostat immediately without verifying actual impeller cavitation.</p>
                  <span className={styles.sourceTag}>Verbatim Audio Ref: 04:10</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className={styles.bottomLinkRow}>
          <Link href="/app/knowledge/demo-memory-1" className={styles.inspectCatalogBtn}>
            Inspect Full Digitized Field Recording Catalog Entry #ARCH-0047 →
          </Link>
        </div>
      </div>
    </section>
  );
};
