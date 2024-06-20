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
import { ForwardRefExoticComponent, MouseEventHandler } from 'react';
import { Button } from './ui/button';
import { Trash2Icon } from 'lucide-react';
import clsx from 'clsx';

interface CustomAlertDialogProps {
  trigger?: string | React.ReactNode;
  title: string;
  description: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  triggerColor?: string;
  textColor?: string;
  className?: string;
}

export default function CustomAlertDialog({
  description,
  onConfirm,
  title,
  trigger,
  triggerColor = 'black',
  textColor = 'white',
  className,
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
            <AlertDialogAction onClick={handleConfirmClick}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
