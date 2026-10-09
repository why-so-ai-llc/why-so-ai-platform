'use client';

import { QRCodeSVG } from 'qrcode.react';

import { formatPrice, PlanId, subscriptionPlans, venmoUsername } from '@/lib/subscription-plans';

export function VenmoPayment({ plan }: { plan: PlanId }) {
  const selected = subscriptionPlans[plan];
  const note = `${selected.name} Plan`;
  const url = `https://venmo.com/${encodeURIComponent(venmoUsername)}?txn=pay&amount=${selected.amountCents / 100}&note=${encodeURIComponent(note)}`;

  return (
    <div className="space-y-4">
      <p className="text-slate-200">
        Pay <span className="font-semibold text-white">{formatPrice(selected.amountCents)}</span> to <span className="font-semibold text-white">@{venmoUsername}</span> and include &ldquo;{note}&rdquo; in the memo.
      </p>
      <div className="inline-block rounded-xl bg-white p-3">
        <QRCodeSVG value={url} size={160} />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-sky-500 px-4 py-3 text-center font-semibold text-white hover:bg-sky-400">
        Pay with Venmo
      </a>
    </div>
  );
}
