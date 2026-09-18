import { PageHero } from '@/components/page-hero';
import { CalculatorDemo } from '@/components/tool-demos';

export default function CalculatorPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Calculator" description="A basic arithmetic helper for trusted manual input." />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><CalculatorDemo /></div>
    </div>
  );
}
