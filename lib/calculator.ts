class ArithmeticParser {
  private index = 0;

  constructor(private readonly input: string) {}

  parse() {
    const value = this.parseExpression();
    this.skipWhitespace();

    if (this.index !== this.input.length) {
      throw new Error('Invalid expression.');
    }

    return value;
  }

  private parseExpression() {
    let value = this.parseTerm();

    while (true) {
      this.skipWhitespace();
      const operator = this.peek();
      if (operator !== '+' && operator !== '-') {
        return value;
      }

      this.index += 1;
      const nextValue = this.parseTerm();
      value = operator === '+' ? value + nextValue : value - nextValue;
    }
  }

  private parseTerm() {
    let value = this.parseFactor();

    while (true) {
      this.skipWhitespace();
      const operator = this.peek();
      if (operator !== '*' && operator !== '/') {
        return value;
      }

      this.index += 1;
      const nextValue = this.parseFactor();
      value = operator === '*' ? value * nextValue : value / nextValue;
    }
  }

  private parseFactor(): number {
    this.skipWhitespace();
    const character = this.peek();

    if (character === '(') {
      this.index += 1;
      const value = this.parseExpression();
      this.skipWhitespace();
      if (this.peek() !== ')') {
        throw new Error('Invalid expression.');
      }
      this.index += 1;
      return value;
    }

    if (character === '-') {
      this.index += 1;
      return -this.parseFactor();
    }

    return this.parseNumber();
  }

  private parseNumber() {
    this.skipWhitespace();
    const start = this.index;

    while (/[0-9.]/.test(this.peek() ?? '')) {
      this.index += 1;
    }

    const token = this.input.slice(start, this.index);
    if (!token || token === '.') {
      throw new Error('Invalid expression.');
    }

    const parsedNumber = Number(token);
    if (Number.isNaN(parsedNumber)) {
      throw new Error('Invalid expression.');
    }

    return parsedNumber;
  }

  private peek() {
    return this.input[this.index];
  }

  private skipWhitespace() {
    while (this.input[this.index] === ' ') {
      this.index += 1;
    }
  }
}

export function evaluateArithmeticExpression(expression: string) {
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    throw new Error('Only simple arithmetic characters are allowed.');
  }

  return new ArithmeticParser(expression).parse();
}
