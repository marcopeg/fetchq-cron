const { getNextIteration } = require('./get-next-iteration');

describe('schedule', () => {
  it('should calculate by DELAY', () => {
    expect(getNextIteration('delay', '+1s')).toBe('+1s');
    expect(getNextIteration('delay', '-1s')).toBe('-1s');
    expect(getNextIteration('delay', '1s')).toBe('+1s');
  });

  it('should calulate by CRON', () => {
    const next = getNextIteration('cron', '*/4 * * * *', {
      currentDate: new Date('Wed, 26 Dec 2012 12:38:53 UTC'),
    });
    expect(next.toISOString()).toBe('2012-12-26T12:40:00.000Z');
  });

  it('should calculate by PLAN', () => {
    const next = getNextIteration('plan', '2012-12-26 12:00:00');
    expect(next.toISOString()).toBe('2012-12-26T12:00:00.000Z');
  });
});
