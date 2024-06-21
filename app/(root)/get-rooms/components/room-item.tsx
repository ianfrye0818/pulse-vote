'use client';
import CustomAlertDialog from '@/components/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteRoom } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { roomData } from '@/types';
import { Edit2Icon, Trash2Icon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface roomItemProps {
  room: roomData;
}

export default function RoomItem({ room }: roomItemProps) {
  const router = useRouter();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  const handleDeleteClick = async () => {
    try {
      await deleteRoom(room.docId);
      successToast({
        message: 'room deleted successfully',
      });
    } catch (error) {
      errorToast({
        message: 'Failed to delete room',
      });
    }
  };

  const handleEditClick = () => {
    router.push(`/edit-room/${room.docId}`);
  };

  const handleDivClick = () => {
    router.push(`/get-room/${room.docId}`);
  };

  return (
    <div
      onClick={handleDivClick}
      className='flex gap-2 items-center justify-between w-full px-4 py-4 shadow-md border rounded-md border-gray-200 my-2 cursor-pointer'
    >
      <span>{room.data.title}</span>
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
          title='Delete room'
          description='Are you sure you want to delete this room?'
          onConfirm={handleDeleteClick}
          trigger={<TrashIcon color='white' />}
          className='bg-red-500 text-white'
        />
      </div>
    </div>
  );
}
