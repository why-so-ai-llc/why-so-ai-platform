import { NextResponse } from 'next/server';

import { rateLimit } from '@/lib/rate-limit';
import { getStripe } from '@/lib/stripe';
import { isPlanId, subscriptionPlans } from '@/lib/subscription-plans';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(`payment-intent:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const plan = (body as { plan?: unknown } | null)?.plan;
  if (!isPlanId(plan)) {
    return NextResponse.json({ error: 'Invalid subscription plan.' }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Card payments are not configured.' }, { status: 503 });
  }

  try {
    const selected = subscriptionPlans[plan];
    const intent = await getStripe().paymentIntents.create({
      amount: selected.amountCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: `Why So AI ${selected.name} subscription`,
      metadata: { plan },
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error('Failed to create payment intent', error);
    return NextResponse.json({ error: 'Unable to start payment.' }, { status: 500 });
  }
}
