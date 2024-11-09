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
  showEdit?: boolean;
}

export const TitikTiga = ({
  showAlert,
  handleFormValue,
  showEdit
}: TitikTigaProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={showAlert}>Delete</DropdownMenuItem>
        {
          showEdit && (
            <DropdownMenuItem onClick={handleFormValue}>Edit</DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
