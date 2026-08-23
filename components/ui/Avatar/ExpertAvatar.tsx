'use client';

import React, { useState } from 'react';
import styles from './ExpertAvatar.module.css';

interface ExpertAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ExpertAvatar: React.FC<ExpertAvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Get initials fallback (e.g. "Ramesh Kumar" -> "RK")
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`${styles.avatarContainer} ${styles[size]} ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          className={styles.avatarImg}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className={styles.fallbackInitials}>{initials}</div>
      )}
    </div>
  );
};
