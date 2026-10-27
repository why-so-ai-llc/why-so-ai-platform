import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: ({ variable }: { variable: string }) => ({ variable }),
  Space_Grotesk: ({ variable }: { variable: string }) => ({ variable }),
}));

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

vi.mock('@/components/site-header', () => ({
  SiteHeader: () => <header>Header</header>,
}));

vi.mock('@/components/site-footer', () => ({
  SiteFooter: () => <footer>Footer</footer>,
}));

import RootLayout from '../app/layout';

describe('RootLayout fonts', () => {
  it('applies both font variables on the body element', () => {
    const html = renderToStaticMarkup(RootLayout({ children: <div>Content</div> }));
    expect(html).toContain('--font-inter');
    expect(html).toContain('--font-space-grotesk');
  });
});
