import { kv } from "@vercel/kv";
import { unstable_cache as cache } from "next/cache";
import { User } from "../../types";

const getCachedUsers = cache(
  async () => {
    const users = await kv.get<Array<User>>("users");
    if (users) {
      return users;
    }
    return [];
  },
  ["users"],
  { revalidate: 60 * 60 * 24, tags: ["users"] }
);

export { getCachedUsers };
