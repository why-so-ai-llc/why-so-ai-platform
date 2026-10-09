import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  if (!secret || !signature) {
    return NextResponse.json({ error: 'Webhook not configured or signature missing.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.info('Payment succeeded', { id: intent.id, amount: intent.amount, plan: intent.metadata?.plan });
      // Subscription activation / confirmation email hook goes here.
      break;
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.warn('Payment failed', { id: intent.id, reason: intent.last_payment_error?.message });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
