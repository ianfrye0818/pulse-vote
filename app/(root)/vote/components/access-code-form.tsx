'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSessionByAccessCode } from '@/firebase/firestore';
import useErrorToast from '@/hooks/useErrorToast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AccessCodeForm() {
  const [accessCode, setAccessCode] = React.useState('');
  const { errorToast } = useErrorToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessCode) return;
    setIsSubmitting(true);
    try {
      const session = await getSessionByAccessCode(accessCode);
      if (!session) throw new Error('Session not found');
      const url = `/vote/${session.docId}`;
      router.push(url);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) errorToast({ message: error.message });
      else
        errorToast({ message: 'An error occurred while accessing your session, please try again' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex gap-3'
    >
      <Input
        maxLength={4}
        minLength={4}
        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
        value={accessCode}
        placeholder='Enter Room Code'
      />
      <Button
        disabled={isSubmitting}
        type='submit'
      >
        {' '}
        Enter{' '}
      </Button>
    </form>
  );
}
