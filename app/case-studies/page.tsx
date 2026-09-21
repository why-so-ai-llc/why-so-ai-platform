import { PageHero } from '@/components/page-hero';
import { services } from '@/lib/site';

const caseStudies = services.map((service) => ({
  slug: service.slug,
  title: service.name,
  outcomes: service.outcomes,
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
          <article key={study.slug} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold text-white">{study.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300 marker:text-slate-400">
              {study.outcomes.map((outcome, index) => (
                <li key={`${study.slug}-${index}`}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
