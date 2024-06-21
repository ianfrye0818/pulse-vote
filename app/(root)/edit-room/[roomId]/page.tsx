import PageWrapper from '@/app/page-wrapper';
import React from 'react';
import { getRoom } from '@/firebase/firestore';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EditRoomForm from '../../add-room/components/edit-room-form';

export default async function EditroomPage({ params }: { params: { roomId: string } }) {
  const roomId = params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    return null;
  }
  return (
    <PageWrapper center>
      <div className='flex flex-col gap-2'>
        <Link
          className='mr-auto flex'
          href='/get-rooms'
        >
          <ArrowLeft className='h-6 w-6' />
          Back To rooms
        </Link>
        <EditRoomForm room={room} />
      </div>
    </PageWrapper>
  );
}
