"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useTaskContext } from "../tasklist/TaskContext";

interface CreateButtonProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  setIsCreate: (value: boolean) => void;
}

export function CreateButton({
  trigger,
  title,
  description,
  children,
  setIsCreate
}: CreateButtonProps) {

  const {
    isOpenDialog,
    setIsOpenDialog,
  } = useTaskContext();

  const onOpenChange = () => {
    setIsOpenDialog(!isOpenDialog);
    if (isOpenDialog) {
      setIsCreate(false);
    }
  };
  const handleTrigger = () => {
    setIsOpenDialog(true);
    setIsCreate(true);
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog open={isOpenDialog} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                  <Button variant={"default"} onClick={handleTrigger} className="w-full">
                    {trigger}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%] max-w-[80%]">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  {children}
                </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
