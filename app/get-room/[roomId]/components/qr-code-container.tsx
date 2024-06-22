'use client';
import QRCode from 'react-qr-code';
import HoverMenu from './hover-card';
import { roomData } from '@/types';

interface QRCodeContainerProps {
  roomId: string;
  room: roomData;
  baseURL: string;
}

export default function QRCodeContainer({ roomId, room, baseURL }: QRCodeContainerProps) {
  return (
    <div className='absolute top-5 right-5 flex flex-col gap-2  '>
      <QRCode
        size={130}
        value={`${baseURL}/vote/${roomId}`}
        width={16}
      />

      <HoverMenu
        accessCode={room.data.accessCode}
        roomId={roomId}
      />
    </div>
  );
}
