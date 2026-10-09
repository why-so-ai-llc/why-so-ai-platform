'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { PageHero } from '@/components/page-hero';
import { formatPrice, getRenewalDate, isPlanId, subscriptionPlans } from '@/lib/subscription-plans';

function Confirmation() {
  const params = useSearchParams();
  const planParam = params.get('plan');
  const plan = isPlanId(planParam) ? subscriptionPlans[planParam] : null;
  const status = params.get('redirect_status');
  const failed = status === 'failed';

  if (failed || !plan) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-slate-200">
        <h2 className="text-2xl font-bold text-white">We couldn&apos;t confirm your payment</h2>
        <p className="mt-3">Your card was not charged. Please try again from the pricing page.</p>
        <Link href="/pricing" className="mt-6 inline-block rounded-xl bg-red-500 px-5 py-3 font-semibold text-white">Back to pricing</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-slate-200">
      <h2 className="text-2xl font-bold text-white">Payment successful</h2>
      <dl className="grid gap-2 sm:grid-cols-2">
        <dt>Plan</dt><dd className="font-semibold text-white">{plan.name}</dd>
        <dt>Amount</dt><dd className="font-semibold text-white">{formatPrice(plan.amountCents)}</dd>
        <dt>Renews on</dt><dd className="font-semibold text-white">{getRenewalDate(plan.id).toLocaleDateString()}</dd>
      </dl>
      <p>Next steps: check your email for confirmation, then head to the dashboard to get started.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard" className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white">Go to dashboard</Link>
        <button type="button" onClick={() => window.print()} className="rounded-xl border border-slate-600 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800">Download receipt</button>
      </div>
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <div>
      <PageHero eyebrow="Subscription" title="Payment confirmation" description="Thanks for subscribing to Why So AI." />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={<p className="text-slate-400">Loading…</p>}>
          <Confirmation />
        </Suspense>
      </div>
    </div>
  );
}
