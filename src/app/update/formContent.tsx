"use client";
import { useState } from "react";
import { User } from "../types";
import { CURRENT_WEEK, TOTAL_WEEKS } from "../utils/dayjs";
import { useFormStatus } from "react-dom";

type FormContentProps = {
  users: Array<User>;
};

export function FormContent({ users }: FormContentProps) {
  const [selectedWeek, setSelectedWeek] = useState(CURRENT_WEEK);
  const { pending } = useFormStatus();

  const weeks = Array(CURRENT_WEEK)
    .fill(undefined)
    .map((_, i) => i + 1);

  return (
    <>
      <label htmlFor="week">
        Week:
        <select
          className="bg-black ml-2"
          name="week"
          defaultValue={selectedWeek}
          onChange={(e) => {
            setSelectedWeek(Number(e.currentTarget.value));
          }}
        >
          {weeks.map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </label>

      {users.map((user) => (
        <div key={user.id + selectedWeek}>
          <input
            type="checkbox"
            id={user.id}
            name={user.id}
            defaultChecked={
              user.weeks.find((week) => week.id === selectedWeek)?.status ===
              "completed"
            }
          />
          <label className="ml-2" htmlFor={user.id}>{user.name}</label>
        </div>
      ))}

      <button className="bg-slate-500 rounded p-2" type="submit" disabled={pending}>
        {pending ? "Sending..." : "Submit"}
      </button>
    </>
  );
}
