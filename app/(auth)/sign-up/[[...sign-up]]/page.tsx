import { SignUp } from '@clerk/nextjs';
import PageWrapper from '@/app/page-wrapper';

export default function SignUpPage() {
  return (
    <section className='h-screen flex justify-center items-center'>
      <SignUp />
    </section>
  );
}
