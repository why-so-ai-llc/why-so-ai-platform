import { beforeEach, describe, expect, it, vi } from 'vitest';

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
}));

vi.mock('next/navigation', () => ({ notFound }));

import BlogPostPage from '../app/blog/[slug]/page';
import ServiceDetailPage from '../app/services/[slug]/page';

describe('dynamic route pages', () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it('renders a known blog slug and rejects an unknown slug', async () => {
    const rendered = await BlogPostPage({ params: Promise.resolve({ slug: 'future-of-business-automation' }) });
    expect(rendered).toBeTruthy();

    await expect(BlogPostPage({ params: Promise.resolve({ slug: 'missing-post' }) })).rejects.toThrow('NOT_FOUND');
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it('renders a known service slug and rejects an unknown slug', async () => {
    const rendered = await ServiceDetailPage({ params: Promise.resolve({ slug: 'ai-strategy-consulting' }) });
    expect(rendered).toBeTruthy();

    await expect(ServiceDetailPage({ params: Promise.resolve({ slug: 'missing-service' }) })).rejects.toThrow('NOT_FOUND');
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
