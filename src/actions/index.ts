"use server";

import { signIn, signOut } from "~/server/auth";

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const handleSignIn = async () => {
  await signIn("google", { redirectTo: "/tasklist" });
};
