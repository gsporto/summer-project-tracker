
import { updateUser } from "../services/actions/users";
import { FormContent } from "./formContent";
import { getCachedUsers } from "../services/query/users";

export default async function Home() {
  const users = await getCachedUsers();
  return (
    <main className="flex justify-around items-center h-screen">
      <form
        className="flex flex-col justify-around space-y-2"
        action={updateUser}
      >
        <FormContent users={users} />
      </form>
    </main>
  );
}
