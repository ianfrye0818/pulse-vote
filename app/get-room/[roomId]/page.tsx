'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { env } from '@/env';
import { db } from '@/firebase/firebase.config';
import { calculateHeight } from '@/lib/utils';
import { Choice, roomData } from '@/types';
import useRoom from '@/hooks/useRoom';
import QRCodeContainer from './components/qr-code-container';

export default function GetroomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const room = useRoom(db, roomId) as roomData;
  const baseURL = env.BASE_URL;

  if (!room) {
    return null;
  }

  return (
    <Card className='h-screen container mx-auto flex-grow-[2] flex flex-col justify-between items-center  relative border-none'>
      <CardHeader>
        <CardTitle className='text-center mb-2'>{room.data.title}</CardTitle>
        <div className='flex justify-center items-center gap-8 my-3'>
          <h2 className='text-2xl font-bold'>Total Votes:</h2>
          <p className='text-xl font-bold'>{room.data.totalVotes}</p>
        </div>
      </CardHeader>
      <CardContent className='w-full flex justify-center'>
        <div className='flex gap-4'>
          {room.data.roomChoices.map((choice: Choice, index: number) => {
            const percentage = (choice.votes / room.data.totalVotes) * 100 || 0;

            return (
              <div
                key={index}
                className='flex flex-col items-center justify-end'
              >
                <div
                  className='relative w-[100px]'
                  style={{
                    height: calculateHeight(percentage),
                    backgroundColor: room.data.roomChoices[index].color,
                  }}
                >
                  <div className='absolute bottom-0 w-full text-center text-primary-foreground font-medium'>
                    {percentage.toFixed(2)}%
                  </div>
                </div>
                <Separator className='h-[1px] bg-black' />
                <div className='text-center text-muted-foreground font-medium mt-2'>
                  {choice.value}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <QRCodeContainer
        roomId={roomId}
        room={room}
        baseURL={baseURL}
      />
    </Card>
  );
}
