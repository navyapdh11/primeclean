import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';

export default async function ServicesPage() {
  // Fallback services data
  const defaultServices = [
    { id: '1', name: 'Standard Clean', description: 'Regular maintenance cleaning for your home. Includes dusting, vacuuming, mopping, and bathroom sanitization.', price_cents: 9900, duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
    { id: '2', name: 'Deep Clean', description: 'Thorough top-to-bottom cleaning. Perfect for seasonal cleans or homes that need extra attention.', price_cents: 19900, duration: '4-6 hours', image: 'https://images.unsplash.com/photo-1527515637462-cff97ee74741?w=400' },
    { id: '3', name: 'Move In/Out Clean', description: 'Complete cleaning for property transitions. Get your deposit back or welcome new tenants.', price_cents: 24900, duration: '5-8 hours', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: '4', name: 'Office Clean', description: 'Professional workspace cleaning. Keep your office pristine and productive.', price_cents: 14900, duration: '3-4 hours', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
    { id: '5', name: 'Carpet Clean', description: 'Deep carpet cleaning with professional equipment. Removes stains, allergens, and odors.', price_cents: 12900, duration: '2-4 hours', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
    { id: '6', name: 'Window Clean', description: 'Interior and exterior window cleaning. Crystal clear views guaranteed.', price_cents: 7900, duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="bg-primary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
