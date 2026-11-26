import utils from '../script/utils.js';

describe('date utility helpers', () => {
  it('identifies undefined values and applies absolute values', () => {
    expect(utils.u(undefined)).toBeTrue();
    expect(utils.u(null)).toBeFalse();
    expect(utils.a(-42)).toBe(42);
  });

  it('pads values and normalizes unit aliases', () => {
    expect(utils.s('7', 2, '0')).toBe('07');
    expect(utils.s('123', 2, '0')).toBe('123');
    expect(utils.p('days')).toBe('day');
    expect(utils.p('H')).toBe('hour');
    expect(utils.p('unknown')).toBe('unknown');
  });

  it('calculates month differences from timestamps', () => {
    const first = { valueOf: () => 60 * 24 * 60 * 60 * 1000 };
    const second = { valueOf: () => 0 };

    expect(utils.m(first, second)).toBe(2);
  });
});
