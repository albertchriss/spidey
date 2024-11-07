"use client";
import React, { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { TitikTiga } from "./TitikTiga";
import { api } from "~/trpc/react";
import { AlertDelete } from "../AlertDelete";

interface TaskRowProps {
  children: React.ReactNode;
  date: Date;
  onClick: (isOn: boolean, TaskId: number) => void;
  isSelectedAll: boolean;
  TaskId: number;
  deletedTasks: number[];
  handleDelete: (taskId: number) => void;
}

export const TaskRow = ({
  children,
  date,
  onClick,
  isSelectedAll,
  TaskId,
  deletedTasks,
  handleDelete,
}: TaskRowProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const onChange = (isOn: boolean) => {
    setIsSelected(!isSelected);
    onClick(isOn, TaskId);
  };

  const [openAlert, setOpenAlert] = useState(false);

  if (isSelectedAll && isSelected) {
    setIsSelected(false);
  }

  if (deletedTasks.includes(TaskId)) {
    return null;
  }
  return (
    <div
      className="w-full border-b border-gray-400"
      onClick={() => onChange(isSelected)}
    >
      <div
        className={`grid w-full grid-cols-12 gap-2 rounded-md px-4 py-2 ${!isSelected && !isSelectedAll ? "bg-white" : "bg-slate-400/20"}`}
      >
        <div className="col-span-1 flex items-center">
          <Checkbox />
        </div>

        <div className="col-span-7 flex items-center">
          <p className="flex-grow hover:cursor-default">{children}</p>
        </div>

        <div className="col-span-3 flex items-center">
          <p>{date.toLocaleString().slice(0, 17)}</p>
        </div>

        <div className="col-span-1 flex items-center justify-end">
            <AlertDelete
                onConfirm={() => handleDelete(TaskId)}
                open={openAlert}
                setOpen={setOpenAlert}
            />
            <TitikTiga showAlert={() => setOpenAlert(true)} />
          
        </div>
      </div>
    </div>
  );
};
