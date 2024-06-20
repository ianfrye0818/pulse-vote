import PageWrapper from '@/app/page-wrapper';
import React from 'react';
import AddSessionForm from '../../add-session/components/add-session-form';
import { getSession } from '@/firebase/firestore';
import EditSessionForm from '../../add-session/components/edit-sessionform';

export default async function EditSessionPage({ params }: { params: { sessionId: string } }) {
  const sessionId = params.sessionId;
  const session = await getSession(sessionId);
  if (!session) {
    return null;
  }
  return (
    <PageWrapper center>
      <EditSessionForm session={session} />
    </PageWrapper>
  );
}
