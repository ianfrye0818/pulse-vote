import AddSessionForm from '@/components/add-session-form';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <Link
        className='p-3 rounded-md bg-black text-white '
        href='/get-session'
      >
        Get Started
      </Link>
    </div>
  );
}
