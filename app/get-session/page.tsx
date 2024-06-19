import { getSessionList } from '@/firebase/firestore';
import Link from 'next/link';
import React from 'react';

export default async function GetAllSessionsPage() {
  const sessions = await getSessionList();
  console.log(sessions);
  if (!sessions) {
    return null;
  }
  return (
    <div>
      {sessions.map((session) => (
        <div key={session.docId}>
          <Link href={`/get-session/${session.docId}`}>{session.data.title}</Link>
        </div>
      ))}
    </div>
  );
}
