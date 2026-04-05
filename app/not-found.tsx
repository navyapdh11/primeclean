import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-8xl font-extrabold text-primary-600">404</h1>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
