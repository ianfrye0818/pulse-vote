import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
  const user = await currentUser();
  if (user) redirect('/get-session');
  return (
    <div className='h-screen w-full flex flex-col items-center justify-evenly'>
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
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
        <Button
          asChild
          className='w-[150px]'
        >
          <Link href='/sign-in'>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
