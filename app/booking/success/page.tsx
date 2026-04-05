'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="card max-w-md w-full text-center" role="main" aria-labelledby="success-heading">
          <div
            className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-accent-100 mb-6"
            aria-hidden="true"
          >
            <svg
              className="w-10 h-10 text-accent-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            id="success-heading"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Booking Confirmed!
          </h1>

          <p className="text-gray-600 mb-2">
            Your cleaning service has been booked successfully.
          </p>

          {sessionId && (
            <p className="text-sm text-gray-500 mb-6" aria-label="Payment session ID">
              Session: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">{sessionId}</code>
            </p>
          )}

          <p className="text-sm text-gray-500 mb-8">
            We will send you a confirmation email with all the details shortly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard" className="btn-primary" aria-label="View your booking in the dashboard">
              View Booking
            </Link>
            <Link href="/book" className="btn-secondary">
              Book Another
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Want to document the cleaning progress?</p>
            <Link href="/photos" className="text-primary-600 hover:underline text-sm font-medium">
              Upload Before Photos →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="card max-w-md w-full text-center">
              <div className="animate-pulse space-y-4">
                <div className="mx-auto w-20 h-20 rounded-full bg-gray-200" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mt-6" />
              </div>
            </div>
          </main>
          <Footer />
        </>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
