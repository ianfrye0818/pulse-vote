'use client';
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
} from '@/components/ui/alert-dialog';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';

interface CustomAlertDialogProps {
  trigger?: string | React.ReactNode;
  title: string;
  description: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  submitting?: boolean;
}

export default function CustomAlertDialog({
  description,
  onConfirm,
  title,
  trigger,
  className,
  submitting,
}: CustomAlertDialogProps) {
  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onConfirm(e);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={clsx(
            'flex justify-center items-center rounded-md p-2 cursor-pointer',
            className
          )}
          // style={{ backgroundColor: triggerColor, color: textColor }}
        >
          {trigger!}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={submitting}
              onClick={handleConfirmClick}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
