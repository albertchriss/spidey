import { auth } from "~/server/auth";
import { Navbar } from "../_components/Navbar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="relative flex min-h-screen w-full min-w-fit flex-col items-center overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
