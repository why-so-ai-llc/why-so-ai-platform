'use client';

import { useMemo, useState } from 'react';

import { PageHero } from '@/components/page-hero';

const baseRates = {
  discovery: 1500,
  integration: 4500,
  automation: 3200,
};

export default function PricingPage() {
  const [engagement, setEngagement] = useState<'discovery' | 'integration' | 'automation'>('discovery');
  const [complexity, setComplexity] = useState(1);

  const estimate = useMemo(() => baseRates[engagement] * complexity, [complexity, engagement]);

  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="High-level project sizing"
        description="This estimator is intentionally lightweight. It gives a directional frontend estimate and does not submit or store pricing requests on a backend."
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-200">
              Engagement type
              <select value={engagement} onChange={(event) => setEngagement(event.target.value as 'discovery' | 'integration' | 'automation')} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                <option value="discovery">Discovery sprint</option>
                <option value="integration">Custom AI integration</option>
                <option value="automation">Workflow automation</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Delivery complexity: <span className="text-red-300">{complexity}x</span>
              <input type="range" min={1} max={4} value={complexity} onChange={(event) => setComplexity(Number(event.target.value))} className="mt-3 w-full accent-red-500" />
            </label>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-red-300">Directional estimate</p>
            <p className="mt-4 text-4xl font-bold text-white">${estimate.toLocaleString()}</p>
            <p className="mt-3 text-sm text-slate-300">
              Use this as a planning number only. Final scope depends on systems, data access, review cycles, and deployment requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
