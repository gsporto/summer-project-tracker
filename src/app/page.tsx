import { getCachedUsers } from '@/services/query/users';
import { cacheControlWorkouts, getWorkouts } from '@/services/query/workouts';
import { UserWeeks } from '@/components/user';
import { CURRENT_WEEK, MIN_DAY_PER_WEEK, TOTAL_WEEKS } from '@/utils/dayjs';
import { NextUpdate } from '@/components/nextUpdate';

export default async function Home() {
  await getWorkouts();
  const cacheDate = await cacheControlWorkouts();
  const users = await getCachedUsers();

  const usersSorted = [...users].sort(
    (a, b) =>
      b.weeks.filter((v) => v.days.length >= MIN_DAY_PER_WEEK).length -
      a.weeks.filter((v) => v.days.length >= MIN_DAY_PER_WEEK).length,
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl pt-3">
        {CURRENT_WEEK}/{TOTAL_WEEKS}
      </h1>

      <div className="flex justify-center items-center flex-wrap gap-4">
        {usersSorted.map((user) => (
          <UserWeeks key={user.id} {...user}></UserWeeks>
        ))}
      </div>
      {cacheDate && <NextUpdate date={cacheDate} />}
    </main>
  );
}
