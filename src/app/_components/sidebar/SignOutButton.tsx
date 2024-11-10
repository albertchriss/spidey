"use client";

import { HiOutlineLogout } from "react-icons/hi";
import { handleSignOut } from "~/actions";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => handleSignOut()}
      className="flex w-full justify-between"
    >
      <p>Sign Out</p>
      <HiOutlineLogout className="inline size-5" />
    </button>
  );
};
