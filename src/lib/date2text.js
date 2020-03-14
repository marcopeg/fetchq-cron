/**
 * Takes a Javascript Date instance and returns a short text version like:
 * - a few minutes ago
 * - in 3 hours
 *
 * @param {Date} date
 * @param {Object} configurations
 */

const defaults = {
  thesholdNow: 1100,
  thresholdAboutNow: 5100,
  thresholdFewSeconds: 10100, // 10 seconds
  thresholdSeconds: 57000, // 58 seconds
  thresholdAboutAMinute: 63000, // 63 seconds
  thresholdMinutes: 3420000, // 57 minutes
  thresholdAboutOneHour: 3780000, // 63 minutes
  thresholdHours: 86400000, // 24 hours
  thresholdDays: 2419200000, // 28 days
  thresholdMonths: 31449600000, // 364 days
};

const date2text = (
  date,
  {
    translate: t = s => s,
    thesholdNow = defaults.thesholdNow,
    thresholdAboutNow = defaults.thresholdAboutNow,
    thresholdFewSeconds = defaults.thresholdFewSeconds,
    thresholdSeconds = defaults.thresholdSeconds,
    thresholdAboutAMinute = defaults.thresholdAboutAMinute,
    thresholdMinutes = defaults.thresholdMinutes,
    thresholdAboutOneHour = defaults.thresholdAboutOneHour,
    thresholdHours = defaults.thresholdHours,
    thresholdDays = defaults.thresholdDays,
    thresholdMonths = defaults.thresholdMonths,
  },
) => {
  const diff = date - new Date();
  const absDiff = Math.abs(diff);

  if (absDiff <= thesholdNow) {
    return t('now');
  }

  if (absDiff <= thresholdAboutNow) {
    return t('about now');
  }

  if (absDiff <= thresholdFewSeconds) {
    if (diff >= 0) {
      return `${t('in a')} ${t('few seconds')}`;
    }
    return `${t('a')} ${t('few seconds')} ${t('ago')}`;
  }

  if (absDiff <= thresholdSeconds) {
    const seconds = Math.round(absDiff / 1000);
    if (diff >= 0) {
      return `${t('in')} ${seconds} ${t('seconds')}`;
    }
    return `${seconds} ${t('seconds ago')}`;
  }

  if (absDiff <= thresholdAboutAMinute) {
    if (diff >= 0) {
      return `${t('in a minute')}`;
    }
    return `${t('a minute ago')}`;
  }

  if (absDiff <= thresholdMinutes) {
    const minutes = Math.round(absDiff / 60000);
    if (diff >= 0) {
      return `${t('in')} ${minutes} ${t('minutes')}`;
    }
    return `${minutes} ${t('minutes ago')}`;
  }

  if (absDiff <= thresholdAboutOneHour) {
    if (diff >= 0) {
      return `${t('in an hour')}`;
    }
    return `${t('an hour ago')}`;
  }

  if (absDiff <= thresholdHours) {
    const hours = Math.round(absDiff / 3600000);
    if (diff >= 0) {
      return `${t('in')} ${hours} ${t('hours')}`;
    }
    return `${hours} ${t('hours ago')}`;
  }

  if (absDiff <= thresholdDays) {
    const days = Math.round(absDiff / 86400000);
    if (diff >= 0) {
      return `${t('in')} ${days} ${t('days')}`;
    }
    return `${days} ${t('days ago')}`;
  }

  if (absDiff <= thresholdMonths) {
    const months = Math.round(absDiff / 2592000000); // 30 days
    if (diff >= 0) {
      return `${t('in')} ${months} ${t('months')}`;
    }
    return `${months} ${t('months ago')}`;
  }

  const years = Math.round(absDiff / 31536000000); // 365 days
  if (diff >= 0) {
    return `${t('in')} ${years} ${t('years')}`;
  }
  return `${years} ${t('years ago')}`;
};

date2text.defaults = defaults;
export default date2text;
