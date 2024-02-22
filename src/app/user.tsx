import { useMemo } from "react";
import { User, Weeks } from "./types";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  CircleIcon,
} from "@radix-ui/react-icons";

export async function UserWeeks({ name, weeks }: User) {
  const weeksFilled = [
    ...weeks,
    ...Array(21 - weeks.length)
      .fill(undefined)
      .map<Weeks>((_, index) => ({
        id: weeks.length + index + 1,
        status: "pending",
      })),
  ];

  const lengthCompleted = weeks.filter(
    (weeks) => weeks.status === "completed"
  ).length;
  const lengthUncompleted = weeks.filter(
    (weeks) => weeks.status === "uncompleted"
  ).length;
  const lengthPending = weeksFilled.filter(
    (weeks) => weeks.status === "pending"
  ).length;

  return (
    <div className="flex flex-col flex-1 items-center basis-96">
      <div className="p-5 rounded flex flex-col items-center z-10">
        <p>{name}</p>
        <p>
          <span className="text-lime-500">{lengthCompleted}</span> |
          <span className="text-red-500"> {lengthUncompleted}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {weeksFilled.map((week) => {
          switch (week.status) {
            case "completed":
              return (
                <CheckCircledIcon
                  key={week.id}
                  className="min-h-[80px] min-w-[80px] w-20 h-20 text-lime-500"
                />
              );
            case "uncompleted":
              return (
                <CrossCircledIcon
                  key={week.id}
                  className="w-20 h-20 text-red-500"
                />
              );
            case "pending":
            default:
              return <CircleIcon key={week.id} className="w-20 h-20" />;
          }
        })}
      </div>
    </div>
  );
}
