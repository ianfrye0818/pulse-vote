import { SignUp } from '@clerk/nextjs';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
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
        <SignUp />
      </div>
    </section>
  );
}
