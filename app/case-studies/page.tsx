import { PageHero } from '@/components/page-hero';

const caseStudies = [
  {
    title: 'AI Strategy Consulting',
    outcome: 'Delivered readiness assessment, roadmap planning, and use case identification.',
  },
  {
    title: 'Predictive Analytics',
    outcome: 'Delivered trend forecasting, operational optimization, and risk mitigation.',
  },
  {
    title: 'Generative AI Training',
    outcome: 'Delivered team workshops, best practices, and tool proficiency.',
  },
  {
    title: 'AI Workflow Automation',
    outcome: 'Delivered task automation, efficiency gains, and reduced overhead.',
  },
  {
    title: 'Custom AI Integration',
    outcome: 'Delivered API integration strategy, custom UX flows, and deployment planning.',
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
