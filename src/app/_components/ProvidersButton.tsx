"use server";

import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";

interface ProvidersButtonProps {
  provider: string;
}
export const ProvidersButton = ({ provider }: ProvidersButtonProps) => {
  return (
    <form
      action={async () => {
        await signIn(provider, { redirectTo: "/tasklist" });
      }}
    >
      <Button size="lg" type="submit">
        Sign In
      </Button>
    </form>
  );
};
