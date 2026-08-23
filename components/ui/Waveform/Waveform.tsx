import React from 'react';
import styles from './Waveform.module.css';

export interface WaveformProps {
  isAnimating?: boolean;
  barCount?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isAnimating = true,
  barCount = 28,
  height = 36,
  color,
  className = '',
}) => {
  // Generate pseudo-random heights for natural waveform look
  const heights = [
    0.3, 0.6, 0.9, 0.4, 0.7, 1.0, 0.5, 0.8, 0.3, 0.9, 0.6, 0.4, 0.8, 1.0, 0.7, 0.3,
    0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.9, 0.3, 0.6, 0.8, 0.4, 0.7
  ];

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const hFactor = heights[i % heights.length];
        const animationDelay = `${(i * 0.08).toFixed(2)}s`;
        const animationDuration = `${(0.6 + (i % 5) * 0.15).toFixed(2)}s`;

        return (
          <span
            key={i}
            className={`${styles.bar} ${isAnimating ? styles.animating : ''}`}
            style={{
              height: `${Math.max(4, height * hFactor)}px`,
              backgroundColor: color || 'var(--color-amber)',
              animationDelay,
              animationDuration,
            }}
          />
        );
      })}
    </div>
  );
};
