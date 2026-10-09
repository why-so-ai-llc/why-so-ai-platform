'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function StripeProvider({ clientSecret, children }: { clientSecret: string; children: ReactNode }) {
  if (!stripePromise) {
    return <p className="text-sm text-red-300">Card payments are not configured.</p>;
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
      {children}
    </Elements>
  );
}
