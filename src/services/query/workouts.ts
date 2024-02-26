import { type User, type WorkoutsData } from '@/utils/types';
import { kv } from '@vercel/kv';
import { getStartDate } from '@/utils/dateTime';
import { unstable_cache as cache, revalidateTag } from 'next/cache';
import { KEY_USER } from './users';
import { ulid } from 'ulidx';
import { DateTime } from 'luxon';

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
  let cached = false;
  if (cacheDate) {
    cached = DateTime.now() < DateTime.fromISO(cacheDate);
  } else {
    cached = false;
  }

  if (process.env.WORKOUT_API && process.env.TOKEN_API && !cached) {
    const data: WorkoutsData = await fetch(process.env.WORKOUT_API, {
      cache: 'no-store',
      headers: {
        Authorization: process.env.TOKEN_API,
      },
    }).then((r) => r.json() as Promise<WorkoutsData>);

    const users = [] as Array<User>;

    for (const value of data.data.reverse()) {
      const userFinded = users.find(
        (user) => user.idWorkout === value.account.id,
      );

      const currentWeek =
        Math.floor(
          DateTime.fromISO(value.occurred_at, {
            zone: 'America/Sao_Paulo',
          }).diff(getStartDate('America/Sao_Paulo'), 'week').weeks,
        ) + 1;

      if (!userFinded) {
        users.push({
          id: ulid(),
          idWorkout: value.account.id,
          name: value.account.full_name,
          weeks: [
            {
              id: currentWeek,
              days: [
                DateTime.fromISO(value.occurred_at, {
                  zone: 'America/Sao_Paulo',
                }).toISODate()!,
              ],
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
          days: [
            DateTime.fromISO(value.occurred_at, {
              zone: 'America/Sao_Paulo',
            }).toISODate()!,
          ],
        });
        continue;
      }
      weekFinded.days = [
        ...weekFinded.days,
        DateTime.fromISO(value.occurred_at, {
          zone: 'America/Sao_Paulo',
        }).toISODate()!,
      ];
      weekFinded.days = weekFinded.days.filter(
        (value, index) => weekFinded.days.indexOf(value) === index,
      );
    }

    void kv.set(KEY_USER, users);
    revalidateTag(KEY_USER);
    void kv.set(KEY_CACHE, DateTime.now().plus({ minutes: 30 }).toISO());
    revalidateTag(KEY_CACHE);
    return;
  }
  return;
}
