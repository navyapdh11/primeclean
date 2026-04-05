import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Cancellation Policy',
  description: 'PrimeClean cancellation and refund policy.',
};

export default function CancellationPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Cancellation Policy</h1>
            <p className="mt-4 text-lg text-primary-100">Last updated: April 5, 2026</p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
          <p className="text-gray-600 leading-relaxed">
            We understand that plans can change. This policy outlines our cancellation and refund terms so you know
            exactly what to expect if you need to cancel or reschedule a cleaning appointment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Cancellation Timeframes</h2>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Notice Period</th>
                  <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Refund Amount</th>
                  <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Cancellation Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">More than 24 hours</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">Full refund (100%)</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-accent-600 font-medium">None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">12 - 24 hours</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">Partial refund (50%)</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-red-500 font-medium">50%</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">Less than 12 hours</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">No refund</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-red-500 font-medium">100%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">No-show</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-gray-600">No refund</td>
                  <td className="border border-gray-200 px-6 py-3 text-sm text-red-500 font-medium">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How to Cancel</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Online:</strong> Log in to your dashboard and select the booking you wish to cancel. Click &quot;Cancel Booking&quot; and confirm.</li>
            <li><strong>Email:</strong> Send a cancellation request to <a href="mailto:support@primeclean.com" className="text-primary-600 underline">support@primeclean.com</a> with your booking reference.</li>
            <li><strong>Phone:</strong> Call us at +1 (555) 123-4567 during business hours (Mon-Sat, 8am-8pm).</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            The cancellation time is recorded from the moment we receive your request. We recommend cancelling through
            your dashboard for the fastest processing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Rescheduling</h2>
          <p className="text-gray-600 leading-relaxed">
            If you need to change the date or time of your booking, you may reschedule instead of cancelling:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li><strong>More than 24 hours notice:</strong> Free rescheduling to any available slot.</li>
            <li><strong>Less than 24 hours notice:</strong> Rescheduling is treated as a cancellation, and standard fees apply.</li>
            <li>You may reschedule a booking up to <strong>2 times</strong> without penalty.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Refund Processing</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Refunds are processed within <strong>5-10 business days</strong> of cancellation confirmation.</li>
            <li>Refunds are issued to the original payment method.</li>
            <li>You will receive an email confirmation once the refund has been initiated.</li>
            <li>The timing of the refund appearing on your statement depends on your bank or card issuer.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. PrimeClean-Initiated Cancellations</h2>
          <p className="text-gray-600 leading-relaxed">
            In the rare event that we need to cancel your booking:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li>You will receive a <strong>full refund</strong> regardless of notice period.</li>
            <li>We will offer you priority rescheduling to the next available slot.</li>
            <li>As a gesture of goodwill, we may provide a discount code for your next booking.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Recurring Bookings</h2>
          <p className="text-gray-600 leading-relaxed">
            For recurring (weekly/bi-weekly/monthly) cleaning plans:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li>You may cancel your recurring plan at any time; the cancellation applies to all future bookings.</li>
            <li>Individual scheduled cleans within the plan are subject to the standard cancellation timeframes above.</li>
            <li>Cancelling your plan does not affect cleans that have already been completed.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Exceptions</h2>
          <p className="text-gray-600 leading-relaxed">
            We may make exceptions to this policy on a case-by-case basis for:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
            <li>Medical emergencies (documentation may be required).</li>
            <li>Severe weather or natural disasters that make service unsafe or impossible.</li>
            <li>Government-issued mandates (e.g., lockdowns, quarantine orders).</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            Contact <a href="mailto:support@primeclean.com" className="text-primary-600 underline">support@primeclean.com</a> to
            request an exception review.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this policy or need help with a cancellation:
          </p>
          <address className="not-italic text-gray-600 mt-3 space-y-1">
            <p><strong>PrimeClean Support</strong></p>
            <p>Email: <a href="mailto:support@primeclean.com" className="text-primary-600 underline">support@primeclean.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday-Saturday, 8:00 AM - 8:00 PM</p>
          </address>
        </article>
      </main>
      <Footer />
    </>
  );
}
