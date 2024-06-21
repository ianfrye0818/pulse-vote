import { getRoomList } from '@/firebase/firestore';
import AddRoomButton from '../components/add-room-button';
import PageWrapper from '@/app/page-wrapper';
import RoomItem from '../components/room-item';
import { currentUser } from '@clerk/nextjs/server';

export default async function GetAllRoomsPage() {
  const rooms = await getRoomList();

  if (!rooms) {
    return null;
  }

  return (
    <PageWrapper center={rooms?.length === 0}>
      {rooms.length > 0 ? (
        <div className='flex flex-col gap-4  w-full'>
          <div className='ml-auto'>
            <AddRoomButton />
          </div>
          <h1 className='text-3xl font-bold text-center '>All rooms</h1>
          <div className='flex flex-col gap-2 max-w-[750px] w-full mx-auto'>
            {rooms.map((room) => (
              <RoomItem
                key={room.docId}
                room={room}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4 items-center'>
          <h1 className='text-3xl font-bold text-center'>No rooms</h1>
          <AddRoomButton />
        </div>
      )}
    </PageWrapper>
  );
}
