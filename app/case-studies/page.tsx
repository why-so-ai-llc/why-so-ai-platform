import { PageHero } from '@/components/page-hero';

const caseStudies = [
  {
    title: 'Support workflow triage',
    outcome: 'Reduced manual sorting by turning incoming request themes into a prioritized review queue.',
  },
  {
    title: 'Internal knowledge automation',
    outcome: 'Created a searchable workflow for repeat internal questions without exposing the source data publicly.',
  },
  {
    title: 'Operations reporting prototype',
    outcome: 'Turned recurring spreadsheet updates into a repeatable demo flow with clear human review checkpoints.',
  },
];

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
            <p className="mt-3 text-slate-300">{study.outcome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
