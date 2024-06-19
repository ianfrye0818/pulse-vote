import AddSessionForm from '@/components/add-session-form';
import React from 'react';

export default function page() {
  return (
    <div className='max-w-[800px] mx-auto flex flex-col justify-center items-center h-screen gap-8'>
      <AddSessionForm />
    </div>
  );
}
