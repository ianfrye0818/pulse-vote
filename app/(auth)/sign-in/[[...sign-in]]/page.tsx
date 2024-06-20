import { SignIn } from '@clerk/nextjs';
import PageWrapper from '@/app/page-wrapper';

export default function SignInPage() {
  return (
    <PageWrapper center>
      <SignIn afterSignOutUrl={'/sign-in'} />
    </PageWrapper>
  );
}
