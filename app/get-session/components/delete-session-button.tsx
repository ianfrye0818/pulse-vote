'use client';

import { Button } from '@/components/ui/button';
import { deleteSession } from '@/firebase/firestore';
import { TrashIcon } from 'lucide-react';

export default function DeleteSessionButton({ sessionId }: { sessionId: string }) {
  return (
    <Button
      className='bg-red-500'
      size={'icon'}
      onClick={async (e) => {
        await deleteSession(sessionId);
      }}
    >
      <TrashIcon
        color='white'
        size={20}
      />
    </Button>
  );
}
