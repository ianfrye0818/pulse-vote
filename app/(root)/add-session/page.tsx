import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import AddSessionForm from './components/add-session-form';
import PageWrapper from '@/app/page-wrapper';

export default function page() {
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
        <AddSessionForm />
      </div>
    </PageWrapper>
  );
}