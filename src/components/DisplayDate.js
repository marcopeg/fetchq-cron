/**
 * Should take a date and display stuff like:
 * - 1 minute ago
 * - in 15 minutes
 * - March 22nd (same year)
 * - 1 year ago
 *
 * Should probably take a min/max interval
 *
 * If [[ abs(now - date) < min ]] show relative
 * If [[ abs(now - date) > max ]] show relative
 * Else show specific date
 *
 * On mouse over (or touch) is should display the full date
 */

const DisplayDate = ({ date }) => String(date);

export default DisplayDate;
