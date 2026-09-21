import { PageHero } from '@/components/page-hero';
import { services } from '@/lib/site';

const caseStudies = services.map((service) => ({
  title: service.name,
  outcomes: service.outcomes,
}));

export default function CaseStudiesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Case studies"
        title="Representative outcomes, not client claims"
        description="These examples stay aligned with the shared service titles and delivery outcomes in this repository. They remain representative because this frontend does not ship a customer case-study CMS."
      />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 lg:px-8">
        {caseStudies.map((study) => (
          <article key={study.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold text-white">{study.title}</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              {study.outcomes.map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
