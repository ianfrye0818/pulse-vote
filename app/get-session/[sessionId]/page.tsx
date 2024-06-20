'use client';

import PageWrapper from '@/app/page-wrapper';
import CustomAlertDialog from '@/components/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { env } from '@/env';
import { db } from '@/firebase/firebase.config';
import { resetResults } from '@/firebase/firestore';
import useSession from '@/hooks/useSession';
import { Choice, SessionData } from '@/types';
import { HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import Link from 'next/link';

import QRCode from 'react-qr-code';

export default function GetSessionPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const session = useSession(db, sessionId) as SessionData;
  const baseURL = env.BASE_URL;

  if (!session) {
    return null;
  }

  function calculateHeight(percentage: number) {
    const maxHeight = 400;
    return `${(percentage / 100) * maxHeight}px`;
  }

  function setRandomNonWhiteBackgroundColor() {
    let randomColor;

    do {
      randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } while (isTooLight(randomColor));

    return randomColor;
  }

  function isTooLight(color: string) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200; // Adjust this threshold as needed
  }

  return (
    <PageWrapper>
      <Card className='flex-grow-[2] container mt-3 mx-auto flex flex-col justify-between items-center  relative border-none'>
        <CardHeader>
          <CardTitle className='text-center mb-2'>{session.data.title}</CardTitle>

          <div className='flex justify-center items-center gap-8 my-3'>
            <h2 className='text-2xl font-bold'>Total Votes:</h2>
            <p className='text-xl font-bold'>{session.data.totalVotes}</p>
          </div>
        </CardHeader>
        <CardContent className='w-full flex justify-center'>
          <div className='flex gap-4'>
            {session.data.sessionChoices.map((choice: Choice, index: number) => {
              const randomColor = setRandomNonWhiteBackgroundColor();
              const percentage = (choice.votes / session.data.totalVotes) * 100 || 0;
              const backgroundColor = choice.color;

              return (
                <div
                  key={index}
                  className='flex flex-col items-center justify-end'
                >
                  <div
                    className='relative w-[100px]'
                    style={{
                      height: calculateHeight(percentage),
                      backgroundColor: session.data.sessionChoices[index].color || randomColor,
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
        <div className='absolute top-5 right-5 flex flex-col gap-2  '>
          <QRCode
            size={130}
            value={`${baseURL}/vote/${sessionId}`}
            width={16}
          />
          <HoverCard>
            <HoverCardTrigger>
              <p className='text-center text-xl font-bold'>{session.data.accessCode}</p>
            </HoverCardTrigger>
            <HoverCardContent className='flex flex-col gap-3'>
              <Button asChild>
                <Link href='/get-session'>Back to sessions</Link>
              </Button>
              <CustomAlertDialog
                title='Reset Results'
                description='Are you sure you want to reset the results? This action cannot be undone.'
                onConfirm={() => resetResults(sessionId)}
                trigger='Reset Results'
                className='bg-red-500 text-white w-full'
              />
            </HoverCardContent>
          </HoverCard>
        </div>
      </Card>
    </PageWrapper>
  );
}
