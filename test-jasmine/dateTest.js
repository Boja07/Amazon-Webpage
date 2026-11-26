import dayjs from '../script/dayjs.js';
import * as constants from '../script/constant.js';

describe('date utilities', () => {
  it('exports the expected duration constants', () => {
    expect(constants.SECONDS_A_DAY).toBe(86400);
    expect(constants.MILLISECONDS_A_DAY).toBe(86400000);
    expect(constants.MILLISECONDS_A_WEEK).toBe(constants.MILLISECONDS_A_DAY * 7);
  });

  it('adds and subtracts across supported units', () => {
    const date = dayjs('2024-01-15T12:30:00');

    expect(date.add(2, 'day').format('YYYY-MM-DD')).toBe('2024-01-17');
    expect(date.add(1, 'week').format('YYYY-MM-DD')).toBe('2024-01-22');
    expect(date.subtract(2, 'month').format('YYYY-MM-DD')).toBe('2023-11-15');
  });

  it('formats dates, handles leap years, and detects invalid input', () => {
    expect(dayjs('2024-02-29').format('dddd, MMMM D')).toBe('Thursday, February 29');
    expect(dayjs('2024-02-29').daysInMonth()).toBe(29);
    expect(dayjs('invalid date').isValid()).toBeFalse();
  });
});
