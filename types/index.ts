import { DocumentData } from 'firebase/firestore';

export interface Choice {
  value: string;
  votes: number;
  color?: string;
}

export interface roomData {
  docId: string;
  data: DocData | DocumentData;
}

export interface DocData {
  title: string;
  allowMultiple: boolean;
  roomChoices: Choice[];
  totalVotes: number;
  accessCode: string;
}
