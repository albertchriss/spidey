import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "../_components/sidebar/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const imgsrc = session?.user.image;
  const email = session?.user.email;
  if (!session) {
    redirect("/");
  }
  return (
    <main className="relative flex min-h-screen w-full min-w-fit items-center overflow-hidden">
      <SidebarProvider>
        <AppSidebar src={imgsrc ?? ""} email={email ?? ""} />
        {/* <Navbar src={imgsrc ?? "/default-pp.svg"} email={email ?? ""} /> */}
        {children}
      </SidebarProvider>
    </main>
  );
}
