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

interface CreateButtonProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsCreate: (value: boolean) => void;
}

export function CreateButton({
  trigger,
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  setIsCreate,
}: CreateButtonProps) {
  const onOpenChange = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsCreate(false);
    }
  };
  const handleTrigger = () => {
    setIsOpen(true);
    setIsCreate(true);
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
              {/* <SidebarMenuButton className="hover:bg-none" asChild> */}
                <DialogTrigger asChild>
                  <Button variant={"default"} onClick={handleTrigger} className="w-full">
                    {trigger}
                  </Button>
                </DialogTrigger>
              {/* </SidebarMenuButton> */}
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
