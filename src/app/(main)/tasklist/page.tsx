import { CreateTaskPopUp } from "~/app/_components/create/CreateTaskPopUp";
import { TaskList } from "~/app/_components/tasklist/TaskList";
import { TaskTable } from "~/app/_components/tasklist/TaskTable";
import { auth } from "~/server/auth";

const TaskListPage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  return (
    <div className="font-inter my-2 flex h-full w-full flex-col items-center">
      <TaskList userId={userId} />
    </div>
  );
};

export default TaskListPage;
