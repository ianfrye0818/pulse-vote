import Link from 'next/link';
import React from 'react';

export default function AddSessionButton() {
  return (
    <Link
      className='bg-blue-500 text-white px-4 py-2 rounded-md'
      href='/add-session'
    >
      Add Session
    </Link>
  );
}
