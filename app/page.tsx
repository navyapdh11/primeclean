import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CleaningBusiness',
  'name': 'PrimeClean',
  'description': 'Professional cleaning services for your home and business',
  'url': process.env.NEXT_PUBLIC_URL || 'https://primeclean-orpin.vercel.app',
  'priceRange': '$$',
  'serviceType': ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Move In/Out Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'US',
  },
  'openingHours': 'Mo-Su 08:00-18:00',
  'sameAs': [],
};

export default function Home() {
  return (
    <>
      <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Professional Cleaning
                <span className="block text-accent-300">Made Simple</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-primary-100">
                Trusted cleaners for your home and business. Book in minutes, enjoy a spotless space all week.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="btn-accent text-lg">
                  Book Now
                </Link>
                <Link href="/services" className="btn-secondary border-white text-white hover:bg-white/10 text-lg">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose PrimeClean?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  title: 'Trusted Cleaners',
                  desc: 'Vetted, background-checked professionals with 5-star ratings.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Flexible Scheduling',
                  desc: 'Book same-day or schedule recurring cleans on your terms.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Transparent Pricing',
                  desc: 'Upfront quotes with no hidden fees. Pay only when satisfied.',
                },
              ].map((feature) => (
                <div key={feature.title} className="card text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for a Cleaner Space?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of happy customers. Your first clean is just a click away.
            </p>
            <Link href="/book" className="btn-primary text-lg">
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
