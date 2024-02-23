"use client";

import dayjs from "dayjs";
import { useSyncExternalStore } from "react";

type NextUpdateProps = {
  date: string;
};

export function NextUpdate({ date }: NextUpdateProps) {
  const dateParsed = useSyncExternalStore(
    () => () => {},
    () => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    () => dayjs(date).format("DD/MM/YYYY HH:mm:ss")
  );

  return (
    <p className="fixed bottom-0 left-0 bg-black z-50 p-2 rounded-tr-lg">
      Próxima Atualização: {dateParsed}
    </p>
  );
}
