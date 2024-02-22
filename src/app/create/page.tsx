import { kv } from "@vercel/kv";
import { revalidateTag, unstable_cache as cache } from "next/cache";
import { ulid } from "ulidx";
import { User } from "../types";

export default async function Home() {
  async function action(formData: FormData) {
    "use server";
    kv.zscan;
    await kv.set<Array<User>>("users", [
      {
        id: ulid(),
        name: "Porto",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "completed" },
          { id: 3, status: "completed" },
          { id: 4, status: "completed" },
          { id: 5, status: "completed" },
          { id: 6, status: "completed" },
        ],
      },
      {
        id: ulid(),
        name: "Wesller",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "completed" },
          { id: 3, status: "completed" },
          { id: 4, status: "completed" },
          { id: 5, status: "completed" },
          { id: 6, status: "completed" },
        ],
      },
      {
        id: ulid(),
        name: "Guilherme",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "completed" },
          { id: 3, status: "uncompleted" },
          { id: 4, status: "uncompleted" },
          { id: 5, status: "completed" },
          { id: 6, status: "completed" },
        ],
      },
      {
        id: ulid(),
        name: "Nicolli",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "completed" },
          { id: 3, status: "completed" },
          { id: 4, status: "completed" },
          { id: 5, status: "completed" },
          { id: 6, status: "completed" },
        ],
      },
      {
        id: ulid(),
        name: "Madu",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "completed" },
          { id: 3, status: "completed" },
          { id: 4, status: "completed" },
          { id: 5, status: "completed" },
          { id: 6, status: "completed" },
        ],
      },
      {
        id: ulid(),
        name: "Mel",
        weeks: [
          { id: 1, status: "completed" },
          { id: 2, status: "uncompleted" },
          { id: 3, status: "completed" },
          { id: 4, status: "uncompleted" },
          { id: 5, status: "uncompleted" },
          { id: 6, status: "completed" },
        ],
      },
    ]);

    revalidateTag("users");
  }

  return (
    <main className="flex justify-around">
      <form action={action}>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
