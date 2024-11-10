"use client"; 

import { handleSignOut } from "~/actions";

export const SignOutButton = () => {
  return (
      <button onClick={()=>handleSignOut()} className="w-full">Sign Out</button>
  );
};
