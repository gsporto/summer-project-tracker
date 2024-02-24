import { WorkoutsData } from '@/utils/types';
import { kv } from '@vercel/kv';
import { START_DATE, dayjs } from '@/utils/dayjs';
import { unstable_cache as cache, revalidateTag } from 'next/cache';
import { KEY_USER, getCachedUsers } from './users';
import { ulid } from 'ulidx';

const KEY_CACHE = 'cacheControlWorkouts';

export const cacheControlWorkouts = cache(
  async () => {
    return await kv.get<string>(KEY_CACHE);
  },
  [KEY_CACHE],
  { revalidate: 60 * 15, tags: [KEY_CACHE] },
);

export async function getWorkouts() {
  const cacheDate = await cacheControlWorkouts();
  const cached = dayjs().isBefore(dayjs(cacheDate));

  if (process.env.WORKOUT_API && process.env.TOKEN_API && !cached) {
    const data: WorkoutsData = await fetch(process.env.WORKOUT_API, {
      cache: 'no-store',
      headers: {
        Authorization: process.env.TOKEN_API,
      },
    }).then((r) => r.json());

    const users = await getCachedUsers();

    for (const value of data.data.reverse()) {
      const userFinded = users.find(
        (user) => user.idWorkout === value.account.id,
      );

      const currentWeek = dayjs(value.occurred_at).diff(START_DATE, 'week') + 1;

      if (!userFinded) {
        users.push({
          id: ulid(),
          idWorkout: value.account.id,
          name: value.account.full_name,
          weeks: [
            {
              id: currentWeek,
              days: [dayjs(value.occurred_at).format('DD/MM/YYYY')],
            },
          ],
        });
        continue;
      }

      const weekFinded = userFinded.weeks.find(
        (week) => week.id === currentWeek,
      );

      if (!weekFinded) {
        userFinded.weeks.push({
          id: currentWeek,
          days: [dayjs(value.occurred_at).format('DD/MM/YYYY')],
        });
        continue;
      }
      weekFinded.days = [
        ...weekFinded.days,
        dayjs(value.occurred_at).format('DD/MM/YYYY'),
      ];
      weekFinded.days = weekFinded.days.filter(
        (value, index) => weekFinded.days.indexOf(value) === index,
      );
    }

    kv.set(KEY_USER, users);
    revalidateTag(KEY_USER);
    kv.set(KEY_CACHE, dayjs().add(30, 'minute').toISOString());
    revalidateTag(KEY_CACHE);
    return;
  }
  return;
}
