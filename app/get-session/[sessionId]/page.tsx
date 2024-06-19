'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/firebase/firebase.config';
import useSession from '@/hooks/useSession';
import { SessionData } from '@/types';

export default function GetSessionPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const session = useSession(db, sessionId) as SessionData;

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
    <div className='h-screen flex flex-col justify-center items-center'>
      <Card className=' w-full max-w-min flex flex-col justify-center items-center'>
        <CardHeader>
          <CardTitle>{session.data.title}</CardTitle>
          {/* <CardDescription>A bar graph displaying data from a database.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className='flex items-end gap-4'>
            {session.data.sessionChoices.map((choice, index) => {
              const randomColor = setRandomNonWhiteBackgroundColor();
              const percentage = (choice.votes / session.data.totalVotes) * 100 || 100;

              return (
                <div
                  key={index}
                  className='flex flex-col items-center '
                >
                  <div
                    className='relative w-[100px]'
                    style={{ height: calculateHeight(percentage), backgroundColor: randomColor }}
                  >
                    <div className='absolute bottom-0 w-full text-center text-primary-foreground font-medium'>
                      {percentage.toFixed(2)}%
                    </div>
                  </div>
                  <div className='text-center text-muted-foreground font-medium mt-2'>
                    {choice.value}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
