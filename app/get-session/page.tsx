import { Button } from '@/components/ui/button';
import { deleteSession, getSessionList } from '@/firebase/firestore';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import DeleteSessionButton from './components/delete-session-button';

export default async function GetAllSessionsPage() {
  const sessions = await getSessionList();
  if (!sessions) {
    return null;
  }
  return (
    <div className='flex flex-col h-screen items-start w-1/2 mx-auto py-10'>
      <Link
        className='ml-auto mb-4 bg-blue-500 text-white px-4 py-2 rounded-md'
        href='/add-session'
      >
        Add Session
      </Link>
      {sessions.map((session) => (
        <div
          key={session.docId}
          className='flex gap-2 items-center justify-between w-full px-4 py-4 shadow-md border rounded-md border-gray-200 my-2'
        >
          <Link href={`/get-session/${session.docId}`}>{session.data.title}</Link>
          <DeleteSessionButton sessionId={session.docId} />
        </div>
      ))}
    </div>
  );
}
