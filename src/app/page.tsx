import React from "react";
import { ProvidersButton } from "./_components/ProvidersButton";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

const LandingPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/tasklist");
  }
  return (
    <main className="flex h-screen w-full items-center justify-center gap-4 overflow-hidden">
      <div className="flex w-[80%] h-[250px] items-center justify-center gap-[6%] rounded-2xl">
        <Image src="/spidey.png" width={400} height={400} alt="spidey" />
        <div className="flex flex-col items-start justify-around h-full">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold">Welcome to Spidey</h1>
            <p className="text-lg text-slate-500">
              Your Friendly Neighborhood Tasks Management App
            </p>
          </div>
          <ProvidersButton />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
