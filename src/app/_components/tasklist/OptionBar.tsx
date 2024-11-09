"use client"
import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { Button } from "~/components/ui/button";
import { AlertDelete } from "../AlertDelete";

interface OptionBarProps {
  handleDelete: () => void;
  mark?: boolean;
}

export const OptionBar = ( {handleDelete, mark}: OptionBarProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const handleOnClick = () => {
    setOpenAlert(true);
  }
  return (
    <div className="flex h-full w-full items-center gap-2 border-b border-zinc-300 bg-slate-600/10 px-5 py-2 rounded-2xl">
      <div className="flex items-center justify-evenly gap-4">
        {
          mark && (
            <div className="flex items-center justify-evenly gap-2 rounded-md p-2 hover:bg-slate-500/10 hover:cursor-pointer">
              <HiCheckCircle className="size-6 text-green-400" />
              <p className="text-green-700">Mark as completed</p>
            </div>
          )
        }
        <AlertDelete  open={openAlert} setOpen={setOpenAlert} onConfirm={handleDelete} >
          <Button variant={"ghost"} className="flex items-center justify-center gap-2 rounded-md p-2 hover:bg-slate-500/10" onClick={handleOnClick}>
            <HiTrash className="size-6 text-black" />
          </Button>
        </AlertDelete>
      </div>
    </div>
  );
};
