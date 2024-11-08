"use client";
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
  handleFormValue: () => void;
}

export const TitikTiga = ({
  showAlert,
  handleFormValue,

}: TitikTigaProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={showAlert}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={handleFormValue}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Mark as complete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
