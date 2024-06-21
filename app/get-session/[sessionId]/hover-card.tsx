import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CustomAlertDialog from '@/components/alert-dialog';
import { resetResults } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';

interface HoverMenuProps {
  accessCode: string;
  sessionId: string;
}

export default function HoverMenu({ accessCode, sessionId }: HoverMenuProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errorToast } = useErrorToast();

  async function handleResetResults() {
    try {
      setIsSubmitting(true);
      await resetResults(sessionId);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        errorToast({
          message:
            'Only authorized users can reset results. If you are the session owner, please try again.',
        });
      } else {
        errorToast({
          message: 'Failed to reset results',
        });
      }
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
        <HoverCardContent className='flex flex-col gap-3'>
          <Button asChild>
            <Link href='/get-session'>Back to sessions</Link>
          </Button>
          <CustomAlertDialog
            title='Reset Results'
            description='Are you sure you want to reset the results? This action cannot be undone.'
            onConfirm={handleResetResults}
            trigger='Reset Results'
            className='bg-red-500 text-white w-full'
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
