import {
  MIN_DAY_PER_WEEK,
  getCurrentWeek,
  getStartDate,
} from '@/utils/dateTime';
import type { WeekType, Weeks } from '@/utils/types';
import { IconsTracking } from './iconsTracking';
import { TrackingCheck } from './trackingCheck';
import { DateTime } from 'luxon';

type WeekProps = {
  week: Weeks;
};

function getType({ days, id }: Weeks): WeekType {
  if (days.length >= MIN_DAY_PER_WEEK) {
    return 'completed';
  } else {
    const CURRENT_WEEK = getCurrentWeek('America/Sao_Paulo');
    const START_DATE = getStartDate('America/Sao_Paulo');
    const daysLeaft = Math.floor(
      START_DATE.plus({ week: CURRENT_WEEK }).diff(
        DateTime.now().startOf('day'),
        'day',
      ).days,
    );
    if (id === CURRENT_WEEK && days.length + daysLeaft < MIN_DAY_PER_WEEK) {
      return 'uncompleted';
    }
    if (id === CURRENT_WEEK && days.length < MIN_DAY_PER_WEEK) {
      return 'in-progress';
    }
    if (id > CURRENT_WEEK) {
      return 'pending';
    }
    if (days.length < MIN_DAY_PER_WEEK) {
      return 'uncompleted';
    }
    return 'uncompleted';
  }
}

function getColor(type: WeekType) {
  switch (type) {
    case 'completed':
      return 'text-lime-500';
    case 'uncompleted':
      return 'text-red-500';
    case 'in-progress':
      return 'text-amber-500';
    case 'pending':
      return '';
    default:
      return;
  }
}

export function Week({ week }: WeekProps) {
  const type = getType(week);
  const color = getColor(type);

  return (
    <TrackingCheck color={color} week={week}>
      <IconsTracking className={color} type={type} />
    </TrackingCheck>
  );
}
