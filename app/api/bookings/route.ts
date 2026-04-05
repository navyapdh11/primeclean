import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { bookingSchema } from '@/lib/validation';

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ bookings: [] });
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*, services(*)')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ bookings: data || [] });
  } catch (error: unknown) {
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

    const body = await req.json();
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { serviceId, date, time, address } = validation.data;

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return NextResponse.json({ error: 'Date must be in the future' }, { status: 400 });
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
  } catch (error: unknown) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
