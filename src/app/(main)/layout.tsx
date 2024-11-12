import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "../_components/sidebar/Sidebar";
import { TaskProvider } from "../_components/tasklist/TaskContext";
import { Toaster } from "~/components/ui/toaster";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const imgsrc = session?.user.image;
  const email = session?.user.email;
  const userId = session?.user.id;
  if (!session) {
    redirect("/");
  }
  return (
    <main className="relative flex min-h-screen w-full min-w-fit items-center overflow-hidden">
      <SidebarProvider>
        <TaskProvider>
          <AppSidebar src={imgsrc ?? ""} email={email ?? ""} userId={userId ?? ""}/>
          {children}
          <Toaster />
        </TaskProvider>
      </SidebarProvider>
    </main>
  );
}
