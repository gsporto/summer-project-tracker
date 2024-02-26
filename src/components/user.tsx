import type { User, Weeks } from '@/utils/types';
import {
  MIN_DAY_PER_WEEK,
  TOTAL_WEEKS,
  getCurrentWeek,
} from '@/utils/dateTime';
import { Week } from './week';

export function UserWeeks({ name, weeks }: User) {
  const weeksFilled = [
    ...weeks,
    ...Array(TOTAL_WEEKS - weeks.length)
      .fill(undefined)
      .map<Weeks>((_, index) => ({
        id: weeks.length + index + 1,
        days: [],
      })),
  ];

  const lengthCompleted = weeks.filter(
    (weeks) => weeks.days.length >= MIN_DAY_PER_WEEK,
  ).length;
  const lengthUncompleted = weeks.filter(
    (weeks) =>
      weeks.days.length < MIN_DAY_PER_WEEK &&
      weeks.id !== getCurrentWeek('America/Sao_Paulo'),
  ).length;

  return (
    <div className="flex flex-col flex-1 items-center basis-96">
      <div className="p-5 rounded flex flex-col items-center z-10">
        <p>{name}</p>
        <p>
          <span className="text-lime-500">{lengthCompleted}</span> |
          <span className="text-red-500"> {lengthUncompleted}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {weeksFilled.map((week) => (
          <Week key={week.id} week={week} />
        ))}
      </div>
    </div>
  );
}
