import React from 'react';
import styles from './Tag.module.css';

export interface TagProps {
  label: string;
  variant?: 'green' | 'amber' | 'brown' | 'dark' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${styles[size]} ${className}`}>
      {label}
    </span>
  );
};
