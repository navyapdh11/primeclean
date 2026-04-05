import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhotoManager from '@/components/PhotoManager';

export default async function DashboardPage() {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    // Not configured — show empty state
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Required</h1>
          <p className="text-gray-600 mb-6">Please set up your Supabase environment variables to use the dashboard.</p>
          <a href="/" className="btn-primary inline-block">Go Home</a>
        </div>
      </div>
    );
  }

  let user;
  try {
    const { data: { user: u } } = await supabase.auth.getUser();
    user = u;
  } catch {
    return redirect('/login');
  }

  if (!user) {
    redirect('/login');
  }

  let bookings: any[] = [];
  try {
    const { data } = await supabase
      .from('bookings')
      .select('*, services(name)')
      .eq('user_id', user.id)
      .order('date', { ascending: true });
    bookings = data || [];
  } catch {
    // DB may not be set up yet — show empty state
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{booking.services?.name || 'Cleaning Service'}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          📅 {booking.date} at {booking.time}
                        </p>
                        {booking.address && (
                          <p className="text-sm text-gray-500">📍 {booking.address}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No bookings yet.</p>
                <a href="/book" className="btn-primary inline-block">Book Your First Clean</a>
              </div>
            )}
          </div>

          {/* Photos Section */}
          <div className="card mt-8">
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            <PhotoManager initialPhotos={[]} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
