import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import date2text from '../lib/date2text';

/**
 * Takes a Javascript Date instance and displays it in a short text form:
 * - in a few minutes
 * - 5 hours ago
 *
 * All the thresholds an be customised, look into `lib/date2text` for their
 * defaults.
 */
const DisplayDate = ({
  date,
  fallbackText,
  stringify,
  refreshInterval,

  translate,
  formatShortDate,
  formatFullDate,
  thresholdNow,
  thresholdSeconds,
  thresholdAboutAMinute,
  thresholdMinutes,
  thresholdAboutOneHour,
  thresholdHours,
  thresholdDays,
  thresholdMonths,

  // Anything else applies to the Typography object
  ...typographyProps
}) => {
  const timer = useRef();
  const [, refreshUpdate] = useState(0);

  // Automatically refreshes the relative string time
  useEffect(() => {
    if (!refreshInterval) {
      return () => {};
    }
    timer.current = setInterval(
      () => refreshUpdate(value => value + 1),
      refreshInterval,
    );
    return () => clearInterval(timer.current);
  }, [refreshInterval, refreshUpdate]);

  if (!date) {
    return <Typography {...typographyProps}>{fallbackText}</Typography>;
  }

  let body = null;
  let tooltip = null;
  const config = {
    translate,
    formatShortDate,
    formatFullDate,
    thresholdNow,
    thresholdSeconds,
    thresholdAboutAMinute,
    thresholdMinutes,
    thresholdAboutOneHour,
    thresholdHours,
    thresholdDays,
    thresholdMonths,
  };

  try {
    body = date ? date2text(date, config) : fallbackText;
    tooltip = date ? stringify(date) : null;
  } catch (err) {
    body = fallbackText;
    tooltip = err.message;
  }

  const text = <Typography {...typographyProps}>{body}</Typography>;

  return tooltip ? <Tooltip title={tooltip}>{text}</Tooltip> : text;
};

DisplayDate.propTypes = {
  /** Javascript Date instance */
  date: PropTypes.instanceOf(Date),
  /** Rendered in case of a null date */
  fallbackText: PropTypes.string,
  /** Renders a full text date in the tooltip */
  stringify: PropTypes.func,
  /** Refresh the string value every {x}ms. Use {0} to disable. */
  refreshInterval: PropTypes.number,
  /** Translation function, lets you customize the locale */
  translate: PropTypes.func,
  /** Formats a date within the same year */
  formatShortDate: PropTypes.func,
  /** Formats a date */
  formatFullDate: PropTypes.func,
  thresholdNow: PropTypes.number,
  thresholdSeconds: PropTypes.number,
  thresholdAboutAMinute: PropTypes.number,
  thresholdMinutes: PropTypes.number,
  thresholdAboutOneHour: PropTypes.number,
  thresholdHours: PropTypes.number,
  thresholdDays: PropTypes.number,
  thresholdMonths: PropTypes.number,
};

DisplayDate.defaultProps = {
  date: null,
  fallbackText: 'n/a',
  refreshInterval: 0,
  stringify: date =>
    date
      .toString()
      .split(' (')
      .shift(),

  // Default typographyProps
  component: 'span',
  variant: 'body1',
};

export default React.memo(DisplayDate);
