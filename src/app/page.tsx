import { dateCached, getWorkouts } from '@/services/query/workouts';
import { UserWeeks } from '@/components/user';
import { NextUpdate } from '@/components/nextUpdate';
import {
  MIN_DAY_PER_WEEK,
  TOTAL_WEEKS,
  getCurrentWeek,
} from '@/utils/dateTime';

export default async function Home() {
  const date = await dateCached();
  const users = await getWorkouts();

  const usersSorted = [...users].sort(
    (a, b) =>
      b.weeks.filter((v) => v.days.length >= MIN_DAY_PER_WEEK).length -
      a.weeks.filter((v) => v.days.length >= MIN_DAY_PER_WEEK).length,
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl pt-3">
        {getCurrentWeek('America/Sao_Paulo')}/{TOTAL_WEEKS}
      </h1>

      <div className="flex justify-center items-center flex-wrap gap-4">
        {usersSorted.map((user) => (
          <UserWeeks key={user.id} {...user}></UserWeeks>
        ))}
      </div>
      <NextUpdate date={date} />
    </main>
  );
}
