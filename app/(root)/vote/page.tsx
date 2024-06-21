import PageWrapper from '@/app/page-wrapper';
import React from 'react';
import AccessCodeForm from './components/access-code-form';

export default function VotePage() {
  return (
    <PageWrapper center>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-bold'>Enter Room Code</h1>
        <AccessCodeForm />
      </div>
    </PageWrapper>
  );
}
