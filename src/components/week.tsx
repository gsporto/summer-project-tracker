import { CURRENT_WEEK } from "@/utils/dayjs";
import { WeekType, Weeks } from "@/utils/types";
import { IconsTracking } from "./iconsTracking";
import { TrackingCheck } from "./trackingCheck";

type WeekProps = {
  week: Weeks;
};

function getType({ days, id }: Weeks): WeekType {
  if (days.length >= 3) {
    return "completed";
  } else {
    if (id === CURRENT_WEEK && days.length < 3) {
      return "in-progress";
    }
    if (id > CURRENT_WEEK) {
      return "pending";
    }
    if (days.length < 3) {
      return "uncompleted";
    }
    return "uncompleted";
  }
}

function getColor(type: WeekType) {
  switch (type) {
    case "completed":
      return "text-lime-500";
    case "uncompleted":
      return "text-red-500";
    case "in-progress":
      return "text-amber-500";
    case "pending":
      return "";
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
