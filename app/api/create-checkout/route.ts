import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';
import { bookingSchema } from '@/lib/validation';
import { DEFAULT_SERVICES } from '@/lib/constants';

const stripeKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: NextRequest) {
  if (!stripeKey) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 503 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { serviceId, date, time, address } = validation.data;

    // Try DB first, fall back to defaults
    let service: { name: string; price_cents: number } | null = null;

    try {
      const { data } = await supabase
        .from('services')
        .select('name, price_cents')
        .eq('id', serviceId)
        .single();
      service = data;
    } catch {
      // DB might be empty, fall through
    }

    if (!service) {
      const fallback = DEFAULT_SERVICES.find((s) => s.id === serviceId);
      if (!fallback) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      service = { name: fallback.name, price_cents: fallback.price_cents };
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as Stripe.LatestApiVersion });

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: `Cleaning service on ${date} at ${time}`,
            },
            unit_amount: service.price_cents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/booking/cancel`,
      metadata: { serviceId, date, time, address: address || '', userId: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe checkout error:', message);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
