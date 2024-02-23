import { User, Weeks } from "@/utils/types";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  CircleIcon,
  Half2Icon,
} from "@radix-ui/react-icons";
import { CURRENT_WEEK, TOTAL_WEEKS } from "@/utils/dayjs";

function Icons({ id, days }: Weeks) {
  if (days.length >= 3) {
    return (
      <CheckCircledIcon className="min-h-[80px] min-w-[80px] w-20 h-20 text-lime-500" />
    );
  } else {
    if (id === CURRENT_WEEK && days.length < 3) {
      return <Half2Icon className="w-20 h-20 text-amber-500 rotate-180" />;
    }
    if (id > CURRENT_WEEK) {
      return <CircleIcon className="w-20 h-20" />;
    }
    if (days.length < 3) {
      return <CrossCircledIcon className="w-20 h-20 text-red-500" />;
    }
  }
}

export async function UserWeeks({ name, weeks }: User) {
  const weeksFilled = [
    ...weeks,
    ...Array(TOTAL_WEEKS - weeks.length)
      .fill(undefined)
      .map<Weeks>((_, index) => ({
        id: weeks.length + index + 1,
        days: [],
      })),
  ];

  const lengthCompleted = weeks.filter(
    (weeks) => weeks.days.length >= 3
  ).length;
  const lengthUncompleted = weeks.filter(
    (weeks) => weeks.days.length < 3 && weeks.id !== CURRENT_WEEK
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
          <div key={week.id}>
            <Icons {...week} />
          </div>
        ))}
      </div>
    </div>
  );
}
