import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'archival' | 'dark' | 'accent';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  catalogId?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  catalogId,
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {catalogId && <span className={styles.catalogTag}>{catalogId}</span>}
      {children}
    </div>
  );
};
