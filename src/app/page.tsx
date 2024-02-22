import { getCachedUsers } from "./services/query/users";
import { UserWeeks } from "./user";
import { CURRENT_WEEK, TOTAL_WEEKS } from "./utils/dayjs";

export default async function Home() {
  const users = await getCachedUsers();

  const usersSorted = [...users].sort(
    (a, b) =>
      b.weeks.filter((v) => v.status === "completed").length -
      a.weeks.filter((v) => v.status === "completed").length
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
    </main>
  );
}
