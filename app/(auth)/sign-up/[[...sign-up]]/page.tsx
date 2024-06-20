import { SignUp } from '@clerk/nextjs';
import PageWrapper from '@/app/page-wrapper';

export default function SignUpPage() {
  return (
    <PageWrapper center>
      <SignUp />
    </PageWrapper>
  );
}
