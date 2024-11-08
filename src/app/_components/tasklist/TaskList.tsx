"use client";

import { useState } from "react";
import { CreateTaskPopUp } from "../create/CreateTaskPopUp";
import { TaskTable } from "./TaskTable";
import { Task } from "~/server/db/schema";

interface TaskList {
  userId?: string;
}

export const TaskList = ({ userId }: TaskList) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>();

  const [updatedData, setUpdatedData] = useState<Task[]>([]);
  const handleUpdateDate = (newTask: Task) => {
    setUpdatedData([...updatedData, newTask]);
  };
  return (
    <>
      <TaskTable
        userId={userId ?? ""}
        updatedData={updatedData}
        setIsOpenDialog={setIsOpenDialog}
        setTitle={setTitle}
        setDescription={setDescription}
        setDate={setDate}
      />
      <CreateTaskPopUp
        userId={userId ?? ""}
        handleUpdate={handleUpdateDate}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        title={title}
        description={description}
        date={date}
        setTitle={setTitle}
        setDescription={setDescription}
        setDate={setDate}
      />
    </>
  );
};
