'use client';

import { Button } from '@/components/ui/button';
import { deleteSession } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { TrashIcon } from 'lucide-react';

export default function DeleteSessionButton({ sessionId }: { sessionId: string }) {
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  async function handleDeleteSession(sessionId: string) {
    try {
      await deleteSession(sessionId);
      successToast({
        message: 'Session deleted successfully',
      });
    } catch (error) {
      errorToast({
        message: 'Failed to delete session',
      });
    }
  }

  return (
    <Button
      className='bg-red-500'
      size={'icon'}
      onClick={() => handleDeleteSession(sessionId)}
    >
      <TrashIcon
        color='white'
        size={20}
      />
    </Button>
  );
}
