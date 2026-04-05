import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
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
                { icon: '⭐', title: 'Trusted Cleaners', desc: 'Vetted, background-checked professionals with 5-star ratings.' },
                { icon: '📅', title: 'Flexible Scheduling', desc: 'Book same-day or schedule recurring cleans on your terms.' },
                { icon: '💰', title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. Pay only when satisfied.' },
              ].map((feature) => (
                <div key={feature.title} className="card text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
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
