import { SignIn } from '@clerk/nextjs';
import PageWrapper from '@/app/page-wrapper';

export default function SignInPage() {
  return (
    <section className='h-screen flex justify-center items-center'>
      <SignIn />
    </section>
  );
}
