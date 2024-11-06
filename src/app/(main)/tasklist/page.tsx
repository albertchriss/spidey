import { SignOutButton } from "~/app/_components/SignOutButton";
import { TaskTable } from "~/app/_components/TaskTable";
import { auth } from "~/server/auth";

const TaskListPage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  return (
    <div className="font-inter my-2 flex h-full min-h-screen w-full flex-col items-center">
      <TaskTable userId={userId ?? ""} />
    </div>
  );
};

export default TaskListPage;
