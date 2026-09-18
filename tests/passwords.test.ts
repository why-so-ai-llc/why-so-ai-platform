import { describe, expect, it } from 'vitest';

import { analyzePassword, createPassword } from '../lib/passwords';

describe('password utilities', () => {
  it('flags weak passwords', () => {
    const analysis = analyzePassword('aaa');
    expect(analysis.strength).toBe('Weak');
    expect(analysis.feedback.length).toBeGreaterThan(0);
  });

  it('rewards longer mixed passwords', () => {
    const analysis = analyzePassword('Abcdef1234!@#$5678');
    expect(analysis.score).toBeGreaterThanOrEqual(80);
    expect(['Strong', 'Very Strong']).toContain(analysis.strength);
  });

  it('creates a password when at least one character set is enabled', () => {
    const password = createPassword(12, {
      uppercase: false,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(password).toHaveLength(12);
    expect(/[a-z0-9]{12}/.test(password)).toBe(true);
  });

  it('rejects empty option sets', () => {
    expect(() => createPassword(12, {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    })).toThrow(/character type/i);
  });
});
