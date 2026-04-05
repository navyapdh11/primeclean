import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ bookings: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let query = supabase
      .from('bookings')
      .select('*, services(*)')
      .order('date', { ascending: true });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ bookings: data || [] });
  } catch (error: any) {
    console.error('Get bookings error:', error);
    return NextResponse.json({ bookings: [] });
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { serviceId, date, time, address } = await req.json();

    if (!serviceId || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        service_id: serviceId,
        date,
        time,
        address: address || '',
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: data });
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
