'use client';
import { Button } from '@/components/ui/button';
import { deleteSession } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { SessionData } from '@/types';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SessionItemProps {
  session: SessionData;
}

export default function SessionItem({ session }: SessionItemProps) {
  const router = useRouter();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      await deleteSession(session.docId);
      successToast({
        message: 'Session deleted successfully',
      });
    } catch (error) {
      errorToast({
        message: 'Failed to delete session',
      });
    }
  };

  const handleDivClick = () => {
    router.push(`/get-session/${session.docId}`);
  };

  return (
    <div
      onClick={handleDivClick}
      className='flex gap-2 items-center justify-between w-full px-4 py-4 shadow-md border rounded-md border-gray-200 my-2 cursor-pointer'
    >
      <span>{session.data.title}</span>
      <Button
        className='bg-red-500'
        size={'icon'}
        onClick={(e) => handleDeleteClick(e)}
      >
        <TrashIcon
          color='white'
          size={20}
        />
      </Button>
    </div>
  );
}
