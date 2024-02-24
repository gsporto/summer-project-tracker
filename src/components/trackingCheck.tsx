"use client";
import { cn } from "@/utils/cn";
import { MIN_DAY_PER_WEEK } from "@/utils/dayjs";
import { Weeks } from "@/utils/types";
import { CircleIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

type TrackingCheckProps = {
  children: React.ReactNode;
  color?: string;
  week: Weeks;
};

export function TrackingCheck({ children, color, week }: TrackingCheckProps) {
  const [showData, setShowData] = useState(false);

  return (
    <div onClick={() => setShowData((state) => !state)}>
      {showData ? (
        <div className={cn("w-20 h-20 relative select-none", color)}>
          <CircleIcon className="w-20 h-20" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {week.days.length}/{MIN_DAY_PER_WEEK}
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
