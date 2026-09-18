import { notFound } from 'next/navigation';

import { PageHero } from '@/components/page-hero';
import { blogPosts, getBlogPostBySlug } from '@/lib/site';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          <p className="text-sm text-slate-500">{post.date} · {post.readTime}</p>
          <div className="mt-6 space-y-4 text-slate-300">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
