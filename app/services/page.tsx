import Link from 'next/link';

import { PageHero } from '@/components/page-hero';
import { services } from '@/lib/site';

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="AI consulting, analytics, and automation services with clear delivery scope"
        description="These pages outline the current frontend messaging only. Production delivery, integrations, and backend systems are discussed separately during implementation work."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        {services.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-4xl">{service.icon}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{service.name}</h2>
            <p className="mt-3 text-slate-300">{service.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
            <Link href={`/services/${service.slug}`} className="mt-5 inline-flex rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500">
              View service page
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
