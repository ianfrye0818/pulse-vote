import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import SignInForm from './components/sign-in-form';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className='mx-auto max-w-[450px] space-y-6 py-12 h-screen flex justify-center flex-col '>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Welcome back</h1>
        <p className='text-muted-foreground'>Enter your credentials to access your account</p>
      </div>
      <SignIn afterSignOutUrl={'/sign-in'} />
    </div>
  );
}
