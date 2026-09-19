import { describe, expect, it } from 'vitest';

import { blogRoutes, getAllKnownRoutes, navItems, serviceRoutes, tools, toolRoutes } from '../lib/site';

describe('site routes', () => {
  it('keeps every known route unique', () => {
    const routes = getAllKnownRoutes();
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('uses valid absolute hrefs for navigation, services, and tools', () => {
    [...navItems.map((item) => item.href), ...serviceRoutes, ...toolRoutes, ...blogRoutes].forEach((route) => {
      expect(route.startsWith('/')).toBe(true);
      expect(route).not.toContain('#');
    });
  });

  it('keeps calculator metadata aligned with the implemented browser history', () => {
    expect(tools.find((tool) => tool.slug === 'calculator')?.usesLocalStorage).toBe(true);
  });
});
