import { describe, expect, it } from 'vitest';

import { evaluateArithmeticExpression } from '../lib/calculator';

describe('calculator parser', () => {
  it('handles precedence and parentheses', () => {
    expect(evaluateArithmeticExpression('(12 + 4) / 2')).toBe(8);
  });

  it('rejects invalid characters', () => {
    expect(() => evaluateArithmeticExpression('alert(1)')).toThrow(/simple arithmetic/i);
  });
});
