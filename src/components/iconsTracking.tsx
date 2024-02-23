import { cn } from "@/utils/cn";
import { WeekType } from "@/utils/types";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  CircleIcon,
  Half2Icon,
} from "@radix-ui/react-icons";

type IconsTrackingProps = {
  type: WeekType;
  className?: string;
};

export function IconsTracking({ className, type }: IconsTrackingProps) {
  switch (type) {
    case "completed":
      return <CheckCircledIcon className={cn("w-20 h-20", className)} />;
    case "uncompleted":
      return <CrossCircledIcon className={cn("w-20 h-20", className)} />;
    case "in-progress":
      return <Half2Icon className={cn("w-20 h-20", className)} />;
    case "pending":
      return <CircleIcon className={cn("w-20 h-20", className)} />;

    default:
      return;
  }
}
