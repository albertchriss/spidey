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
  title: string;
  description?: string;
  date: Date;
  setIsOpenDialog: (isOpen: boolean) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string | undefined) => void;
  setDate: (value: Date) => void;
}

export const TitikTiga = ({
  showAlert,
  title,
  description,
  date,
  setIsOpenDialog,
  setTitle,
  setDescription,
  setDate,
}: TitikTigaProps) => {
  const handleOnclick = () => {
    setIsOpenDialog(true);
    // console.log(title);
    setTitle(title);
    setDescription(description);
    setDate(date);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={showAlert}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={handleOnclick}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Mark as complete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
