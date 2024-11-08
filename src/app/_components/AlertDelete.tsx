"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface AlertDeleteProps {
  children?: React.ReactNode;
  onConfirm: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const AlertDelete = ({ children, onConfirm, open, setOpen }: AlertDeleteProps) => {

  const handleConfirm = () => {
    onConfirm();
    setOpen(false); // Close the dialog after confirming
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {
        children ?
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        :
        null

      }
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
