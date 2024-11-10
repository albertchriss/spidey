// TaskContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import type { Task } from "~/server/db/schema";

interface TaskContextType {
  isOpenDialog: boolean;
  title?: string;
  description?: string;
  date?: Date;
  taskId?: number;
  updatedData?: Task[];
  editedData?: Task;
  completedData?: Task[];
  numCompleted?: number;
  numOngoing?: number;
  setIsOpenDialog: (isOpen: boolean) => void;
  setTitle: (title?: string) => void;
  setDescription: (description?: string) => void;
  setDate: (date?: Date) => void;
  setTaskId: (taskId?: number) => void;
  setUpdatedData: (tasks: Task[]) => void;
  setEditedData: (task: Task) => void;
  setCompletedData: (tasks: Task[]) => void;
  setNumCompleted: (count: number) => void;
  setNumOngoing: (count: number) => void;
}

// Create the context with default values
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [taskId, setTaskId] = useState<number | undefined>();
  const [updatedData, setUpdatedData] = useState<Task[]>();
  const [editedData, setEditedData] = useState<Task | undefined>();
  const [completedData, setCompletedData] = useState<Task[]>();
  const [numCompleted, setNumCompleted] = useState<number | undefined>();
  const [numOngoing, setNumOngoing] = useState<number | undefined>();
  

  return (
    <TaskContext.Provider
      value={{
        isOpenDialog,
        title,
        description,
        date,
        taskId,
        updatedData,
        editedData,
        completedData,
        numCompleted,
        numOngoing,
        setIsOpenDialog,
        setTitle,
        setDescription,
        setDate,
        setTaskId,
        setUpdatedData,
        setEditedData,
        setCompletedData,
        setNumCompleted,
        setNumOngoing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook to use the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
