"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { HiDotsVertical } from "react-icons/hi";

interface TitikTigaProps {
  showAlert: () => void;
}

export const TitikTiga = ({ showAlert }: TitikTigaProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={showAlert}>Delete</DropdownMenuItem>
        <DropdownMenuItem>Mark as complete</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
