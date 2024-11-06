"use client";
import React, { useState } from "react";
import { TaskRow } from "./TaskRow";
import { TaskHeader } from "./TaskHeader";
import { OptionBar } from "~/app/_components/OptionBar";
import { api } from "~/trpc/react";

interface TaskTableProps {
  userId: string;
}

export const TaskTable = ({ userId }: TaskTableProps) => {
  const { data } = api.task.getUserTasks.useQuery({ id: userId });

  const [numSelected, setNumSelected] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showOptionBar, setShowOptionBar] = useState(false);

  const onSelect = (isOn: boolean) => {
    if (isOn) {
      setShowOptionBar(true);
    } else {
      setShowOptionBar(false);
    }
  };

  const onClick = (isOn: boolean) => {
    if (isOn) {
      setNumSelected(numSelected - 1);
      if (numSelected - 1 === 0) {
        onSelect(false);
      } else {
        onSelect(true);
      }
    } else {
      setNumSelected(numSelected + 1);
      onSelect(true);
    }
  };
  return (
    <div className="flex w-full flex-col items-center mt-[2%]">
      <div className="flex w-full max-w-7xl flex-col">
        {/* table title */}
        <h1 className="mb-2 text-3xl font-bold">Your Tasks</h1>

        {/* table content */}
        <div className="mb-2 flex w-full flex-col">
          {/* table header */}
          <TaskHeader date="Deadline">Task Title</TaskHeader>

          {data?.map((items) => (
            <TaskRow onClick={(isOn) => onClick(isOn)} date={items.createdAt}>
                {items.title}
            </TaskRow>

          ))
        }
        </div>

        {/* table footer */}
        <div className="mt-2 flex w-full justify-between">
          <p className="text-slate-500">{numSelected} selected</p>
        </div>
      </div>
      {showOptionBar ? <OptionBar /> : null}
    </div>
  );
};
