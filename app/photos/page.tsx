import { createClient } from '@/lib/supabase-server';
import PhotoManager from '@/components/PhotoManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Photos',
  description: 'Manage cleaning photos - before, after, and quality documentation.',
};

export default async function PhotosPage() {
  let photos: any[] = [];

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      photos = data || [];
    }
  } catch {
    // Not configured
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Photo Management</h1>
            <p className="text-gray-600 mt-1">Upload and manage before/after cleaning photos.</p>
          </div>

          <PhotoManager initialPhotos={photos} />
        </div>
      </main>
      <Footer />
    </>
  );
}
