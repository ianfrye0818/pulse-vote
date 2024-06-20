import PageWrapper from '@/app/page-wrapper';
import React from 'react';
import { getSession } from '@/firebase/firestore';
import EditSessionForm from '../../add-session/components/edit-sessionform';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function EditSessionPage({ params }: { params: { sessionId: string } }) {
  const sessionId = params.sessionId;
  const session = await getSession(sessionId);
  if (!session) {
    return null;
  }
  return (
    <PageWrapper center>
      <div className='flex flex-col gap-2'>
        <Link
          className='mr-auto flex'
          href='/get-session'
        >
          <ArrowLeft className='h-6 w-6' />
          Back To Sessions
        </Link>
        <EditSessionForm session={session} />
      </div>
    </PageWrapper>
  );
}
