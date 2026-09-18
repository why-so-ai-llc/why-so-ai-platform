import { PageHero } from '@/components/page-hero';
import { BookmarksDemo } from '@/components/tool-demos';

export default function BookmarksPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Bookmarks manager" description="Store links locally with basic URL validation before saving." />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><BookmarksDemo /></div>
    </div>
  );
}
