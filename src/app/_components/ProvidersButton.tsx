"use client";

import { handleSignIn } from "~/actions";
import { Button } from "~/components/ui/button";

export const ProvidersButton = () => {
  
  return (
    <form onSubmit={handleSignIn}>
      <Button size="lg" type="submit">
        Sign In
      </Button>
    </form>
  );
};
