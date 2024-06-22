import React from 'react';
import { PacmanLoader } from 'react-spinners';

export default function LoadingScreen() {
  return (
    <div className='h-screen w-full justify-center items-center flex flex-col'>
      <PacmanLoader
        color='#D0021B'
        size={50}
      />
    </div>
  );
}
