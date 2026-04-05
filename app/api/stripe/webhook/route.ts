import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!stripeKey || !webhookSecret) {
    console.warn(
      '[Stripe Webhook] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET. Webhook events will be ignored.'
    );
    return NextResponse.json({ received: true });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as Stripe.LatestApiVersion });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Stripe Webhook] Signature verification failed:', message);
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
      console.error('[Stripe Webhook] Payment failed:', paymentIntent.id);

      // Update booking status to failed
      await supabase
        .from('bookings')
        .update({ status: 'payment_failed' })
        .eq('stripe_session_id', paymentIntent.id);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      await supabase
        .from('bookings')
        .update({ status: 'refunded' })
        .eq('stripe_session_id', charge.payment_intent as string);
      break;
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
