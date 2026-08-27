const padStart = (string, length, character) => {
  const value = String(string);
  return value.length >= length ? value : `${character.repeat(length - value.length)}${value}`;
};

const normalizeUnit = (unit) => {
  const normalized = String(unit || '').toLowerCase();
  const aliases = {
    milliseconds: 'millisecond',
    ms: 'millisecond',
    seconds: 'second',
    s: 'second',
    minutes: 'minute',
    m: 'minute',
    hours: 'hour',
    h: 'hour',
    days: 'day',
    d: 'day',
    weeks: 'week',
    w: 'week',
    months: 'month',
    M: 'month',
    quarters: 'quarter',
    Q: 'quarter',
    years: 'year',
    y: 'year'
  };
  return aliases[unit] || aliases[normalized] || normalized;
};

const offset = (instance) => {
  const minutes = -instance.$d.getTimezoneOffset();
  const sign = minutes >= 0 ? '+' : '-';
  const absolute = Math.abs(minutes);
  return `${sign}${padStart(Math.floor(absolute / 60), 2, '0')}:${padStart(absolute % 60, 2, '0')}`;
};

const monthDiff = (first, second) => (first.valueOf() - second.valueOf()) / (30 * 24 * 60 * 60 * 1000);

export default {
  u: (value) => value === undefined,
  a: Math.abs,
  s: padStart,
  p: normalizeUnit,
  z: offset,
  m: monthDiff
};
