import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { firestore } from './firebase.config';
import { Choice, SessionData } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export async function addSession(
  sessionChoices: Choice[],
  allowMultiple: boolean,
  title: string
): Promise<string | undefined> {
  console.log({ sessionChoices, allowMultiple });
  try {
    const sessionRef = collection(firestore, 'sessions');
    const doc = await addDoc(sessionRef, {
      title,
      sessionChoices,
      totalVotes: 0,
      allowMultiple,
    });
    console.log(doc.id);
    return 'Session added';
  } catch (error) {
    console.error(['Error adding document:'], error);
  }
}

export async function getSession(sessionId: string) {
  try {
    const docRef = doc(firestore, 'sessions', sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docId: docSnap.id, data: docSnap.data() };
    }
  } catch (error) {
    console.error(['Error getting document:'], error);
  }
}

export async function getSessionList() {
  try {
    const sessionsRef = collection(firestore, 'sessions');
    const querySnapshot = await getDocs(sessionsRef);

    const sessions = querySnapshot.docs.map((doc) => {
      return { docId: doc.id, data: doc.data() };
    });

    return sessions;
  } catch (error) {
    console.error(['Error getting documents:'], error);
  }
}

export async function addVote(
  sessionId: string,
  userChices: string[]
): Promise<string | undefined> {
  try {
    const document = await getSession(sessionId);
    if (!document) {
      throw new Error('Session not found');
    }
    const sessionRef = doc(firestore, 'sessions', sessionId);

    await updateDoc(sessionRef, {
      sessionChoices: document.data.sessionChoices.map((choice: Choice) => {
        if (userChices.includes(choice.value)) {
          return {
            value: choice.value,
            votes: choice.votes + 1,
          };
        }
        return choice;
      }),
      totalVotes: document.data.totalVotes + 1,
    });
    // await updateDoc(sessionRef, sessionId, {
    //   sessionChoices: {
    //     [choiceIndex]: {
    //       votes: document.data[choiceIndex].votes + 1,
    //     },
    //   },
    //   totalVotes: document.data.totalVotes + 1,
    // });
    return 'Vote added';
  } catch (error) {
    console.log(['Error adding vote'], error);
  }
}

export async function deleteSession(sessionId: string) {
  try {
    const sessionRef = doc(firestore, 'sessions', sessionId);
    await deleteDoc(sessionRef);
  } catch (error) {
    console.error(['Error deleting document:'], error);
  }
}

export function watchSession(
  sessionId: string,
  setSession: Dispatch<SetStateAction<SessionData | null>>
) {
  const sessionRef = doc(firestore, 'sessions', sessionId);
  onSnapshot(sessionRef, (doc) => {
    if (doc.exists()) {
      const sessionData = { docId: doc.id, data: doc.data() } as SessionData;
      setSession(sessionData);
    } else {
      setSession(null);
    }
  });
}

export { firestore };
