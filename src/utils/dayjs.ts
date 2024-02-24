import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import "dayjs/locale/pt-br"; // import locale

dayjs.extend(isLeapYear);
dayjs.locale("pt-br"); // use locale

const START_DATE = dayjs('2024-01-08').startOf('day');
const END_DATE = dayjs('2024-06-08').endOf('day')
const CURRENT_DAY = dayjs().startOf('day');
const MIN_DAY_PER_WEEK = 3;

const CURRENT_WEEK = CURRENT_DAY.diff(START_DATE, 'week') + 1;
const TOTAL_WEEKS = END_DATE.diff(START_DATE, 'week') + 1;

export { dayjs, START_DATE, END_DATE, CURRENT_DAY, MIN_DAY_PER_WEEK, CURRENT_WEEK, TOTAL_WEEKS };
