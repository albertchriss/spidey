import { TaskList } from "~/app/_components/tasklist/TaskList";
import { auth } from "~/server/auth";

const TaskListPage = async () => {
  const session = await auth();

  const userId = session?.user.id;
  return (
    <div className="font-inter flex h-full w-full flex-col items-center pt-20 gap-5">
      <TaskList userId={userId} />
    </div>
  );
};

export default TaskListPage;
