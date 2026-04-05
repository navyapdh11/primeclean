import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { DEFAULT_SERVICES } from '@/lib/constants';

export default async function ServicesPage() {
  let services = DEFAULT_SERVICES;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/services`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.services?.length) services = data.services;
    }
  } catch {
    // Fall back to defaults
  }

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
              {services.map((service: any) => (
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
