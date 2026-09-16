'use client';

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Business Automation',
    excerpt: 'Explore how AI and automation are reshaping the business landscape...',
    date: 'Sep 15, 2026',
    category: 'Automation',
    icon: '🤖',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Custom AI Integration Best Practices',
    excerpt: 'Learn the key strategies for successfully integrating AI into your workflow...',
    date: 'Sep 10, 2026',
    category: 'Integration',
    icon: '🔗',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'AI ROI: Measuring Success',
    excerpt: 'Understanding the metrics that matter when evaluating AI investments...',
    date: 'Sep 5, 2026',
    category: 'Strategy',
    icon: '📊',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Workflow Optimization Trends',
    excerpt: 'What every business should know about modern workflow optimization...',
    date: 'Aug 30, 2026',
    category: 'Workflow',
    icon: '⚙️',
    readTime: '7 min read'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Blog
          </span>
        </h1>
        <p className="text-xl text-slate-300 text-center mb-12">
          Insights, tips, and trends in AI automation
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all overflow-hidden group cursor-pointer"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{post.icon}</div>
                  <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-300 text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                  <div className="text-sm text-slate-500">
                    <div>{post.date}</div>
                    <div>{post.readTime}</div>
                  </div>
                  <Link
                    href="#"
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
