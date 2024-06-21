import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function AddRoomButton() {
  return (
    <Button asChild>
      <Link href='/add-room'>Add Room</Link>
    </Button>
  );
}
