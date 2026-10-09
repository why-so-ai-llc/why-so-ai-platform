'use client';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';

import { StripeProvider } from '@/components/stripe-provider';
import { formatPrice, PlanId, subscriptionPlans } from '@/lib/subscription-plans';

function CheckoutForm({ plan }: { plan: PlanId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const selected = subscriptionPlans[plan];

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/payment-confirmation?plan=${plan}` },
    });
    if (confirmError) setError(confirmError.message ?? 'Your payment could not be processed.');
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PaymentElement />
      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" disabled={!stripe || submitting} className="w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-400 disabled:opacity-50">
        {submitting ? 'Processing…' : `Pay ${formatPrice(selected.amountCents)} / ${selected.interval}`}
      </button>
    </form>
  );
}

function CheckoutInner({ plan }: { plan: PlanId }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selected = subscriptionPlans[plan];

  useEffect(() => {
    let cancelled = false;
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Unable to start payment.');
        if (!cancelled) setClientSecret(data.clientSecret);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [plan]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
        <span className="text-slate-200">{selected.name} plan</span>
        <span className="font-semibold text-white">{formatPrice(selected.amountCents)} / {selected.interval}</span>
      </div>
      <p className="text-xs text-slate-400">We accept Visa, Mastercard, American Express, and Discover. Card details are handled securely by Stripe.</p>
      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}
      {clientSecret ? (
        <StripeProvider clientSecret={clientSecret}>
          <CheckoutForm plan={plan} />
        </StripeProvider>
      ) : error ? null : (
        <p className="text-sm text-slate-400">Loading secure payment form…</p>
      )}
    </div>
  );
}

export function StripeCheckout({ plan }: { plan: PlanId }) {
  return <CheckoutInner key={plan} plan={plan} />;
}
