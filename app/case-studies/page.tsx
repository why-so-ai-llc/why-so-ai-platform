import { PageHero } from '@/components/page-hero';
import { services } from '@/lib/site';

const getOutcomeEntries = (slug: string, outcomes: string[]) => {
  const outcomeCounts = new Map<string, number>();

  return outcomes.map((outcome) => {
    const outcomeSlug = outcome.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const count = (outcomeCounts.get(outcomeSlug) ?? 0) + 1;

    outcomeCounts.set(outcomeSlug, count);

    return {
      id: count === 1 ? `${slug}-${outcomeSlug}` : `${slug}-${outcomeSlug}-${count}`,
      label: outcome,
    };
  });
};

const caseStudies = services.map((service) => ({
  title: service.name,
  outcomes: getOutcomeEntries(service.slug, service.outcomes),
}));

export default function CaseStudiesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Case studies"
        title="Representative outcomes, not client claims"
        description="These examples show the kinds of delivery engagements Why So AI supports. They are intentionally generalized because this repository does not ship a customer case-study CMS."
      />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 lg:px-8">
        {caseStudies.map((study) => (
          <article key={study.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold text-white">{study.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {study.outcomes.map((outcome) => (
                <li key={outcome.id}>{outcome.label}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
