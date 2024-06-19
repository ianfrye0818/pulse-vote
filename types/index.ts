export interface Choice {
  value: string;
  votes: number;
  color?: string;
}

export interface SessionData {
  docId: string;
  data: DocData;
}

export interface DocData {
  title: string;
  allowMultiple: boolean;
  sessionChoices: Choice[];
  totalVotes: number;
}
