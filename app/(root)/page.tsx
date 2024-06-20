import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-evenly'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-4xl font-bold text-center'>Welcome to Pulse Vote</h1>
        <h2 className='text-2xl text-center'>
          Where users can vote in real-time to any platform you create.
        </h2>
      </div>
      <div className=' flex justify-center items-center gap-4'>
        <Button
          asChild
          className='w-[150px]'
        >
          <Link href='/sign-in'>Get Started</Link>
        </Button>
        <Button
          asChild
          variant={'outline'}
          className='w-[150px]'
        >
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
