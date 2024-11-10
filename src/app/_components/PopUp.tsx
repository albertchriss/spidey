"use client"
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

interface PopUpProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsCreate: (value: boolean) => void;
}

export function PopUp({
  trigger,
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  setIsCreate,
  
}: PopUpProps) {
  const onOpenChange = () => {
    setIsOpen(!isOpen);
    if (isOpen){
      setIsCreate(false);
    }
  };
  const handleTrigger = () => {
    setIsOpen(true);
    setIsCreate(true);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-[2%] right-[2%] flex size-12 items-center justify-center rounded-full p-0"
          onClick={handleTrigger}
        >
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
  );
}
