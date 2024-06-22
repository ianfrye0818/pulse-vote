'use client';
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CustomAlertDialog from '@/components/alert-dialog';
import { resetResults } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { useUser } from '@clerk/nextjs';

interface HoverMenuProps {
  accessCode: string;
  roomId: string;
}

export default function HoverMenu({ accessCode, roomId }: HoverMenuProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  const { user } = useUser();

  async function handleResetResults() {
    try {
      setIsSubmitting(true);
      await resetResults(roomId);
      successToast({
        message: 'Results reset!',
      });
    } catch (error) {
      errorToast({
        message: 'Failed to reset results',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <p className='text-center text-xl font-bold'>{accessCode}</p>
        </HoverCardTrigger>
        {user && (
          <HoverCardContent className='flex flex-col gap-3'>
            <Button asChild>
              <Link href='/get-rooms'>Back to Rooms</Link>
            </Button>
            <CustomAlertDialog
              title='Reset Results'
              description='Are you sure you want to reset the results? This action cannot be undone.'
              onConfirm={handleResetResults}
              trigger='Reset Results'
              className='bg-red-500 text-white w-full'
              submitting={isSubmitting}
            />
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
}
