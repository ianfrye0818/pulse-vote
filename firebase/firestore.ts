'use server';
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
import { Choice, SessionData } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { revalidatePath } from 'next/cache';
import { db } from './firebase.config';

export async function addSession(
  sessionChoices: Choice[],
  allowMultiple: boolean,
  title: string
): Promise<string | undefined> {
  try {
    const sessionRef = collection(db, 'sessions');
    const doc = await addDoc(sessionRef, {
      title,
      sessionChoices,
      totalVotes: 0,
      allowMultiple,
    });
    revalidatePath('/get-session');
    return 'Session added';
  } catch (error) {
    console.error(['Error adding document:'], error);
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
  }
}

export async function getSessionList() {
  try {
    const sessionsRef = collection(db, 'sessions');
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
    const sessionRef = doc(db, 'sessions', sessionId);

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
    return 'Vote added';
  } catch (error) {}
}

export async function deleteSession(sessionId: string) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await deleteDoc(sessionRef);
    revalidatePath('/get-session');
  } catch (error) {
    console.error(['Error deleting document:'], error);
  }
}
