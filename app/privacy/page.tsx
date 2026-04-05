import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how PrimeClean collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-4 text-lg text-primary-100">Last updated: April 5, 2026</p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
          <p className="text-gray-600 leading-relaxed">
            PrimeClean (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you
            use our cleaning services, website, or mobile application. By using our services, you consent to the
            practices described in this policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Personal Information You Provide</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Account details:</strong> Name, email address, phone number, and password when you register.</li>
            <li><strong>Booking information:</strong> Service preferences, property address, access instructions, and special requests.</li>
            <li><strong>Payment data:</strong> Billing address and payment card details (processed securely by Stripe; we do not store full card numbers).</li>
            <li><strong>Communications:</strong> Messages, reviews, and feedback you send to us.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Device data:</strong> IP address, browser type, operating system, and device identifiers.</li>
            <li><strong>Usage data:</strong> Pages visited, features used, booking patterns, and session duration.</li>
            <li><strong>Cookies and tracking:</strong> We use cookies, pixels, and similar technologies to enhance your experience and analyze usage.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Service delivery:</strong> To schedule, manage, and fulfill cleaning appointments.</li>
            <li><strong>Account management:</strong> To create and maintain your account, process payments, and send confirmations.</li>
            <li><strong>Communication:</strong> To respond to inquiries, send service updates, and provide customer support.</li>
            <li><strong>Improvement:</strong> To analyze usage patterns, improve our platform, and develop new features.</li>
            <li><strong>Marketing:</strong> With your consent, to send promotional emails about offers and services (you may opt out at any time).</li>
            <li><strong>Compliance:</strong> To meet legal obligations, resolve disputes, and enforce our agreements.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. How We Share Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li><strong>Service providers:</strong> Cleaners assigned to your booking receive your property address and access instructions.</li>
            <li><strong>Payment processors:</strong> Stripe handles all payment processing; see <a href="https://stripe.com/privacy" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>.</li>
            <li><strong>Analytics partners:</strong> Aggregated, anonymized data may be shared with analytics services to improve our platform.</li>
            <li><strong>Legal authorities:</strong> When required by law, regulation, or legal process.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We retain your personal information for as long as your account is active or as needed to provide services.
            After account deletion, we retain booking records for up to <strong>7 years</strong> for tax and legal
            compliance purposes. Aggregated, anonymized data may be retained indefinitely for analytical purposes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
            <li><strong>Portability:</strong> Request a machine-readable copy of your data.</li>
            <li><strong>Restriction:</strong> Request that we limit the way we process your data.</li>
            <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing.</li>
            <li><strong>Withdraw consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@primeclean.com" className="text-primary-600 underline">
              privacy@primeclean.com
            </a>
            . We will respond within 30 days.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Regular security audits and penetration testing.</li>
            <li>Role-based access controls and least-privilege principles.</li>
            <li>Secure infrastructure hosted on AWS with SOC 2 compliance.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            We use essential cookies for authentication and session management, and optional analytics cookies to
            understand platform usage. You can manage cookie preferences through your browser settings. For more
            details, see our Cookie Policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Children&apos;s Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children. If you believe we have inadvertently collected such data, please contact us and
            we will promptly delete it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-600 leading-relaxed">
            Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place,
            including Standard Contractual Clauses, to protect your data in accordance with this policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting a
            prominent notice on our platform or via email. Your continued use of our services after such changes
            constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">11. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <address className="not-italic text-gray-600 mt-3 space-y-1">
            <p><strong>PrimeClean</strong></p>
            <p>Email: <a href="mailto:privacy@primeclean.com" className="text-primary-600 underline">privacy@primeclean.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Clean Street, Suite 100, San Francisco, CA 94102</p>
          </address>
        </article>
      </main>
      <Footer />
    </>
  );
}
