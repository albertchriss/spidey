"use client";
import React, { useState } from "react";

import { HiDotsVertical } from "react-icons/hi";
import { Checkbox } from "~/components/ui/checkbox";

interface TaskHeaderProps {
  children: React.ReactNode;
  date: string;
  handleChange: () => void;
  isSelectedAll: boolean;
}

export const TaskHeader = ({
  children,
  date,
  handleChange,
  isSelectedAll,
}: TaskHeaderProps) => {
  return (
    <div className="w-full border-b border-gray-400">
      <div className="grid w-full grid-cols-12 gap-2 rounded-t-md bg-gray-500/20 px-4 py-3">
        <div className="col-span-1 flex items-center">
          <p className="flex-grow text-lg text-slate-700">Mark</p>
        </div>

        <div className="col-span-7 flex items-center">
          <p className="flex-grow text-lg text-slate-700">{children}</p>
        </div>

        <div className="col-span-2 flex items-center">
          <p className="text-lg text-slate-700">{date}</p>
        </div>
        <div className="col-span-2 flex items-center justify-end gap-3">
          <p className="text-lg text-slate-700">Select All</p>
          <Checkbox
            className="size-5"
            onCheckedChange={handleChange}
            checked={isSelectedAll}
          />
        </div>
      </div>
    </div>
  );
};
