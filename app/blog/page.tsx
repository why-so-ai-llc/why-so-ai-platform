import Link from 'next/link';

import { PageHero } from '@/components/page-hero';
import { blogPosts } from '@/lib/site';

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="AI and automation notes"
        description="Short, professional copy blocks that route to real pages instead of placeholder links."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-4xl">{post.icon}</p>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">{post.category}</span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">{post.title}</h2>
            <p className="mt-3 text-slate-300">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex font-semibold text-red-300 hover:text-red-200">Read article →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
