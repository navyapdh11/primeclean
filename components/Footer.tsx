import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧹</span>
              <span className="text-xl font-bold text-white">PrimeClean</span>
            </div>
            <p className="text-sm text-gray-400">
              Professional cleaning services for homes and businesses. Trusted by thousands.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Home Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Office Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Deep Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Move In/Out</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Now</Link></li>
              <li><a href="mailto:hello@primeclean.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {year} PrimeClean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
