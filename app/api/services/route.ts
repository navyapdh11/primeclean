import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { DEFAULT_SERVICES } from '@/lib/constants';

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ services: DEFAULT_SERVICES });
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('price_cents', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ services: data?.length ? data : DEFAULT_SERVICES });
  } catch (error: unknown) {
    console.error('Get services error:', error);
    return NextResponse.json({ services: DEFAULT_SERVICES });
  }
}
