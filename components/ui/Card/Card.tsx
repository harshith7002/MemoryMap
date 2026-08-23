import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'featured' | 'compact' | 'accent';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
