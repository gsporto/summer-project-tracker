import { getCachedUsers } from "@/services/query/users";
import { cacheControlWorkouts, getWorkouts } from "@/services/query/workouts";
import { UserWeeks } from "@/components/user";
import { CURRENT_WEEK, TOTAL_WEEKS } from "@/utils/dayjs";

export default async function Home() {
  const users = await getCachedUsers();
  await getWorkouts();
  const cacheDate = await cacheControlWorkouts();

  const usersSorted = [...users].sort(
    (a, b) =>
      b.weeks.filter((v) => v.days.length >= 3).length -
      a.weeks.filter((v) => v.days.length >= 3).length
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <p>Próxima Atualização: {cacheDate}</p>
      <h1 className="font-bold text-3xl pt-3">
        {CURRENT_WEEK}/{TOTAL_WEEKS}
      </h1>

      <div className="flex justify-center items-center flex-wrap gap-4">
        {usersSorted.map((user) => (
          <UserWeeks key={user.id} {...user}></UserWeeks>
        ))}
      </div>
    </main>
  );
}
