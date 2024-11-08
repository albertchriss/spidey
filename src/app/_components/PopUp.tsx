"use client"
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";

interface PopUpProps {
  trigger: string;
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
          className="absolute bottom-[2%] right-[2%] flex size-12 items-center justify-center rounded-full text-4xl"
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
