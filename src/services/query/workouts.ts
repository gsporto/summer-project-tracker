import { type User, type WorkoutsData } from '@/utils/types';
import { getStartDate } from '@/utils/dateTime';
import { ulid } from 'ulidx';
import { DateTime } from 'luxon';
import { unstable_cache } from 'next/cache';

export async function getWorkouts() {
  if (process.env.WORKOUT_API && process.env.TOKEN_API) {
    const data: WorkoutsData = await fetch(process.env.WORKOUT_API, {
      next: {
        revalidate: 60 * 30,
      },
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

    return users;
  }
  return [];
}

export const dateCached = unstable_cache(
  async () => {
    const promise = await new Promise<string>((resolve) => {
      resolve(DateTime.now().plus({ minutes: 30 }).toISO());
    });
    return promise;
  },
  ['date'],
  {
    revalidate: 60 * 30,
  },
);
