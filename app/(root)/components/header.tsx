import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

export default async function Header() {
  const user = await currentUser();
  return (
    <header className='border-b h-16 mb-4'>
      <div className='container mx-auto flex h-full justify-between items-center '>
        <Link href='/'>
          <h1 className='text-2xl font-bold'>PulseVote</h1>
        </Link>
        <div className='flex items-center gap-3'>
          <Button
            variant={'secondary'}
            asChild
          >
            <Link href='/vote'>Vote</Link>
          </Button>
          {user ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <Button asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
