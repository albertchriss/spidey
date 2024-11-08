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
  const [taskId, setTaskId] = useState<number | undefined>();

  const handleFormValue = (title: string, description: string, date: Date, taskId: number) => {
    setIsOpenDialog(true);
    setTitle(title);
    setDescription(description);
    setDate(date);
    setTaskId(taskId);
  }

  const setUndefined = () => {
    setTitle(undefined);
    setDescription(undefined);
    setDate(undefined);
    setTaskId(undefined);
  }

  const [updatedData, setUpdatedData] = useState<Task | undefined>();
  const handleUpdateData = (newTask: Task) => {
    setUpdatedData(newTask);
  };

  const [editedData, setEditedData] = useState<Task | undefined>();
  const handleEditData = (newTask: Task) => {
    setEditedData(newTask);
  }

  return (
    <>
      <TaskTable
        userId={userId ?? ""}
        handleFormValue={handleFormValue}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        editedData={editedData}
        setEditedData={setEditedData}
      />
      <CreateTaskPopUp
        userId={userId ?? ""}
        handleUpdate={handleUpdateData}
        handleEdit={handleEditData}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        title={title}
        description={description}
        date={date}
        taskId={taskId}
        setUndefined = {setUndefined}
      />
    </>
  );
};
