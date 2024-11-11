"use client";

import { AccordionDropdown } from "../AccordionDropdown";
import { Skeleton } from "~/components/ui/skeleton";
import { useTaskContext } from "./TaskContext";
import { TaskTable } from "./TaskTable";

interface TaskList {
  userId?: string;
}

export const TaskList = ({ userId }: TaskList) => {
  const {
    numCompleted,
    numOngoing,
  } = useTaskContext();

  return (
    <>
      <AccordionDropdown
        defaultExpanded
        title={
          <span className="font-semibold">
            Ongoing Task {"("}
            {numOngoing === undefined ? (
              <Skeleton className="inline-block size-[14px] rounded-full" />
            ) : (
              `${numOngoing}`
            )}
            {")"}
          </span>
        }
        className="h-full w-[90%] max-w-7xl bg-gray-100 bg-opacity-50"
      >
        <TaskTable userId={userId ?? ""} isCompleted={false} />
      </AccordionDropdown>

      <AccordionDropdown
        title={
          <span className="font-semibold">
            Completed Task {"("}
            {numCompleted === undefined ? (
              <Skeleton className="inline-block size-[14px] rounded-full" />
            ) : (
              `${numCompleted}`
            )}
            {")"}
          </span>
        }
        className="h-full w-[90%] max-w-7xl bg-gray-100 bg-opacity-50"
      >
        <TaskTable userId={userId ?? ""} isCompleted={true} />
      </AccordionDropdown>
    </>
  );
};
