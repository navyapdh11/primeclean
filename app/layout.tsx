import './globals.css';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  title: {
    default: 'PrimeClean - Professional Cleaning Services',
    template: '%s | PrimeClean',
  },
  description: 'Book professional cleaning services for your home and business. Trusted cleaners, flexible scheduling, satisfaction guaranteed.',
  keywords: ['cleaning service', 'home cleaning', 'office cleaning', 'professional cleaners', 'maid service'],
  authors: [{ name: 'PrimeClean' }],
  creator: 'PrimeClean',
  publisher: 'PrimeClean',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://primeclean-orpin.vercel.app'),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
    siteName: 'PrimeClean',
    title: 'PrimeClean - Professional Cleaning Services',
    description: 'Book professional cleaning services for your home and business.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PrimeClean - Professional Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeClean - Professional Cleaning Services',
    description: 'Book professional cleaning services for your home and business.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
