"use client";
import React, { useState, useTransition } from "react";
import { TaskRow } from "./TaskRow";
import { TaskHeader } from "./TaskHeader";
import { OptionBar } from "~/app/_components/tasklist/OptionBar";
import { api } from "~/trpc/react";
import { Task } from "~/server/db/schema";

interface TaskTableProps {
  userId: string;
  updatedData?: Task[];
  setIsOpenDialog: (value: boolean) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string | undefined) => void;
  setDate: (value: Date) => void;
}

export const TaskTable = ({
  userId,
  updatedData,
  setIsOpenDialog,
  setTitle,
  setDescription,
  setDate,
}: TaskTableProps) => {
  // state stuff
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<number[]>([]);

  // query stuff
  let { data } = api.task.getUserTasks.useQuery({
    id: userId,
    completed: false,
  });

  if (updatedData && updatedData.length > 0) {
    data = [...updatedData, ...(data ?? [])];
  }

  // mutation stuff
  const { mutate: deleteSomeTasks } = api.task.deleteSomeTasks.useMutation({
    onSuccess: (data, variables) => {
      const taskIds = variables.ids;
      setDeletedTasks([...deletedTasks, ...taskIds]);
      setNumSelected(selectedTasks.length - taskIds.length);
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
    },
  });
  const { mutate: deleteTask } = api.task.deleteTask.useMutation({
    onSuccess: (data, variables) => {
      const taskId = variables.id;
      setDeletedTasks([...deletedTasks, taskId]);
      setNumSelected(
        selectedTasks.length - (selectedTasks.includes(taskId) ? 1 : 0),
      );
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    },
  });

  // functions stuff
  const handleSelectAll = () => {
    setIsSelectedAll(!isSelectedAll);
    if (isSelectedAll) {
      setNumSelected(0);
      setSelectedTasks([]);
    } else {
      setNumSelected(data?.length ?? 0);
      setSelectedTasks(data?.map((task) => task.id) ?? []);
    }
  };
  const onClick = (isOn: boolean, taskId: number) => {
    if (isOn) {
      setNumSelected(numSelected - 1);
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setNumSelected(numSelected + 1);
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };
  const handleDeleteTasks = () => {
    deleteSomeTasks({ ids: selectedTasks });
  };
  const handleDeleteOneTask = (taskId: number) => {
    deleteTask({ id: taskId });
  };

  return (
    <div className="mt-[60px] flex h-full w-full max-w-7xl flex-col items-center overflow-auto px-[3%]">
      {(data?.length ?? 0 > 0) && data?.length !== deletedTasks.length ? (
        <div className="flex w-full flex-col items-center">
          {/* table title */}
          <div className="mb-2 flex h-[50px] w-full items-center">
            {numSelected > 0 ? (
              <OptionBar handleDelete={handleDeleteTasks} />
            ) : (
              <h1 className="text-3xl font-bold">Your Tasks</h1>
            )}
          </div>

          {/* table content */}
          <div className="mb-2 flex w-full flex-col items-center">
            {/* table header */}
            <TaskHeader
              handleChange={handleSelectAll}
              date="Deadline"
              isSelectedAll={isSelectedAll}
            >
              Task Title
            </TaskHeader>

            {data?.map((items) => (
              <TaskRow
                onClick={onClick}
                title={items.title}
                description={items?.description ?? undefined}
                date={items.deadline}
                isSelectedAll={isSelectedAll}
                TaskId={items.id}
                deletedTasks={deletedTasks}
                handleDelete={handleDeleteOneTask}
                setIsOpenDialog={setIsOpenDialog}
                setTitle={setTitle}
                setDescription={setDescription}
                setDate={setDate}
              >
                {items.title}
              </TaskRow>
            ))}
          </div>

          {/* table footer */}
          <div className="mt-2 flex w-full justify-between">
            <p className="text-slate-500">{numSelected} selected</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-6xl font-bold">You don't have any tasks yet </h1>
        </div>
      )}
    </div>
  );
};
