import { kv } from "@vercel/kv";
import { unstable_cache as cache } from "next/cache";
import { User } from "@/utils/types";

export const KEY_USER = "@user"

const getCachedUsers = cache(
  async () => {
    const users = await kv.get<Array<User>>(KEY_USER);
    if (users) {
      return users;
    }
    return [];
  },
  [KEY_USER],
  { revalidate: 60 * 60 * 24, tags: [KEY_USER] }
);

export { getCachedUsers };
