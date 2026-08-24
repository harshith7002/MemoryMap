import React, { ReactNode } from 'react';

interface MemorySectionProps {
  styles: any;
  title: string;
  titleClassName?: string;
  className?: string;
  children: ReactNode;
}

export function MemorySection({
  styles,
  title,
  titleClassName,
  className,
  children
}: MemorySectionProps) {
  return (
    <div className={className || styles.sectionCard}>
      <h2 className={titleClassName || styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}
