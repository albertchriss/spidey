import { auth } from "~/server/auth";
import { Navbar } from "../_components/Navbar";
import { redirect } from "next/navigation";
import { CreateTaskPopUp } from "../_components/create/CreateTaskPopUp";

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
    <div className="relative flex min-h-screen w-full min-w-fit flex-col items-center overflow-hidden">
      <Navbar src={imgsrc ?? "/default-pp.svg"} email={email ?? ""} />
      {children}
    </div>
  );
}
