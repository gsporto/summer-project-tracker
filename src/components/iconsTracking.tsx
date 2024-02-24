import { cn } from '@/utils/cn';
import { WeekType } from '@/utils/types';
import {
  CheckCircledIcon,
  CrossCircledIcon,
  CircleIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

type IconsTrackingProps = {
  type: WeekType;
  className?: string;
};

export function IconsTracking({ className, type }: IconsTrackingProps) {
  switch (type) {
    case 'completed':
      return <CheckCircledIcon className={cn('w-20 h-20', className)} />;
    case 'uncompleted':
      return <CrossCircledIcon className={cn('w-20 h-20', className)} />;
    case 'in-progress':
      return (
        <div className="relative">
          <CircleIcon className={cn('w-20 h-20', className)} />
          <DotsHorizontalIcon
            className={cn(
              'w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              className,
            )}
          />
        </div>
      );
    case 'pending':
      return <CircleIcon className={cn('w-20 h-20', className)} />;

    default:
      return;
  }
}
