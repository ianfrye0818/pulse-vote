/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6VvhKTRxKDf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import SignUpForm from './components/sign-up-form';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className='mx-auto max-w-[450px] space-y-6 py-12 flex flex-col justify-center h-screen'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Welcome back</h1>
        <p className='text-muted-foreground'>Enter your credentials to access your account</p>
      </div>

      <SignUp />
    </div>
  );
}
