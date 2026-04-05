'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase-client';

const defaultServices = [
  { id: '1', name: 'Standard Clean', price_cents: 9900, duration: '2-3 hours' },
  { id: '2', name: 'Deep Clean', price_cents: 19900, duration: '4-6 hours' },
  { id: '3', name: 'Move In/Out Clean', price_cents: 24900, duration: '5-8 hours' },
  { id: '4', name: 'Office Clean', price_cents: 14900, duration: '3-4 hours' },
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export default function BookPage() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: selectedService, date, time, address }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      window.location.href = data.url;
    } catch (error: any) {
      alert(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-6">Please sign in to book a cleaning service.</p>
            <a href="/login" className="btn-primary">Sign In</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h1 className="text-3xl font-bold mb-6">Book a Cleaning Service</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Service *</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select a service</option>
                  {defaultServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - ${(s.price_cents / 100).toFixed(2)} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Time *</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address for the cleaning service"
                  className="input"
                  rows={3}
                />
              </div>

              <button type="submit" disabled={loading || !selectedService || !date || !time} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
