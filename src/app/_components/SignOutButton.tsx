"use client"; 

import { handleSignOut } from "~/actions";
import { Button } from "~/components/ui/button";

export const SignOutButton = () => {
  

  return (
    <form onSubmit={handleSignOut}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
};
