const cronParser = require('cron-parser');

const methods = {
  delay: value => {
    const firstLetter = value.substr(0, 1);
    if (['+', '-'].includes(firstLetter)) {
      return value;
    }
    return `+${value}`;
  },
  cron: (value, options) => {
    const interval = cronParser.parseExpression(value, options);
    return interval.next()._date.toDate();
  },
  plan: value => {
    try {
      return new Date(value);
    } catch (err) {
      throw new Error('Unrecognized date format');
    }
  },
};

const getNextIteration = (method, value, options = null) => {
  const fn = methods[method];
  if (!fn) {
    throw new Error('Unrecognized method');
  }

  return fn(value, options);
};

module.exports = { getNextIteration };
