/* eslint-disable @next/next/no-img-element */
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

import { PageHero } from '../components/page-hero';

describe('PageHero', () => {
  it('includes the shared public photo background with accessible text', () => {
    const html = renderToStaticMarkup(<PageHero title="Title" description="Description" />);
    expect(html).toContain('src="/Screenshot_20260915-210613_Photos.png"');
    expect(html).toContain('alt="Modern workspace with creative lighting for AI planning sessions."');
  });
});
