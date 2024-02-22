import { User, Weeks } from "./types";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { CURRENT_WEEK, TOTAL_WEEKS } from "./utils/dayjs";

function Icons({ id, status }: Weeks) {
  switch (status) {
    case "completed":
      return (
        <CheckCircledIcon className="min-h-[80px] min-w-[80px] w-20 h-20 text-lime-500" />
      );
    case "uncompleted":
      return <CrossCircledIcon className="w-20 h-20 text-red-500" />;
    case "pending":
    default:
      return id <= CURRENT_WEEK ? (
        <QuestionMarkCircledIcon className="w-20 h-20 text-amber-500" />
      ) : (
        <CircleIcon className="w-20 h-20" />
      );
  }
}

export async function UserWeeks({ name, weeks }: User) {
  const weeksFilled = [
    ...weeks,
    ...Array(TOTAL_WEEKS - weeks.length)
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
        {weeksFilled.map((week) => (
          <div
            key={week.id}
            title={
              week.id <= CURRENT_WEEK
                ? "Week not registered"
                : week.status.charAt(0).toUpperCase() + week.status.slice(1)
            }
          >
            <Icons {...week} />
          </div>
        ))}
      </div>
    </div>
  );
}
