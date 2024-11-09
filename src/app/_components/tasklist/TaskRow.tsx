"use client";
import React, { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { TitikTiga } from "./TitikTiga";
import { HiChevronDown } from "react-icons/hi";
import { AlertDelete } from "../AlertDelete";

interface TaskRowProps {
  children: React.ReactNode;
  date: Date;
  description?: string;
  isCompleted: boolean;
  showEdit?: boolean;
  onClick: (isOn: boolean, TaskId: number) => void;
  isSelected: boolean;
  TaskId: number;
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
    onClick(isOn, TaskId);
  };

  return (
    <div className="h-fit w-full">
      <div className="group flex h-fit w-full flex-col overflow-hidden border-b border-gray-400 transition-all">
        <div
          className={`z-10 grid w-full grid-cols-12 gap-2 rounded-md px-4 py-2 transition-all duration-300 ${!isSelected ? "bg-white" : "bg-slate-100"}`}
          onClick={() => onChange(isSelected)}
        >
          <div className="col-span-1 flex items-center">
            <Checkbox checked={isCompleted} onCheckedChange={handleComplete}/>
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
            <TitikTiga
              showAlert={() => setOpenAlert(true)}
              handleFormValue={handleFormValue}
              showEdit={showEdit}
            />
          </div>
        </div>
        <div
          className={`${openDetails ? "h-fit px-8 pt-2" : "h-0"} overflow-hidden transition-px duration-500 flex items-center`}
        >
          <p className="text-gray-500">
            {
              description
                ? description
                : "No description"
            }
          </p>
        </div>
        <div
          className={`z-0 flex items-center justify-center rounded-md border-b-gray-800 transition-all duration-300 hover:bg-gray-400/10  ${openDetails ? " h-4" : "h-0 group-hover:h-4"}`}
          onClick={() => setOpenDetails(!openDetails)}
        >
          <HiChevronDown className={`size-6 text-gray-500 ${openDetails ? "rotate-180" : "rotate-0"}`} />
        </div>
      </div>
    </div>
  );
};
