import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import PageWrapper from '../page-wrapper';

export default async function Home() {
  const user = await currentUser();
  if (user) redirect('/get-rooms');
  return (
    <PageWrapper center>
      <div className='flex flex-col justify-evenly h-full'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-4xl font-bold text-center'>Welcome to Pulse Vote</h1>
          <h2 className='text-2xl text-center'>
            Empowering users to cast real-time votes on any platform you create.
          </h2>
        </div>
        <div className=' flex justify-center items-center gap-4'>
          <Button
            asChild
            variant={'outline'}
            className='w-[150px]'
          >
            <SignUpButton />
          </Button>
          <Button
            asChild
            className='w-[150px]'
          >
            <SignInButton />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
