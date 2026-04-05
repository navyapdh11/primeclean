import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingCancelPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="card max-w-md w-full text-center" role="main" aria-labelledby="cancel-heading">
          <div
            className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6"
            aria-hidden="true"
          >
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1
            id="cancel-heading"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Booking Cancelled
          </h1>

          <p className="text-gray-600 mb-2">
            Your booking session was cancelled. No charges have been made.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            If this was a mistake, you can try booking again. Our team is also available to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="btn-primary" aria-label="Try booking again">
              Try Again
            </Link>
            <Link href="/services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
