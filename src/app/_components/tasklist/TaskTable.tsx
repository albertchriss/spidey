"use client";
import React, { useEffect, useState, useTransition } from "react";
import { TaskRow } from "./TaskRow";
import { TaskHeader } from "./TaskHeader";
import { OptionBar } from "~/app/_components/tasklist/OptionBar";
import { api } from "~/trpc/react";
import { Task } from "~/server/db/schema";
import { TableSkeleton } from "./TableSkeleton";

interface TaskTableProps {
  userId: string;
  updatedData?: Task[];
  editedData?: Task;
  handleFormValue: (
    title: string,
    description: string,
    date: Date,
    taskId: number,
  ) => void;
  setUpdatedData: (newTask: Task[]) => void;
  setEditedData: (newTask: Task | undefined) => void;
  setCompletedData: (newTask: Task[]) => void;
  setNumOngoing: (value: number) => void;
}

export const TaskTable = ({
  userId,
  updatedData,
  editedData,
  handleFormValue,
  setUpdatedData,
  setEditedData,
  setCompletedData,
  setNumOngoing,
}: TaskTableProps) => {
  // state 
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [data, setData] = useState<Task[]>([]);

  // query 
  const { data: query } = api.task.getUserTasks.useQuery({
    id: userId,
    completed: false,
  });
  
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
  const { mutate: completeTask } = api.task.markTask.useMutation({
    onMutate: (variables) => {
      const taskId = variables.id;
      setCompletedData(data?.filter((task) => task.id === taskId));
      setData(data?.filter((task) => task.id !== taskId));
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    },
  });
  const { mutate: completeSomeTask } = api.task.markSomeTasks.useMutation({
    onMutate: (variables) => {
      const taskIds = variables.ids;
      setCompletedData(data?.filter((task) => taskIds.includes(task.id)));
      setData(data?.filter((task) => !taskIds.includes(task.id)));
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
    }
  })
  
  // useeffect
  useEffect(() => {
    if (query) {
      setData(query);
    }
  }, [query]);
  
  useEffect(() => {
    if (query)
      setNumOngoing(data.length);
  }, [query, data])
  
  useEffect(() => {
    if (updatedData && updatedData.length > 0) {
      setData((prevData) => [...prevData, ...updatedData]);
      setUpdatedData([]);
    }
  }, [updatedData]);

  useEffect(() => {
    if (editedData) {
      setData((prevData) =>
        prevData.map((task) =>
          task.id === editedData.id ||
          (!task.id &&
            task.title === editedData.title &&
            task.description === editedData.description &&
            task.deadline.toISOString() === editedData.deadline.toISOString())
            ? editedData
            : task,
        ),
      );
      setEditedData(undefined);
    }
  }, [editedData]);

  useEffect(() => {
    setNumSelected(selectedTasks.length);
    if (selectedTasks.length === data.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedTasks, data]);

  useEffect(() => {
    setData((prev) => [...prev].sort((a, b) => a.deadline.getTime() - b.deadline.getTime()));
  }, [query, updatedData, editedData]);



  // functions
  const handleSelectAll = () => {
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
  const handleCompleteTasks = () => {
    completeSomeTask({ ids: selectedTasks, isCompleted: true });
    setSelectedTasks([]);
  }
  const handleCompleteOneTask = (taskId: number) => {
    completeTask({ id: taskId, isCompleted: true });
  };

  if (!query) {
    return <TableSkeleton />;
  }

  if (data.length === 0) {
    return <h1 className="italic text-gray-600">No ongoing task.</h1>;
  }

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center overflow-auto px-[3%]">
      <div className="flex w-full flex-col items-center">
        {/* table title */}
        <div className="mb-2 flex h-[50px] w-full items-center">
          {numSelected > 0 ? (
            <OptionBar handleDelete={handleDeleteTasks} mark handleCompleteTasks={handleCompleteTasks}/>
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
              key={items.id}
              onClick={onClick}
              date={items.deadline}
              description={items.description ?? ""}
              isCompleted={false}
              showEdit
              isSelected={selectedTasks.includes(items.id)}
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
              handleComplete={() => handleCompleteOneTask(items.id)}
            >
              {items.title}
            </TaskRow>
          ))}
        </div>

        {/* table footer */}
        <div className="mt-2 flex w-full">
          <p className="text-slate-500">{numSelected} selected</p>
        </div>
      </div>
    </div>
  );
};
