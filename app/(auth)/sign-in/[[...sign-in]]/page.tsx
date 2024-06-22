import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

export default function SignInPage() {
  return (
    <section className='h-screen flex flex-col justify-center items-center'>
      <div className='w-max'>
        <Link
          href='/'
          className='mr-auto flex gap-2 my-2'
        >
          <ArrowLeftIcon />
          Back to Home
        </Link>
        <SignIn />
      </div>
    </section>
  );
}
