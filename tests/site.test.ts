import { describe, expect, it } from 'vitest';

import { getAllKnownRoutes, navItems, serviceRoutes, toolRoutes } from '../lib/site';

describe('site routes', () => {
  it('keeps every known route unique', () => {
    const routes = getAllKnownRoutes();
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('uses valid absolute hrefs for navigation, services, and tools', () => {
    [...navItems.map((item) => item.href), ...serviceRoutes, ...toolRoutes].forEach((route) => {
      expect(route.startsWith('/')).toBe(true);
      expect(route).not.toContain('#');
    });
  });
});
