// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import CaseStudiesPage from '../app/case-studies/page';
import { services } from '../lib/site';

describe('CaseStudiesPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders shared service titles and outcomes', () => {
    render(<CaseStudiesPage />);

    services.forEach((service) => {
      expect(document.body.contains(screen.getByText(service.name))).toBe(true);

      service.outcomes.forEach((outcome) => {
        expect(document.body.contains(screen.getByText(`• ${outcome}`))).toBe(true);
      });
    });
  });
});
