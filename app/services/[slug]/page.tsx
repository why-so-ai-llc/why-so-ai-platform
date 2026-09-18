import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/page-hero';
import { getServiceBySlug, services } from '@/lib/site';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <PageHero
        eyebrow="Service detail"
        title={`${service.icon} ${service.name}`}
        description={service.description}
        actions={<Link href="/contact" className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500">Prepare consultation request</Link>}
      />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Example delivery outcomes</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-300">{outcome}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-400">
            This page is descriptive only. The repository does not include a proposal system, CRM integration, or authenticated client portal.
          </p>
        </div>
      </div>
    </div>
  );
}
