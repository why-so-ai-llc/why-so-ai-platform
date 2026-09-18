import { PageHero } from '@/components/page-hero';
import { services, tools } from '@/lib/site';

const benefits = [
  'Consistent header and navigation across pages',
  'Local-only tool storage where stated',
  'Graceful public API demo error handling',
  'Responsive dark slate visual system with red accents',
];

export default function FeaturesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Features"
        title="What the current repository actually includes"
        description="This page now reflects the buildable frontend rather than inflated completion claims."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">Services</p>
          <p className="mt-3 text-4xl font-bold text-white">{services.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">Tools</p>
          <p className="mt-3 text-4xl font-bold text-white">{tools.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">Highlights</p>
          <p className="mt-3 text-lg text-slate-300">Demo-first and honest about missing backend services</p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Current strengths</h2>
          <ul className="mt-5 space-y-3 text-slate-300">
            {benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
