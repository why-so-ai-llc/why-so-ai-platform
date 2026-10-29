import { PageHero } from '@/components/page-hero';

const dashboardCards = [
  'Pipeline health snapshot',
  'Active discovery tasks',
  'Upcoming review milestones',
  'Client-ready deliverables',
];

export default function DashboardPage() {
  return (
    <div>
      <PageHero
        eyebrow="Dashboard"
        title="Frontend dashboard mockup"
        description="This route exists so navigation is coherent, but it is intentionally labeled as a non-authenticated mock because the repository does not include user accounts or a backend API."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-lime-400/30 bg-lime-400/10 p-4 text-sm text-white">
          Demo only: no login, session management, or live customer data is implemented in this repository.
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => (
            <div key={card} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">{card}</h2>
              <p className="mt-3 text-sm text-white/60">Placeholder content for layout validation and navigation completeness.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
