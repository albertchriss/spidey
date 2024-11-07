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
}

export const TaskTable = ({ userId, updatedData }: TaskTableProps) => {
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

  if (updatedData && updatedData.length > 0){
    data = [...updatedData, ...(data ?? [])];
  }

  // mutation stuff
  const { mutate: deleteSomeTasks } = api.task.deleteSomeTasks.useMutation({
    onSuccess: (data, variables) => {
      const taskIds = variables.ids;
      setDeletedTasks([...deletedTasks, ...taskIds]);
      setNumSelected(selectedTasks.length - taskIds.length);
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
    }
  });
  const { mutate: deleteTask } = api.task.deleteTask.useMutation({
    onSuccess: (data, variables) => {
      const taskId = variables.id;
      setDeletedTasks([...deletedTasks, taskId]);
      setNumSelected(selectedTasks.length - (selectedTasks.includes(taskId) ? 1 : 0));
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    },
  });


  // functions stuff
  const handleSelectAll = () => {
    setIsSelectedAll(!isSelectedAll);
    if (isSelectedAll) {
      setNumSelected(0);
      setSelectedTasks([]);
    }
    else{
      setNumSelected(data?.length ?? 0);
      setSelectedTasks(data?.map((task) => task.id) ?? []);
    }
  }
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
    deleteSomeTasks({ids: selectedTasks});
  }
  const handleDeleteOneTask = (taskId: number) => {
    deleteTask({ id: taskId });
  }

  return (
    <div className="mt-[60px] h-full w-full overflow-auto flex flex-col items-center px-[3%] max-w-7xl">
      {((data?.length ?? 0 > 0) && (data?.length !== deletedTasks.length)) ? (
          <div className="flex w-full flex-col items-center">
            {/* table title */}
            <div className="mb-2 w-full h-[50px] flex items-center">
              {
                numSelected > 0 ? 
                <OptionBar handleDelete={handleDeleteTasks}/> 
                : 
                <h1 className="text-3xl font-bold">Your Tasks</h1>
              }
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
                  date={items.deadline}
                  isSelectedAll={isSelectedAll}
                  TaskId={items.id}
                  deletedTasks={deletedTasks}
                  handleDelete={handleDeleteOneTask}
                >
                  {items.title}
                </TaskRow>
              ))}
            </div>

            {/* table footer */}
            <div className="mt-2 flex w-full justify-between">
              <p className="text-slate-500">
                {numSelected} selected
              </p>
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
