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
      expect(screen.getAllByText(service.name)).toHaveLength(1);

      service.outcomes.forEach((outcome) => {
        expect(screen.getAllByText(`• ${outcome}`)).toHaveLength(1);
      });
    });
  });
});
