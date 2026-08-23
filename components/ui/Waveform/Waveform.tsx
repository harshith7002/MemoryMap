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
  barCount = 32,
  height = 32,
  color,
  className = '',
}) => {
  const heights = [
    0.3, 0.7, 0.9, 0.4, 0.8, 1.0, 0.5, 0.9, 0.3, 0.7, 0.6, 0.4, 0.8, 1.0, 0.6, 0.3,
    0.5, 0.9, 0.7, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.8, 0.4, 0.6, 0.8, 0.5, 0.9, 0.4
  ];

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const hFactor = heights[i % heights.length];
        const delay = `${(i * 0.06).toFixed(2)}s`;

        return (
          <span
            key={i}
            className={`${styles.bar} ${isAnimating ? styles.animating : ''}`}
            style={{
              height: `${Math.max(3, height * hFactor)}px`,
              backgroundColor: color || 'var(--color-brass)',
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
};
