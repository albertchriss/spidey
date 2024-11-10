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
  completedData?: Task[];
  handleFormValue: (title: string, description: string, date: Date, taskId: number) => void;
  setUpdatedData: (newTask: Task[]) => void;
  setCompletedData: (newTask: Task[]) => void;
  setNumCompleted: (num: number) => void;
}

export const CompletedTask = ({
  userId,
  completedData,
  handleFormValue,
  setUpdatedData,
  setCompletedData,
  setNumCompleted,
}: TaskTableProps) => {
  // state stuff
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [data, setData] = useState<Task[]>([]);

  // query stuff
  const { data: query } = api.task.getUserTasks.useQuery({
    id: userId,
    completed: true,
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
  const { mutate: uncompleteTask } = api.task.markTask.useMutation({
    onMutate: (variables) => {
      const taskId = variables.id;
      setData(data?.filter((task) => task.id !== taskId));
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      setUpdatedData(data?.filter((task) => task.id === taskId));
    },
  })
  const { mutate: unCompleteSomeTask } = api.task.markSomeTasks.useMutation({
    onMutate: (variables) => {
      const taskIds = variables.ids;
      setData(data?.filter((task) => !taskIds.includes(task.id)));
      setSelectedTasks(selectedTasks.filter((id) => !taskIds.includes(id)));
      setUpdatedData(data?.filter((task) => taskIds.includes(task.id)));
    }
  })

  useEffect(() => {
    if (query) {
      setData(query);
    }
  }, [query]);

  useEffect(() => {
    if (query)
      setNumCompleted(data.length);
  }, [query, data])

  useEffect(() => {
    if (completedData && completedData.length > 0) {
      setData((prevData) => [...prevData, ...completedData]);
      setCompletedData([]);
    }
  }, [completedData]);

  useEffect(() => {
    setNumSelected(selectedTasks.length);
    if (selectedTasks.length === data.length){
      setIsSelectedAll(true);
    }
    else{
      setIsSelectedAll(false)
    }
  }, [selectedTasks, data]);
  useEffect(() => {
    setData((prev) => [...prev].sort((a, b) => a.deadline.getTime() - b.deadline.getTime()));
  }, [query, completedData]);
  


  // functions stuff
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
    unCompleteSomeTask({ ids: selectedTasks, isCompleted: false });
    setSelectedTasks([])
  }
  const handleCompleteOneTask = (taskId: number) => {
    uncompleteTask({ id: taskId, isCompleted: false }); 
  }
  

  if (!query) {
    return (
        <TableSkeleton />
    );
  }

  if (data.length === 0) {
    return (
        <h1 className="italic">No completed task.</h1>
    )
  }

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center overflow-auto px-[3%]">
        <div className="flex w-full flex-col items-center">
          
          {/* table title */}
          <div className="mb-2 flex h-[50px] w-full items-center">
            {numSelected > 0 ? (
              <OptionBar handleDelete={handleDeleteTasks} handleCompleteTasks={handleCompleteTasks}/>
            ) : (
              <h1 className="text-3xl font-bold">Completed Tasks</h1>
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
                isCompleted={true}
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
