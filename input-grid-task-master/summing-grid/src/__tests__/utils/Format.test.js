import { abbreviateNumber } from './../../utils/Format';

describe('abbreviateNumber', () => {
  const symbolTests = [
    { value: 1, result: 1 },
    { value: 1e3, result: '1.00k' },
    { value: 1e6, result: '1.00M' },
    { value: 1e9, result: '1.00G' },
    { value: 1e12, result: '1.00T' },
    { value: 1e15, result: '1.00P' },
    { value: 1e18, result: '1.00E' }
  ];

  symbolTests.forEach((test) => {
    it('abbreviates correctly to ' + test.result, () => {
      const result = abbreviateNumber(test.value);
      expect(result).toBe(test.result);
    });
  });

  it('returns the orignal number when abbreviation is not defined', () => {
    const num = 1e21;
    const result = abbreviateNumber(num);
    expect(result).toBe(num);
  });

  it('calculates precisions correctly', () => {
    expect(abbreviateNumber(.1)).toBe(.1);
    expect(abbreviateNumber(1.11e3)).toBe('1.11k');
    expect(abbreviateNumber(11.1e3)).toBe('11.1k');
    expect(abbreviateNumber(111e3)).toBe('111k');
  });

  it('handles negative values correctly', () => {
    expect(abbreviateNumber(-.1)).toBe(-.1);
    expect(abbreviateNumber(-1.11e3)).toBe('-1.11k');
    expect(abbreviateNumber(-11.1e3)).toBe('-11.1k');
    expect(abbreviateNumber(-111e3)).toBe('-111k');
  });

});
