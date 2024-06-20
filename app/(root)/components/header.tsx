import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

export default async function Header() {
  const user = await currentUser();
  return (
    <div className='container mx-auto flex justify-between items-center h-20'>
      <Link href='/get-session'>
        <h1 className='text-2xl font-bold'>PulseVote</h1>
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <Button asChild>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      )}
    </div>
  );
}
