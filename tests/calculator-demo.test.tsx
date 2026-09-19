// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CalculatorDemo } from '../components/tool-demos';

describe('CalculatorDemo', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    window.localStorage.clear();
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    };
    window.cancelAnimationFrame = vi.fn();
  });

  it('evaluates an expression and stores it in local history', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'calc-uuid-1' },
      configurable: true,
    });

    render(<CalculatorDemo />);

    fireEvent.change(screen.getByPlaceholderText('(12 + 4) / 2'), { target: { value: '(12 + 4) / 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Evaluate' }));

    expect(screen.getByText('= 8')).toBeTruthy();

    await waitFor(() => {
      expect(window.localStorage.getItem('calculator-history')).toContain('(12 + 4) / 2');
      expect(window.localStorage.getItem('calculator-history')).toContain('8');
    });
  });

  it('supports keypad entry and restoring an item from history', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'calc-uuid-2' },
      configurable: true,
    });

    render(<CalculatorDemo />);

    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByText('= 3')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    fireEvent.click(screen.getByRole('button', { name: '1+2 = 3' }));

    await waitFor(() => {
      expect(screen.getByDisplayValue('1+2')).toBeTruthy();
    });
  });
});
