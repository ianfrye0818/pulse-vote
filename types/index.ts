import { DocumentData } from 'firebase/firestore';

export interface Choice {
  value: string;
  votes: number;
  color?: string;
}

export interface SessionData {
  docId: string;
  data: DocData | DocumentData;
}

export interface DocData {
  title: string;
  allowMultiple: boolean;
  sessionChoices: Choice[];
  totalVotes: number;
  accessCode: string;
}
