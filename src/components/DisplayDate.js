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
const DisplayDate = ({ date, stringify, refreshInterval, ...config }) => {
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

  return (
    <Tooltip title={stringify(date)}>
      <Typography variant="body1" component="span">
        {date2text(date, config)}
      </Typography>
    </Tooltip>
  );
};

DisplayDate.propTypes = {
  /** Javascript Date instance */
  date: PropTypes.instanceOf(Date).isRequired,
  /** Renders a full text date in the tooltip */
  stringify: PropTypes.func,
  /** Refresh the string value every {x}ms. Use {0} to disable. */
  refreshInterval: PropTypes.number,
  /** Translation function, lets you customize the locale */
  translate: PropTypes.func,
  thresholdNow: PropTypes.number,
  thresholdAboutNow: PropTypes.number,
  thresholdFewSeconds: PropTypes.number,
  thresholdSeconds: PropTypes.number,
  thresholdAboutAMinute: PropTypes.number,
  thresholdMinutes: PropTypes.number,
  thresholdAboutOneHour: PropTypes.number,
  thresholdHours: PropTypes.number,
  thresholdDays: PropTypes.number,
  thresholdMonths: PropTypes.number,
};

DisplayDate.defaultProps = {
  refreshInterval: 0,
  stringify: date =>
    date
      .toString()
      .split(' (')
      .shift(),
};

export default React.memo(DisplayDate);
