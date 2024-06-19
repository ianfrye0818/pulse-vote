import { useState, useEffect } from 'react';
import { doc, onSnapshot, Firestore } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';

export interface SessionData {
  docId: string;
  data: any;
}

const useSession = (firestore: Firestore, sessionId: string) => {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        const sessionData = { docId: doc.id, data: doc.data() } as SessionData;
        setSession(sessionData);
      } else {
        setSession(null);
      }
    });

    return () => {
      unsubscribe();
      setSession(null);
    };
  }, [firestore, sessionId]);

  return session;
};

export default useSession;
