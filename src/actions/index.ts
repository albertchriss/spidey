"use server";

import { signIn, signOut } from "~/server/auth";

export const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut({ redirectTo: "/" });
  };


export const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("google", { redirectTo: "/tasklist" });
  };