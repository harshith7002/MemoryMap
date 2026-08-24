import React from 'react';
import { Waveform } from '@/components/ui/Waveform/Waveform';

interface MemoryAudioPlayerProps {
  memory: any;
  styles: any;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: string;
  handleJumpToTimestamp: (timestamp: string) => void;
  variant?: 'default' | 'demo';
  renderPart?: 'all' | 'player' | 'timestamps';
}

export function MemoryAudioPlayer({
  memory,
  styles,
  isPlaying,
  setIsPlaying,
  currentTime,
  handleJumpToTimestamp,
  variant = 'default',
  renderPart = 'all'
}: MemoryAudioPlayerProps) {
  if (variant === 'demo') {
    return (
      <div className={styles.audioPlayerCard}>
        <div className={styles.playerHeader}>
          <div className={styles.playerTitleRow}>
            <span className={styles.playerIcon}>🎙️</span>
            <div>
              <h3 className={styles.playerTitle}>Original Spoken Recording</h3>
              <span className={styles.playerSubtitle}>
                Verify source audio timestamp — {memory.expertName}
              </span>
            </div>
          </div>
          <button
            className={styles.playButtonBig}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️ Pause' : '▶ Play Audio'}
          </button>
        </div>

        <div className={styles.waveformBox}>
          <Waveform isAnimating={isPlaying} barCount={42} height={44} color="var(--color-amber)" />
          <div className={styles.timeMeta}>
            <span>{currentTime}</span>
            <span>{memory.duration}</span>
          </div>
        </div>

        <div className={styles.timestampSection}>
          <span className={styles.timestampLabel}>Jump to source timestamp:</span>
          <div className={styles.timestampButtons}>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('02:17')}
            >
              🔊 02:17 — Diagnostic procedure
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('03:45')}
            >
              🔊 03:45 — Expert tip on radiator cap
            </button>
            <button
              className={styles.timeBtn}
              onClick={() => handleJumpToTimestamp('04:10')}
            >
              🔊 04:10 — Story of the apprentice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {(renderPart === 'all' || renderPart === 'player') && (
        <div className={styles.audioCard}>
          <div className={styles.audioCardTop}>
            <div className={styles.trackMeta}>
              <span className={styles.trackTitle}>Spoken Recording</span>
              <span className={styles.timeMeta}>Timestamp: {currentTime} / Total: {memory.duration}</span>
            </div>
            <button
              className={styles.playToggleBtn}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play Spoken Account'}
            </button>
          </div>

          <div className={styles.waveformContainer}>
            <Waveform isAnimating={isPlaying} barCount={40} height={36} color="var(--color-amber)" />
          </div>
        </div>
      )}

      {(renderPart === 'all' || renderPart === 'timestamps') && (
        <div className={styles.sourceCard}>
          <h2 className={styles.sectionTitle}>Original source timestamps</h2>
          <p className={styles.sourceSub}>Click any timestamp to jump directly to that point in the recording:</p>

          <div className={styles.timestampButtons}>
            <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('02:17')}>
              🔊 02:17 — Diagnostic procedure
            </button>
            <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('03:45')}>
              🔊 03:45 — Tactile inspection test
            </button>
            <button className={styles.stampBtn} onClick={() => handleJumpToTimestamp('04:10')}>
              🔊 04:10 — Apprenticeship story
            </button>
          </div>
        </div>
      )}
    </>
  );
}
