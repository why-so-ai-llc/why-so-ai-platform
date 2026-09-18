import { PageHero } from '@/components/page-hero';
import { TodoDemo } from '@/components/tool-demos';

export default function TodoPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Todo list" description="A local browser demo with storage guarded until hydration." />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><TodoDemo /></div>
    </div>
  );
}
