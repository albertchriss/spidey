"use client";
import { FcGoogle } from "react-icons/fc";
import { handleSignIn } from "~/actions";
import { Button } from "~/components/ui/button";

export const ProvidersButton = () => {
  
  return (
      <Button size="lg" onClick={() => handleSignIn()} className="p-6">
        <p className="text-lg">Sign In</p>
        <FcGoogle className="size-6 ml-4"/>
      </Button>
  );
};
