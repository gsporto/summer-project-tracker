import { DateTime, Settings } from 'luxon';

Settings.defaultZone = 'UTC';

const MIN_DAY_PER_WEEK = 3;
const CURRENT_WEEK = 2;

const TOTAL_WEEKS =
  Math.floor(getEndDate('UTC').diff(getStartDate('UTC'), 'week').weeks) + 1;

function getStartDate(timezone: string) {
  return DateTime.fromISO('2024-01-08', { zone: timezone });
}

function getEndDate(timezone: string) {
  return DateTime.fromISO('2024-06-09', { zone: timezone }).endOf('day');
}

function getCurrentWeek(timezone: string) {
  return (
    Math.floor(DateTime.now().diff(getStartDate(timezone), 'weeks').weeks) + 1
  );
}

export {
  MIN_DAY_PER_WEEK,
  CURRENT_WEEK,
  TOTAL_WEEKS,
  getStartDate,
  getEndDate,
  getCurrentWeek,
};
