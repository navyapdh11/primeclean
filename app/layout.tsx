import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrimeClean - Professional Cleaning Services',
  description: 'Professional cleaning services for your home and business',
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
