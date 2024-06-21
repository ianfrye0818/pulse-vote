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

export async function addRoom(
  roomChoices: Choice[],
  allowMultiple: boolean,
  title: string
): Promise<string | undefined> {
  try {
    const { user } = await checkAuthorization({
      errorMessage: 'Please sign in to create a room',
    });
    const roomRef = collection(db, 'rooms');
    const doc = await addDoc(roomRef, {
      title,
      roomChoices,
      totalVotes: 0,
      allowMultiple,
      userId: user.id,
      accessCode: generateAccessCode(),
    });
    revalidatePath('/get-rooms');
    return doc.id;
  } catch (error) {
    console.error(['Error adding document:'], error);
    throw error;
  }
}

export async function getRoom(roomId: string) {
  try {
    const docRef = doc(db, 'rooms', roomId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docId: docSnap.id, data: docSnap.data() };
    }
  } catch (error) {
    console.error(['Error getting document:'], error);
    throw error;
  }
}

export async function getRoomByAccessCode(accessCode: string) {
  try {
    const q = query(collection(db, 'rooms'), where('accessCode', '==', accessCode.toUpperCase()));
    const querySnapshot = await getDocs(q);
    const rooms = querySnapshot.docs.map((doc) => {
      return { docId: doc.id, data: doc.data() };
    });
    return rooms[0];
  } catch (error) {
    console.error(['Error getting room'], error);
    throw error;
  }
}

export async function getRoomList() {
  const { user } = await checkAuthorization();
  try {
    const q = query(collection(db, 'rooms'), where('userId', '==', user.id));

    const querySnapshot = await getDocs(q);

    const rooms = querySnapshot.docs.map((doc) => {
      return { docId: doc.id, data: doc.data() };
    });

    return rooms;
  } catch (error) {
    console.error(['Error getting documents:'], error);
    throw error;
  }
}

export async function addVote(roomId: string, userChices: string[]): Promise<string | undefined> {
  try {
    const document = await getRoom(roomId);
    if (!document) {
      throw new Error('room not found');
    }
    const roomRef = doc(db, 'rooms', roomId);

    await updateDoc(roomRef, {
      roomChoices: document.data.roomChoices.map((choice: Choice) => {
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

export async function updateRoom(roomId: string, roomData: DocumentData) {
  await checkAuthorization({
    roomId,
    errorMessage: 'Only the room owner can update the room',
  });
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, {
      title: roomData.title,
      roomChoices: roomData.choices,
      allowMultiple: roomData.allowMultiple,
      totalVotes: roomData.totalVotes,
    });
    revalidatePath('/get-rooms');
  } catch (error) {
    console.error(['Error updating room:'], error);
    throw error;
  }
}

export async function resetResults(roomId: string) {
  try {
    const room = await getRoom(roomId);
    if (!room) throw new Error('Room not found');
    await updateRoom(roomId, {
      ...room.data,
      choices: room.data.roomChoices.map((choice: Choice) => {
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

export async function deleteRoom(roomId: string) {
  await checkAuthorization({ roomId });
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await deleteDoc(roomRef);
    revalidatePath('/get-rooms');
  } catch (error) {
    console.error(['Error deleting document:'], error);
    throw error;
  }
}

async function checkAuthorization({
  roomId,
  errorMessage,
}: { roomId?: string; errorMessage?: string } = {}) {
  try {
    let room = null;
    const user = await currentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    if (roomId) {
      const room = await getRoom(roomId);
      if (!user || !room || room.data.userId !== user.id) {
        throw new Error('Unauthorized');
      }
    }
    return { user, room };
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage || 'Unauthorized');
  }
}
