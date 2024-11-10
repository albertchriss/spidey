"use client";

import { handleSignIn } from "~/actions";
import { Button } from "~/components/ui/button";

export const ProvidersButton = () => {
  
  return (
      <Button size="lg" onClick={() => handleSignIn()}>
        Sign In
      </Button>
  );
};
