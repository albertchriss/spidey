"use client";
import React, { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { TitikTiga } from "./TitikTiga";
import { HiChevronDown } from "react-icons/hi";
import { AlertDelete } from "../AlertDelete";
import { Skeleton } from "~/components/ui/skeleton";
import dayjs from "dayjs";

interface TaskRowProps {
  children: React.ReactNode;
  date: Date;
  description?: string;
  isCompleted: boolean;
  showEdit?: boolean;
  onClick: (isOn: boolean, TaskId: number) => void;
  isSelected: boolean;
  TaskId?: number;
  handleDelete: (taskId: number) => void;
  handleFormValue: () => void;
  handleComplete: () => void;
}

export const TaskRow = ({
  children,
  date,
  description,
  isCompleted,
  showEdit,
  onClick,
  isSelected,
  TaskId,
  handleDelete,
  handleFormValue,
  handleComplete,
}: TaskRowProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const onChange = (isOn: boolean) => {
    if (TaskId) onClick(isOn, TaskId);
  };

  return (
    <div className="h-fit w-full">
      <div className="group flex h-fit w-full flex-col overflow-hidden border-b border-gray-400 transition-all">
        <ul
          className={`z-10 grid w-full grid-cols-12 gap-2 rounded-md px-4 py-2 transition-all duration-300 ${!isSelected ? "bg-white" : "bg-slate-100"}`}
          onClick={() => onChange(isSelected)}
        >
          <li className="col-span-1 flex items-center">
            <Checkbox checked={isCompleted} onCheckedChange={handleComplete} />
          </li>

          <li className="col-span-7 flex items-center">
            <p className="flex-grow hover:cursor-default">{children}</p>
          </li>

          <li className="col-span-3 flex items-center">
            <p className={(date < new Date()) && !isCompleted ? "text-red-700" : ""}>{dayjs(date).format('DD/MM/YYYY HH:mm')}</p>
          </li>

          <li className="col-span-1 flex items-center justify-end">
            <AlertDelete
              onConfirm={() => handleDelete(TaskId ?? 0)}
              open={openAlert}
              setOpen={setOpenAlert}
            />
            {TaskId ? (
              <TitikTiga
                showAlert={() => setOpenAlert(true)}
                handleFormValue={handleFormValue}
                showEdit={showEdit}
              />
            ) : (
              <Skeleton className="h-[25px] w-[20%]" />
            )}
          </li>
        </ul>
        <div
          className={`${openDetails ? "h-fit px-8 pt-2" : "h-0"} transition-px flex items-center overflow-hidden duration-500 bg-white`}
        >
          <p className={`text-gray-500 ${description ? "" : "italic"}`}>
            {description ? description : "No description"}
          </p>
        </div>
        
        <div
          className={`z-0 flex items-center justify-center rounded-md border-b-gray-800 transition-all bg-white duration-300 hover:bg-slate-100 ${openDetails ? "h-4" : "h-0 group-hover:h-4"}`}
          onClick={() => setOpenDetails(!openDetails)}
        >
          <HiChevronDown
            className={`size-6 text-gray-500 ${openDetails ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
    </div>
  );
};
