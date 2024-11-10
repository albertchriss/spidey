"use client";
import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { Button } from "~/components/ui/button";
import { AlertDelete } from "../AlertDelete";

interface OptionBarProps {
  handleDelete: () => void;
  handleCompleteTasks: () => void;
  mark?: boolean;
}

export const OptionBar = ({
  handleDelete,
  handleCompleteTasks,
  mark,
}: OptionBarProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const handleOnClick = () => {
    setOpenAlert(true);
  };
  return (
    <div className="flex h-full w-full items-center gap-2 rounded-2xl border-b border-zinc-300 bg-slate-600/10 px-5 py-2">
      <div className="flex items-center justify-evenly gap-4">
        <div
          className="flex items-center justify-evenly gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-slate-500/10"
          onClick={handleCompleteTasks}
        >
          {
            mark ?
            <HiCheckCircle className="size-6 text-green-400" />
            :
            <HiXCircle className="size-6 text-red-400" />
          }
          <p className={`${ mark ? "text-green-700" : "text-red-700"}`}>
            {
              mark ?
              "Mark as completed"
              :
              "Mark uncomplete"

            }
          </p>
        </div>

        <AlertDelete
          open={openAlert}
          setOpen={setOpenAlert}
          onConfirm={handleDelete}
        >
          <Button
            variant={"ghost"}
            className="flex items-center justify-center gap-2 rounded-md p-2 hover:bg-slate-500/10"
            onClick={handleOnClick}
          >
            <HiTrash className="size-6 text-black" />
          </Button>
        </AlertDelete>
      </div>
    </div>
  );
};
