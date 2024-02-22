import { kv } from "@vercel/kv";
import { unstable_cache as cache } from "next/cache";
import { UserWeeks } from "./user";
import { User } from "./types";

const getCachedUsers = cache(async () => {
  const users = await kv.get<Array<User>>("users");
  if (users) {
    return users;
  }
  return [];
}, ["users"]);

export default async function Home() {
  const users = await getCachedUsers();

  const usersSorted = [...users].sort(
    (a, b) =>
      b.weeks.filter((v) => v.status === "completed").length -
      a.weeks.filter((v) => v.status === "completed").length
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl pt-3">6/21</h1>

      <div className="flex justify-center items-center flex-wrap gap-4">
        {usersSorted.map((user) => (
          <UserWeeks key={user.id} {...user}></UserWeeks>
        ))}
      </div>
    </main>
  );
}
