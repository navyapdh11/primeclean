import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

const defaultServices = [
  { id: '1', name: 'Standard Clean', description: 'Regular maintenance cleaning for your home.', price_cents: 9900, duration: '2-3 hours', active: true },
  { id: '2', name: 'Deep Clean', description: 'Thorough top-to-bottom cleaning.', price_cents: 19900, duration: '4-6 hours', active: true },
  { id: '3', name: 'Move In/Out Clean', description: 'Complete cleaning for property transitions.', price_cents: 24900, duration: '5-8 hours', active: true },
  { id: '4', name: 'Office Clean', description: 'Professional workspace cleaning.', price_cents: 14900, duration: '3-4 hours', active: true },
  { id: '5', name: 'Carpet Clean', description: 'Deep carpet cleaning with professional equipment.', price_cents: 12900, duration: '2-4 hours', active: true },
  { id: '6', name: 'Window Clean', description: 'Interior and exterior window cleaning.', price_cents: 7900, duration: '1-2 hours', active: true },
];

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ services: defaultServices });
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('price_cents', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ services: data?.length ? data : defaultServices });
  } catch (error: any) {
    console.error('Get services error:', error);
    return NextResponse.json({ services: defaultServices });
  }
}
