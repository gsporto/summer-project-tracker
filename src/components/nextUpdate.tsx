'use client';

import { DateTime } from 'luxon';
import { useSyncExternalStore } from 'react';

type NextUpdateProps = {
  date: string;
};

export function NextUpdate({ date }: NextUpdateProps) {
  const dateParsed = useSyncExternalStore(
    () => () => {
      return;
    },
    () =>
      DateTime.fromISO(date, { zone: 'system' }).toFormat(
        'dd/MM/yyyy HH:mm:ss',
      ),
    () => DateTime.fromISO(date).toFormat('dd/MM/yyyy HH:mm:ss'),
  );

  return (
    <p className="fixed bottom-0 left-0 bg-black z-50 p-2 rounded-tr-lg">
      Próxima Atualização: {dateParsed}
    </p>
  );
}
