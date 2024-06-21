'use server';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  DocumentData,
} from 'firebase/firestore';
import { Choice } from '@/types';
import { revalidatePath } from 'next/cache';
import { db } from './firebase.config';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { generateAccessCode } from '@/lib/utils';

export async function addSession(
  sessionChoices: Choice[],
  allowMultiple: boolean,
  title: string
): Promise<string | undefined> {
  try {
    const { user } = await checkAuthorization({
      errorMessage: 'Please sign in to create a session',
    });
    const sessionRef = collection(db, 'sessions');
    const doc = await addDoc(sessionRef, {
      title,
      sessionChoices,
      totalVotes: 0,
      allowMultiple,
      userId: user.id,
      accessCode: generateAccessCode(),
    });
    revalidatePath('/get-session');
    return doc.id;
  } catch (error) {
    console.error(['Error adding document:'], error);
    throw error;
  }
}

export async function getSession(sessionId: string) {
  try {
    const docRef = doc(db, 'sessions', sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docId: docSnap.id, data: docSnap.data() };
    }
  } catch (error) {
    console.error(['Error getting document:'], error);
    throw error;
  }
}

export async function getSessionByAccessCode(accessCode: string) {
  try {
    const q = query(
      collection(db, 'sessions'),
      where('accessCode', '==', accessCode.toUpperCase())
    );
    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map((doc) => {
      return { docId: doc.id, data: doc.data() };
    });
    return sessions[0];
  } catch (error) {
    console.error(['Error getting documents:'], error);
    throw error;
  }
}

export async function getSessionList() {
  const { user } = await checkAuthorization({
    errorMessage: 'Please sign in to view your sessions',
  });

  try {
    const q = query(collection(db, 'sessions'), where('userId', '==', user.id));

    const querySnapshot = await getDocs(q);

    const sessions = querySnapshot.docs.map((doc) => {
      return { docId: doc.id, data: doc.data() };
    });

    return sessions;
  } catch (error) {
    console.error(['Error getting documents:'], error);
    throw error;
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
    const sessionRef = doc(db, 'sessions', sessionId);

    await updateDoc(sessionRef, {
      sessionChoices: document.data.sessionChoices.map((choice: Choice) => {
        if (userChices.includes(choice.value)) {
          return {
            ...choice,
            votes: choice.votes + 1,
          };
        }
        return choice;
      }),
      totalVotes: document.data.totalVotes + 1,
    });
    return 'Vote added';
  } catch (error) {
    console.error(['Error adding vote:'], error);
    throw error;
  }
}

export async function updateSession(sessionId: string, sessionData: DocumentData) {
  await checkAuthorization({
    sessionId,
    errorMessage: 'Only the session owner can update the session',
  });
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      title: sessionData.title,
      sessionChoices: sessionData.choices,
      allowMultiple: sessionData.allowMultiple,
      totalVotes: sessionData.totalVotes,
    });
    revalidatePath('/get-session');
  } catch (error) {
    console.error(['Error updating document:'], error);
    throw error;
  }
}

export async function resetResults(sessionId: string) {
  try {
    const session = await getSession(sessionId);
    if (!session) throw new Error('Session not found');
    await updateSession(sessionId, {
      ...session.data,
      choices: session.data.sessionChoices.map((choice: Choice) => {
        return {
          ...choice,
          votes: 0,
        };
      }),
      totalVotes: 0,
    });
  } catch (error) {
    console.error(['Error resetting results:'], error);
    throw error;
  }
}

export async function deleteSession(sessionId: string) {
  await checkAuthorization({ sessionId });
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await deleteDoc(sessionRef);
    revalidatePath('/get-session');
  } catch (error) {
    console.error(['Error deleting document:'], error);
    throw error;
  }
}

async function checkAuthorization({
  sessionId,
  errorMessage,
}: { sessionId?: string; errorMessage?: string } = {}) {
  try {
    let session = null;
    const user = await currentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    if (sessionId) {
      const session = await getSession(sessionId);
      if (!user || !session || session.data.userId !== user.id) {
        throw new Error('Unauthorized');
      }
    }
    return { user, session };
  } catch (error) {
    console.log(error);
    throw new Error(errorMessage || 'Unauthorized');
  }
}
