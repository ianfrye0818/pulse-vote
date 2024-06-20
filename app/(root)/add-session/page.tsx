import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import AddSessionForm from './components/add-session-form';

export default function page() {
  return (
    <div className='max-w-[800px] mx-auto flex flex-col justify-center items-center h-screen gap-8'>
      <Link
        className='mr-auto flex'
        href='/get-session'
      >
        <ArrowLeft className='h-6 w-6' />
        Back To Sessions
      </Link>
      <AddSessionForm />
    </div>
  );
}
