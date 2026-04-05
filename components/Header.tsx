'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧹</span>
            <span className="text-xl font-bold text-primary-600">PrimeClean</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-primary-600 transition-colors">
              Services
            </Link>
            <Link href="/book" className="text-gray-600 hover:text-primary-600 transition-colors">
              Book Now
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="btn-secondary py-2 px-4 text-sm">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary py-2 px-4 text-sm">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/services" className="block py-2 text-gray-600 hover:text-primary-600">
              Services
            </Link>
            <Link href="/book" className="block py-2 text-gray-600 hover:text-primary-600">
              Book Now
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-600 hover:text-primary-600">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="w-full text-left py-2 text-gray-600">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 text-primary-600 font-medium">
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
