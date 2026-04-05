export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ photos: [], pagination: { page: 1, limit: 20, total: 0, total_pages: 0 } });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const skip = (page - 1) * limit;

    let query = supabase
      .from('photos')
      .select('*', { count: 'exact' })
      .eq('uploaded_by', user.id)
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (bookingId) query = query.eq('booking_id', bookingId);
    if (type) query = query.eq('type', type);

    const { data: photos, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      photos: photos || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        total_pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Photo list failed:', error);
    return NextResponse.json({ photos: [], pagination: { page: 1, limit: 20, total: 0, total_pages: 0 } });
  }
}
