import { PageHero } from '@/components/page-hero';
import { caseStudies } from '@/lib/site';

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
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
              {study.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
