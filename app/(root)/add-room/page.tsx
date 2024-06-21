import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import PageWrapper from '@/app/page-wrapper';
import AddRoomForm from './components/add-room-form';

export default function page() {
  return (
    <PageWrapper center>
      <div className='flex flex-col gap-2'>
        <Link
          className='mr-auto flex'
          href='/get-rooms'
        >
          <ArrowLeft className='h-6 w-6' />
          Back To Sessions
        </Link>
        <AddRoomForm />
      </div>
    </PageWrapper>
  );
}
