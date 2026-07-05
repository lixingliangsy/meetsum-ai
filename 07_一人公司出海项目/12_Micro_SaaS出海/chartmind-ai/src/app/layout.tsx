// src/app/layout.tsx
// Root layout for ChartMind AI

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChartMind AI - AI-Powered Chart Recognition',
  description: 'Upload any chart image and let AI recognize the chart type, extract the data, and generate a new interactive chart.',
  keywords: ['chart', 'recognition', 'AI', 'data extraction', 'visualization'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
