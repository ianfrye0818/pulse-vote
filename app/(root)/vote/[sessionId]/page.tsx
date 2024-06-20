'use client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import useSession, { SessionData } from '@/hooks/useSession';
import { useState } from 'react';
import SelectOption from './components/select-option';
import { Choice } from '@/types';
import { addVote } from '@/firebase/firestore';
import { db } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/app/page-wrapper';

export default function VoteSessionPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter();
  const session = useSession(db, params.sessionId) as SessionData;
  const [submitting, setSubmitting] = useState(false);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  const allowMultiple = session?.data.allowMultiple;
  if (!session) {
    return null;
  }

  const handleChange = (index: number) => {
    const choice = session.data.sessionChoices[index].value;

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
      await addVote(params.sessionId, userChoices);
      router.push('/vote/thank-you');
    } catch (error) {
      console.error(['Error submitting vote', error]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper center>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-8 w-full'
      >
        <div className='space-y-2'>
          <Label
            htmlFor='options'
            className='font-semibold text-3xl'
          >
            {session.data.title}
          </Label>
          <p className='text-muted-foreground'>
            {allowMultiple ? 'Select your options' : 'Select single Option'}
          </p>
        </div>
        <div className='space-y-5'>
          {session.data.sessionChoices.map((choice: Choice, index: number) => (
            <SelectOption
              key={index}
              id={`option${index}`}
              title={choice.value}
              allowMultiple={!!session?.data.allowMultiple}
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
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </PageWrapper>
  );
}
