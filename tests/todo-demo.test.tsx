// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TodoDemo } from '../components/tool-demos';

describe('TodoDemo', () => {
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

  it('adds a todo item using crypto.randomUUID without submitting unexpectedly', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'uuid-1' },
      configurable: true,
    });

    render(<TodoDemo />);

    fireEvent.change(screen.getByPlaceholderText('Add a task'), { target: { value: 'Ship the route audit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Ship the route audit')).toBeTruthy();

    await waitFor(() => {
      expect(window.localStorage.getItem('todo-items')).toContain('todo-uuid-1');
    });
  });

  it('falls back to a generated id when randomUUID is unavailable', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: undefined,
      configurable: true,
    });
    vi.spyOn(Date, 'now').mockReturnValue(1234);
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    render(<TodoDemo />);

    fireEvent.change(screen.getByPlaceholderText('Add a task'), { target: { value: 'Fallback id path' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(window.localStorage.getItem('todo-items')).toContain('todo-1234');
    });
  });
});
