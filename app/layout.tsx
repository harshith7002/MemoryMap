import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MemoryMap — Preserve Expert Knowledge',
  description: 'Record, structure, and explore the knowledge of experts before it is lost.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
