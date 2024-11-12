"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import type { Task } from "~/server/db/schema";
import { TableSkeleton } from "./TableSkeleton";
import { useTaskContext } from "./TaskContext";
import { TaskTitle } from "./TaskTitle";
import { TaskContent } from "./TaskContent";
import { TaskFooter } from "./TaskFooter";

interface TaskTableProps {
  userId: string;
  isCompleted: boolean;
}

export const TaskTable = ({ userId, isCompleted }: TaskTableProps) => {
  // state
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [data, setData] = useState<Task[]>([]);
  const {
    updatedData,
    completedData,
    editedData,
    failedData,
    setUpdatedData,
    setEditedData,
    setFailedData,
    setCompletedData,
    setNumOngoing,
    setNumCompleted,
  } = useTaskContext();

  // query
  const { data: query } = api.task.getUserTasks.useQuery({
    id: userId,
    completed: isCompleted,
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
      setData(data?.filter((task) => task.id !== taskId));
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      if (!isCompleted) {
        setCompletedData(data?.filter((task) => task.id === taskId));
      } else {
        setUpdatedData(data?.filter((task) => task.id === taskId));
      }
    },
  });
  const { mutate: completeSomeTask } = api.task.markSomeTasks.useMutation({
    onMutate: (variables) => {
      const taskIds = variables.ids;
      setData(data?.filter((task) => !taskIds.includes(task.id)));
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
      if (!isCompleted) {
        setCompletedData(data?.filter((task) => taskIds.includes(task.id)));
      } else {
        setUpdatedData(data?.filter((task) => taskIds.includes(task.id)));
      }
    },
  });

  // useeffect
  useEffect(() => {
    if (query) {
      setData(query);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      if (!isCompleted) {
        setNumOngoing(data.length);
      } else {
        setNumCompleted(data.length);
      }
    }
  }, [query, data]);

  useEffect(() => {
    if (!isCompleted) {
      if (updatedData && updatedData.length > 0) {
        setData((prevData) => [...prevData, ...updatedData]);
        setUpdatedData([]);
      }
    }
  }, [updatedData]);

  useEffect(() => {
    if (isCompleted) {
      if (completedData && completedData.length > 0) {
        setData((prevData) => [...prevData, ...completedData]);
        setCompletedData([]);
      }
    }
  }, [completedData]);

  useEffect(() => {
    if (!isCompleted && editedData) {
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
    setData((prev) =>
      [...prev].sort((a, b) => a.deadline.getTime() - b.deadline.getTime()),
    );
  }, [query, updatedData, editedData, completedData]);

  useEffect(() => {
    if (failedData) {
      setData((prev) =>
        prev.filter(
          (task) =>
            !(task.id === failedData.id ||
            (!task.id &&
              task.title === failedData.title &&
              task.description === failedData.description &&
              task.deadline.toISOString() ===
                failedData.deadline.toISOString())),
        ),
      );
      setFailedData(undefined);
    }
  }, [failedData]);

  // functions
  const handleSelectAll = () => {
    if (isSelectedAll) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(data?.map((task) => task.id) ?? []);
    }
  };
  const onSelectTask = (isOn: boolean, taskId: number) => {
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
    completeSomeTask({ ids: selectedTasks, isCompleted: !isCompleted });
    setSelectedTasks([]);
  };
  const handleCompleteOneTask = (taskId: number) => {
    completeTask({ id: taskId, isCompleted: !isCompleted });
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
        <TaskTitle
          handleCompleteTasks={handleCompleteTasks}
          handleDeleteTasks={handleDeleteTasks}
          numSelected={numSelected}
          isCompleted={isCompleted}
        />

        {/* table content */}
        <TaskContent
          data={data}
          isSelectedAll={isSelectedAll}
          isCompleted={isCompleted}
          selectedTasks={selectedTasks}
          onSelectTask={onSelectTask}
          handleSelectAll={handleSelectAll}
          handleDelete={handleDeleteOneTask}
          handleComplete={handleCompleteOneTask}
        />

        {/* table footer */}
        <TaskFooter numSelected={numSelected} />
      </div>
    </div>
  );
};
