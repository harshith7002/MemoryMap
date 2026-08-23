import React from 'react';

type IconProps = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const IconOverview: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <rect x="2.25" y="2.25" width="6" height="6" rx="1.1" />
    <rect x="9.75" y="2.25" width="6" height="6" rx="1.1" />
    <rect x="2.25" y="9.75" width="6" height="6" rx="1.1" />
    <rect x="9.75" y="9.75" width="6" height="6" rx="1.1" />
  </svg>
);

export const IconRecord: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <rect x="6.5" y="2" width="5" height="8.5" rx="2.5" />
    <path d="M4 8.75c0 2.76 2.24 5 5 5s5-2.24 5-5" />
    <line x1="9" y1="13.75" x2="9" y2="16" />
    <line x1="6.75" y1="16" x2="11.25" y2="16" />
  </svg>
);

export const IconKnowledge: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <path d="M2.5 3.75c1.6-.7 3.4-.7 5 0v10.5c-1.6-.7-3.4-.7-5 0Z" />
    <path d="M15.5 3.75c-1.6-.7-3.4-.7-5 0v10.5c1.6-.7 3.4-.7 5 0Z" />
  </svg>
);

export const IconPeople: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <circle cx="6.75" cy="6" r="2.35" />
    <path d="M2.4 15c.5-2.6 2.3-4.1 4.35-4.1S10.7 12.4 11.2 15" />
    <circle cx="12.5" cy="5.4" r="1.85" />
    <path d="M11.6 10.15c1.75.15 3.1 1.55 3.5 3.6" />
  </svg>
);

export const IconTimeline: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <line x1="2.25" y1="9" x2="15.75" y2="9" />
    <circle cx="4.75" cy="9" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="13.25" cy="9" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconAsk: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <path d="M2.5 4.75c0-.97.78-1.75 1.75-1.75h9.5c.97 0 1.75.78 1.75 1.75v6.5c0 .97-.78 1.75-1.75 1.75H8.5l-3.25 2.75v-2.75H4.25c-.97 0-1.75-.78-1.75-1.75Z" />
    <line x1="5.75" y1="6.5" x2="12.25" y2="6.5" />
    <line x1="5.75" y1="9" x2="10" y2="9" />
  </svg>
);

export const IconSettings: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="9" r="2.35" />
    <path d="M9 2.75v1.6M9 13.65v1.6M15.25 9h-1.6M4.35 9h-1.6M13.2 4.8l-1.13 1.13M5.93 12.07l-1.13 1.13M13.2 13.2l-1.13-1.13M5.93 5.93 4.8 4.8" />
  </svg>
);

export const IconPlay: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <path d="M4.5 3.2v11.6c0 .82.9 1.32 1.6.88l9.2-5.8c.65-.41.65-1.35 0-1.76l-9.2-5.8c-.7-.44-1.6.06-1.6.88Z" />
  </svg>
);

export const IconPause: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <rect x="4.75" y="3" width="3" height="12" rx="1" />
    <rect x="10.25" y="3" width="3" height="12" rx="1" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ className, size }) => (
  <svg {...base(size)} className={className}>
    <path d="M3.5 9.5 7 13l7.5-8" />
  </svg>
);
