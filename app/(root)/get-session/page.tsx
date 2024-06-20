import { Button } from '@/components/ui/button';
import { deleteSession, getSessionList } from '@/firebase/firestore';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import PageWrapper from '@/app/page-wrapper';
import SessionItem from './components/session-item';

export default async function GetAllSessionsPage() {
  const sessions = await getSessionList();

  if (!sessions) {
    return null;
  }

  return (
    <PageWrapper center={sessions?.length === 0}>
      {sessions.length > 0 ? (
        <div className='flex flex-col gap-4  w-full'>
          <h1 className='text-3xl font-bold text-center '>All Sessions</h1>
          <div className='flex flex-col gap-2 max-w-[750px] w-full mx-auto'>
            {sessions.map((session) => (
              <SessionItem
                key={session.docId}
                session={session}
              />
              // <div
              //   key={session.docId}
              //   className='flex gap-2 items-center justify-between w-full px-4 py-4 shadow-md border rounded-md border-gray-200 my-2'
              // >
              //   <Link href={`/get-session/${session.docId}`}>{session.data.title}</Link>
              //   <DeleteSessionButton sessionId={session.docId} />
              // </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4 items-center'>
          <h1 className='text-3xl font-bold text-center'>No Sessions</h1>
          <Link
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            href='/add-session'
          >
            Add Session
          </Link>
        </div>
      )}
    </PageWrapper>
  );

  // if (!sessions) {
  //   return null;
  // }
  // return (
  //   <PageWrapper>
  //     <Link
  //       className='ml-auto mb-4 bg-blue-500 text-white px-4 py-2 rounded-md'
  //       href='/add-session'
  //     >
  //       Add Session
  //     </Link>
  //     {sessions.map((session) => (
  //       <div
  //         key={session.docId}
  //         className='flex gap-2 items-center justify-between w-full px-4 py-4 shadow-md border rounded-md border-gray-200 my-2'
  //       >
  //         <Link href={`/get-session/${session.docId}`}>{session.data.title}</Link>
  //         <DeleteSessionButton sessionId={session.docId} />
  //       </div>
  //     ))}
  //   </PageWrapper>
  // );
}
