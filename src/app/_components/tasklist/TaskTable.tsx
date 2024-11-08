"use client";
import React, { useEffect, useState, useTransition } from "react";
import { TaskRow } from "./TaskRow";
import { TaskHeader } from "./TaskHeader";
import { OptionBar } from "~/app/_components/tasklist/OptionBar";
import { api } from "~/trpc/react";
import { Task } from "~/server/db/schema";

interface TaskTableProps {
  userId: string;
  updatedData?: Task;
  editedData?: Task;
  handleFormValue: (title: string, description: string, date: Date, taskId: number) => void;
  setUpdatedData: (newTask: Task | undefined) => void;
  setEditedData: (newTask: Task | undefined) => void;
}

export const TaskTable = ({
  userId,
  updatedData,
  editedData,
  handleFormValue,
  setUpdatedData,
  setEditedData,
}: TaskTableProps) => {
  // state stuff
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [data, setData] = useState<Task[]>([]);

  // query stuff
  const { data: query } = api.task.getUserTasks.useQuery({
    id: userId,
    completed: false,
  });

  useEffect(() => {
    if (query) {
      setData(query);
    }
  }, [query]);

  useEffect(() => {
    if (updatedData) {
      setData((prevData) => [...prevData, updatedData]);
      setUpdatedData(undefined);
    }
  }, [updatedData]);

  useEffect(() => {
    if (editedData) {
      setData((prevData) =>
        prevData.map((task) => (task.id === editedData.id ? editedData : task)),
      );
      setEditedData(undefined);
    }
  }, [editedData]);

  useEffect(() => {
    setNumSelected(selectedTasks.length);
  }, [selectedTasks]);

  // mutation stuff
  const { mutate: deleteSomeTasks } = api.task.deleteSomeTasks.useMutation({
    onMutate: (variables) => {
      const taskIds = variables.ids;
      setData(data?.filter((task) => !taskIds.includes(task.id)));
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
    },
  });
  const { mutate: deleteTask } = api.task.deleteTask.useMutation({
    onMutate: (variables) => {
      const taskId = variables.id;
      setData(data?.filter((task) => task.id !== taskId));
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    },
  });

  // functions stuff
  const handleSelectAll = () => {
    setIsSelectedAll(!isSelectedAll);
    if (isSelectedAll) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(data?.map((task) => task.id) ?? []);
    }
  };
  const onClick = (isOn: boolean, taskId: number) => {
    if (isOn) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };
  const handleDeleteTasks = () => {
    deleteSomeTasks({ ids: selectedTasks });
    setSelectedTasks([]);
  };
  const handleDeleteOneTask = (taskId: number) => {
    deleteTask({ id: taskId });
  };

  return (
    <div className="mt-[60px] flex h-full w-full max-w-7xl flex-col items-center overflow-auto px-[3%]">
      {data.length > 0 ? (
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

            {data.map((items) => (
              <TaskRow
                onClick={onClick}
                date={items.deadline}
                isSelectedAll={isSelectedAll}
                TaskId={items.id}
                handleDelete={handleDeleteOneTask}
                handleFormValue={() =>
                  handleFormValue(
                    items.title,
                    items.description ?? "",
                    items.deadline,
                    items.id,
                  )
                }
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
