"use client";

import { useState } from "react";
import { CreateTaskPopUp } from "../create/CreateTaskPopUp";
import { TaskTable } from "./TaskTable";
import { Task } from "~/server/db/schema";

interface TaskList {
  userId?: string;
}



export const TaskList = ({ userId }: TaskList) => {
    const [updatedData, setUpdatedData] = useState<Task[]>([]);
    const handleUpdateDate = (newTask: Task) => {
        setUpdatedData([...updatedData, newTask]);
    }
  return (
    <>
      <TaskTable userId={userId ?? ""} updatedData={updatedData}/>
      <CreateTaskPopUp userId={userId ?? ""} handleUpdate={handleUpdateDate}/>
    </>
  );
};
