'use client';
import CustomAlertDialog from '@/components/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteSession } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { SessionData } from '@/types';
import { Edit2Icon, Trash2Icon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SessionItemProps {
  session: SessionData;
}

export default function SessionItem({ session }: SessionItemProps) {
  const router = useRouter();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  const handleDeleteClick = async () => {
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

  const handleEditClick = () => {
    router.push(`/edit-session/${session.docId}`);
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
      <div
        className='flex items-center gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className='bg-blue-500'
          size={'icon'}
          onClick={handleEditClick}
        >
          <Edit2Icon />
        </Button>

        <CustomAlertDialog
          title='Delete Session'
          description='Are you sure you want to delete this session?'
          onConfirm={handleDeleteClick}
          trigger={<TrashIcon color='white' />}
          className='bg-red-500 text-white'
        />
      </div>
    </div>
  );
}
