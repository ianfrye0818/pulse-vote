import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function AddSessionButton() {
  return (
    <Button asChild>
      <Link href='/add-session'>Add Session</Link>
    </Button>
  );
}
