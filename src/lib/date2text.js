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
  thresholdSeconds: 59500, // 58 seconds
  thresholdAboutAMinute: 119500, // 63 seconds
  thresholdMinutes: 3570000, // 59.5 minutes
  thresholdAboutOneHour: 3690000, // 61.5 minutes
  thresholdHours: 172800000, // 24 hours
  thresholdDays: 172800000, // 2 days
  thresholdMonths: 31449600000, // 364 days
};

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const date2text = (
  date,
  {
    translate: t = s => s,
    formatShortDate = ({ YYYY, MM, DD, hh, mm }) => `${MM}/${DD}, ${hh}:${mm}`,
    formatFullDate = ({ YYYY, MM, DD, hh, mm }) =>
      `${MM}/${DD}/${YYYY}, ${hh}:${mm}`,
    thesholdNow = defaults.thesholdNow,
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

  const hh = date
    .getHours()
    .toString()
    .padStart(2, '0');

  const mm = date
    .getMinutes()
    .toString()
    .padStart(2, '0');

  if (absDiff <= thresholdHours) {
    if (isToday(date) || diff >= 0) {
      return `${t('today')}, ${hh}:${mm}`;
    }
    return `${t('yesterday')}, ${hh}:${mm}`;
  }

  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date
    .getDate()
    .toString()
    .padStart(2, '0');

  return formatFullDate({
    date,
    YYYY,
    MM,
    DD,
    hh,
    mm,
  });
};

date2text.defaults = defaults;
export default date2text;
