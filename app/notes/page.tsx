import { PageHero } from '@/components/page-hero';
import { NotesDemo } from '@/components/tool-demos';

export default function NotesPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Notes app" description="Capture small notes locally without a backend dependency." />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><NotesDemo /></div>
    </div>
  );
}
