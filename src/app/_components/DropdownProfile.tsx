
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";

interface DropdownProfileProps {
    src: string;
    email: string;
}

export const DropdownProfile = ({src, email}: DropdownProfileProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={src} />
          <AvatarFallback>
            <Image src="/default-pp.svg" alt="profile-pic" width={100} height={100}/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="mx-4 my-2">{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><SignOutButton /></DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
