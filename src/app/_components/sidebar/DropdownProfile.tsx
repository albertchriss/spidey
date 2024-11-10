
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
import { SidebarMenuButton } from "~/components/ui/sidebar";

interface DropdownProfileProps {
    src: string;
    email: string;
}

export const DropdownProfile = ({src, email}: DropdownProfileProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-fit px-3 flex justify-center">
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>
              <Image src="/default-pp.svg" alt="profile-pic" width={100} height={100}/>
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold ml-auto">{email}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><SignOutButton /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
