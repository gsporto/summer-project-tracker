import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { type ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Summer Project Tracker 2023',
  description: 'A tracker for summer project 2023',
  metadataBase: new URL('https://summer-project-tracker.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'Summer Project Tracker 2023',
    description: 'A tracker for summer project 2023',
    images: [
      {
        url: '/og.png',
        width: 512,
        height: 512,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
