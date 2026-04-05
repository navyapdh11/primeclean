import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ received: true });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as any });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ received: true });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { serviceId, date, time, address, userId } = session.metadata || {};

      await supabase.from('bookings').insert({
        user_id: userId,
        service_id: serviceId,
        date,
        time,
        address,
        stripe_session_id: session.id,
        amount_paid: session.amount_total,
        status: 'confirmed',
      });

      if (session.customer) {
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer;
        await supabase
          .from('customers')
          .upsert({ user_id: userId, stripe_customer_id: customerId }, { onConflict: 'user_id' });
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
