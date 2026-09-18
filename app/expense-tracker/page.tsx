import { PageHero } from '@/components/page-hero';
import { ExpenseTrackerDemo } from '@/components/tool-demos';

export default function ExpenseTrackerPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Expense tracker" description="Local-only spending demo with category totals and no false submission behavior." />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><ExpenseTrackerDemo /></div>
    </div>
  );
}
