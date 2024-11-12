import { OptionBar } from "./OptionBar";

interface TaskTitleProps {
  numSelected: number;
  isCompleted: boolean;
  handleDeleteTasks: () => void;
  handleCompleteTasks: () => void;
}

export const TaskTitle = ({
  numSelected,
  isCompleted,
  handleDeleteTasks,
  handleCompleteTasks,
}: TaskTitleProps) => {
  return (
    <div className="mb-2 flex h-[50px] w-full items-center">
      {numSelected > 0 ? (
        <OptionBar
          handleDelete={handleDeleteTasks}
          mark={!isCompleted}
          handleCompleteTasks={handleCompleteTasks}
        />
      ) : (
        <h1 className="text-3xl font-bold">Tasks</h1>
      )}
    </div>
  );
};
