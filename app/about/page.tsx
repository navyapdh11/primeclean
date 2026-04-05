import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about PrimeClean and our mission to deliver exceptional cleaning services.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="bg-primary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">About PrimeClean</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Our mission is to make professional cleaning accessible, reliable, and stress-free.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                PrimeClean was founded with a simple idea: everyone deserves a clean, comfortable space without the hassle of finding and vetting cleaners. We built a platform that connects you with trusted, background-checked professionals who deliver consistent, high-quality results.
              </p>
              <p className="text-gray-600">
                Whether you need a one-time deep clean or recurring maintenance, our flexible scheduling and transparent pricing make it easy to keep your home or office spotless.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✦ Trust and transparency in every interaction</li>
                  <li>✦ Quality guaranteed on every clean</li>
                  <li>✦ Respect for your home and time</li>
                  <li>✦ Fair compensation for our cleaners</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">What Sets Us Apart</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✦ All cleaners are vetted and background-checked</li>
                  <li>✦ Real-time booking and scheduling</li>
                  <li>✦ Transparent, upfront pricing</li>
                  <li>✦ Satisfaction guarantee on every service</li>
                </ul>
              </div>
            </div>

            <div className="card mt-8 text-center">
              <h3 className="text-xl font-semibold mb-3">Ready to Experience the Difference?</h3>
              <p className="text-gray-600 mb-6">Book your first clean today and see why thousands trust PrimeClean.</p>
              <a href="/book" className="btn-primary inline-block">Book Now</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
