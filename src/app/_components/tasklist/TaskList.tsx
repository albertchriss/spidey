"use client";

import { useState } from "react";
import { CreateTaskPopUp } from "../create/CreateTaskPopUp";
import { TaskTable } from "./TaskTable";
import type { Task } from "~/server/db/schema";
import { CompletedTask } from "./CompletedTask";
import { AccordionDropdown } from "../AccordionDropdown";
import { Skeleton } from "~/components/ui/skeleton";
import { useTaskContext } from "./TaskContext";

interface TaskList {
  userId?: string;
}

export const TaskList = ({ userId }: TaskList) => {
  // const [isOpenDialog, setIsOpenDialog] = useState(false);
  // const [title, setTitle] = useState<string | undefined>();
  // const [description, setDescription] = useState<string | undefined>();
  // const [date, setDate] = useState<Date | undefined>();
  // const [taskId, setTaskId] = useState<number | undefined>();
  // const [numCompleted, setNumCompleted] = useState<number | undefined>();
  // const [numOngoing, setNumOngoing] = useState<number | undefined>();
  const {
    // handleFormValue,
    updatedData,
    setUpdatedData,
    editedData,
    setEditedData,
    completedData,
    setCompletedData,
    numCompleted,
    setNumCompleted,
    numOngoing,
    setNumOngoing,
    setIsOpenDialog,
    setTitle,
    setDescription,
    setDate,
    setTaskId
  } = useTaskContext();

  const handleFormValue = (
    title: string,
    description: string,
    date: Date,
    taskId: number,
  ) => {
    setIsOpenDialog(true);
    setTitle(title);
    setDescription(description);
    setDate(date);
    setTaskId(taskId);
  };

  const setUndefined = () => {
    setTitle(undefined);
    setDescription(undefined);
    setDate(undefined);
    setTaskId(undefined);
  };

  const handleUpdateData = (newTask: Task[]) => {
    setUpdatedData(newTask);
  };

  const handleEditData = (newTask: Task) => {
    setEditedData(newTask);
  };


  // export const Create = () => {
  //   return (
  //     <CreateTaskPopUp
  //       userId={userId ?? ""}
  //       handleUpdate={handleUpdateData}
  //       handleEdit={handleEditData}
  //       isOpenDialog={isOpenDialog}
  //       setIsOpenDialog={setIsOpenDialog}
  //       title={title}
  //       description={description}
  //       date={date}
  //       taskId={taskId}
  //       setUndefined={setUndefined}
  //     />
  //   )
  // }

  return (
    <>
      <AccordionDropdown
        defaultExpanded
        title={
          <span className="font-semibold">
            Ongoing Task {"("}{numOngoing === undefined ? <Skeleton className="size-[14px] rounded-full inline-block"/> : `${numOngoing}`}{")"}
          </span>
        }
        className="h-full w-[90%] max-w-7xl bg-gray-100 bg-opacity-50"
      >
        <TaskTable
          userId={userId ?? ""}
          handleFormValue={handleFormValue}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          editedData={editedData}
          setEditedData={setEditedData}
          setCompletedData={setCompletedData}
          setNumOngoing={setNumOngoing}
        />
      </AccordionDropdown>

      <AccordionDropdown
        title={
          <span className="font-semibold">
            Completed Task {"("}{numCompleted === undefined ? <Skeleton className="size-[14px] rounded-full inline-block"/> : `${numCompleted}`}{")"}
          </span>
        }
        className="h-full w-[90%] max-w-7xl bg-gray-100 bg-opacity-50"
      >
        <CompletedTask
          userId={userId ?? ""}
          handleFormValue={handleFormValue}
          completedData={completedData}
          setUpdatedData={setUpdatedData}
          setCompletedData={setCompletedData}
          setNumCompleted={setNumCompleted}
        />
      </AccordionDropdown>

      
    </>
  );
};
