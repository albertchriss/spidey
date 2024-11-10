"use client"
import { CreateTaskPopUp } from "../create/CreateTaskPopUp";
import { useTaskContext } from "../tasklist/TaskContext";
import type { Task } from "~/server/db/schema";

interface CreateTabProps {
    userId?: string;
}

export const CreateTab = ({userId}: CreateTabProps) => {
    const {
        
        setUpdatedData,
        setEditedData,
        setIsOpenDialog,
        setTitle,
        setDescription,
        setDate,
        setTaskId,
        isOpenDialog,
        title,
        description,
        date,
        taskId,

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
    
    
        return (
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
            setUndefined={setUndefined}
          />
        )
}