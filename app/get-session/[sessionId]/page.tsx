'use client';

import { firestore, getSession } from '@/firebase/firestore';
import useSession from '@/hooks/useSession';
import { SessionData } from '@/types';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// export default async function GetSessionPage({ params }: { params: { sessionId: string } }) {
//   const { sessionId } = params;
//   const session = (await getSession(sessionId)) as SessionData;
//   console.log(session);
//   return (
//     <div>
//       <p>{sessionId}</p>
//       {session &&
//         session.data.sessionChoices.map((choice) => (
//           <div key={choice.value}>
//             <p>{choice.value}</p>
//             <p>{choice.votes}</p>
//           </div>
//         ))}
//     </div>
//   );
// }

export default function GetSessionPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const session = useSession(firestore, sessionId) as SessionData;

  if (!session) {
    return null;
  }

  console.log(session);

  return (
    <div>
      <p>{session.data.title}</p>
      {session &&
        session.data.sessionChoices.map((choice) => {
          const percentage = (choice.votes / session.data.totalVotes) * 100;
          return (
            <div key={choice.value}>
              <p>{choice.value}</p>
              <p>{choice.votes}</p>
              <p>{percentage}</p>
            </div>
          );
        })}
      <p>{session?.data.totalVotes}</p>
    </div>
  );
}
