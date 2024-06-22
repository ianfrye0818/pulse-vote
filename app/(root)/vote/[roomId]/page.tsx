'use client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SelectOption from './components/select-option';
import { Choice, roomData } from '@/types';
import { addVote } from '@/firebase/firestore';
import { db } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/app/page-wrapper';
import useRoom from '@/hooks/useRoom';

export default function VoteroomPage({ params }: { params: { roomId: string } }) {
  const router = useRouter();
  const room = useRoom(db, params.roomId) as roomData;
  const [submitting, setSubmitting] = useState(false);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  const allowMultiple = room?.data.allowMultiple;
  if (!room) {
    return null;
  }

  const handleChange = (index: number) => {
    const choice = room.data.roomChoices[index].value;

    if (!allowMultiple && userChoices.length > 0) {
      setUserChoices([choice]);
    } else {
      if (userChoices.includes(choice)) {
        setUserChoices(userChoices.filter((c) => c !== choice));
      } else {
        setUserChoices([...userChoices, choice]);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await addVote(params.roomId, userChoices);
      router.push('/vote/thank-you');
    } catch (error) {
      console.error(['Error submitting vote', error]);
    }
  };

  return (
    <PageWrapper center>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-8 w-full md:max-w-[750px] md:p-8 lg:rounded-xl lg:shadow-lg'
      >
        <div className='space-y-2'>
          <Label
            htmlFor='options'
            className='font-semibold text-3xl'
          >
            {room.data.title}
          </Label>
          <p className='text-muted-foreground'>
            {allowMultiple ? 'Select Your Options' : 'Select Single Option'}
          </p>
        </div>
        <div className='space-y-5'>
          {room.data.roomChoices.map((choice: Choice, index: number) => (
            <SelectOption
              key={index}
              id={`option${index}`}
              title={choice.value}
              allowMultiple={!!room?.data.allowMultiple}
              checked={userChoices.includes(choice.value)}
              onChange={() => handleChange(index)}
            />
          ))}
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Vote'}
        </Button>
      </form>
    </PageWrapper>
  );
}
