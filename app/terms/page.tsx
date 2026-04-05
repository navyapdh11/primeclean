import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using PrimeClean cleaning services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
            <p className="mt-4 text-lg text-primary-100">Last updated: April 5, 2026</p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
          <p className="text-gray-600 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of PrimeClean&apos;s website,
            mobile application, and cleaning services (collectively, the &quot;Services&quot;). By accessing or using
            our Services, you agree to be bound by these Terms. If you do not agree, do not use our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be at least 18 years old and capable of entering into legally binding agreements to use our
            Services. By using PrimeClean, you represent and warrant that you meet these requirements.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Account Registration</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>Notify us immediately of any unauthorized use of your account at{' '}
              <a href="mailto:support@primeclean.com" className="text-primary-600 underline">
                support@primeclean.com
              </a>.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Booking and Scheduling</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Bookings are confirmed only upon successful payment and receipt of a confirmation email.</li>
            <li>Available time slots are subject to change based on cleaner availability.</li>
            <li>You must provide accurate property addresses and any access instructions (e.g., key codes, gate access).</li>
            <li>We reserve the right to reschedule a booking with at least 2 hours&apos; notice if a cleaner is unavailable.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Pricing and Payment</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>All prices are displayed in your local currency and include applicable taxes unless stated otherwise.</li>
            <li>Payment is processed at the time of booking via Stripe, our secure payment provider.</li>
            <li>We accept major credit and debit cards. Additional payment methods may be added over time.</li>
            <li>Prices are subject to change. Changes will not affect confirmed bookings.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Cancellations and Refunds</h2>
          <p className="text-gray-600 leading-relaxed">
            Our cancellation and refund policy is as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li><strong>More than 24 hours before service:</strong> Full refund, no cancellation fee.</li>
            <li><strong>12-24 hours before service:</strong> 50% refund.</li>
            <li><strong>Less than 12 hours before service:</strong> No refund.</li>
            <li><strong>No-show:</strong> Full charge applies.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            For full details, see our{' '}
            <a href="/cancellation-policy" className="text-primary-600 underline">Cancellation Policy</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Service Quality and Satisfaction</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>We strive to deliver high-quality cleaning services on every booking.</li>
            <li>If you are not satisfied with the service, contact us within <strong>24 hours</strong> of completion.</li>
            <li>We will arrange a re-clean at no additional cost or offer a partial/full refund at our discretion.</li>
            <li>Claims for damaged items must be reported within 48 hours with photographic evidence.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Customer Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Ensure the property is accessible at the scheduled time.</li>
            <li>Secure pets and remove valuable or fragile items before the cleaner arrives.</li>
            <li>Provide necessary utilities (water, electricity) for the cleaning.</li>
            <li>Inform us of any hazardous materials or areas that should not be cleaned.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            To the maximum extent permitted by law:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li>PrimeClean&apos;s total liability for any claim arising from the Services shall not exceed the amount paid for the specific booking giving rise to the claim.</li>
            <li>We are not liable for indirect, incidental, consequential, or punitive damages.</li>
            <li>We are not responsible for pre-existing damage to property or loss of items not caused by our cleaners.</li>
            <li>We do not guarantee the removal of all stains, mold, or damage that may require specialized treatment.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Indemnification</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to indemnify and hold harmless PrimeClean, its employees, contractors, and affiliates from any
            claims, damages, losses, or expenses arising from your use of the Services, your breach of these Terms, or
            your violation of any third-party rights.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content, trademarks, logos, and intellectual property on the PrimeClean platform are owned by or
            licensed to PrimeClean. You may not reproduce, distribute, or create derivative works without our express
            written consent.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">11. Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to suspend or terminate your account at any time, with or without cause, including for
            violations of these Terms. Upon termination, your right to use the Services will cease immediately.
            Outstanding obligations (including payments for services already rendered) survive termination.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">12. Dispute Resolution</h2>
          <p className="text-gray-600 leading-relaxed">
            Any disputes arising from these Terms or the Services shall first be addressed through good-faith
            negotiations. If unresolved, disputes will be settled by binding arbitration in accordance with the rules
            of the American Arbitration Association, in San Francisco, California. You retain the right to pursue
            claims in small claims court.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">13. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms are governed by the laws of the State of California, without regard to its conflict of law
            principles.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">14. Changes to These Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may modify these Terms at any time. Material changes will be communicated via email or a prominent
            notice on our platform at least 14 days before they take effect. Your continued use after changes
            constitutes acceptance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">15. Contact</h2>
          <address className="not-italic text-gray-600 mt-3 space-y-1">
            <p><strong>PrimeClean</strong></p>
            <p>Email: <a href="mailto:legal@primeclean.com" className="text-primary-600 underline">legal@primeclean.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Clean Street, Suite 100, San Francisco, CA 94102</p>
          </address>
        </article>
      </main>
      <Footer />
    </>
  );
}
