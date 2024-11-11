import type { Task } from "~/server/db/schema";
import { TaskHeader } from "./TaskHeader";
import { TaskRow } from "./TaskRow";
import { useTaskContext } from "./TaskContext";

interface TaskContentProps {
  data: Task[];
  isSelectedAll: boolean;
  isCompleted: boolean;
  selectedTasks: number[];
  onSelectTask: (isOn: boolean, taskId: number) => void;
  handleSelectAll: () => void;
  handleDelete: (taskId: number) => void;
  handleComplete: (taskId: number) => void;
}

export const TaskContent = ({
  data,
  isSelectedAll,
  isCompleted,
  selectedTasks,
  onSelectTask,
  handleSelectAll,
  handleDelete,
  handleComplete,
}: TaskContentProps) => {
  const { handleFormValue } = useTaskContext();
  return (
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
          onClick={onSelectTask}
          date={items.deadline}
          description={items.description ?? ""}
          isCompleted={isCompleted}
          showEdit={!isCompleted}
          isSelected={selectedTasks.includes(items.id)}
          TaskId={items.id}
          handleDelete={handleDelete}
          handleFormValue={() =>
            handleFormValue(
              items.title,
              items.description ?? "",
              items.deadline,
              items.id,
            )
          }
          handleComplete={() => handleComplete(items.id)}
        >
          {items.title}
        </TaskRow>
      ))}
    </div>
  );
};
