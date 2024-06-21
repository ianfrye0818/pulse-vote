import { useState, useEffect } from 'react';
import { doc, onSnapshot, Firestore } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';

export interface SessionData {
  docId: string;
  data: any;
}

const useRoom = (firestore: Firestore, roomId: string) => {
  const [room, setRoom] = useState<SessionData | null>(null);

  useEffect(() => {
    const sessionRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        const roomData = { docId: doc.id, data: doc.data() } as SessionData;
        setRoom(roomData);
      } else {
        setRoom(null);
      }
    });

    return () => {
      unsubscribe();
      setRoom(null);
    };
  }, [firestore, roomId]);

  return room;
};

export default useRoom;
