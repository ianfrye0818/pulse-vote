'use client';
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function LoadingScreen() {
  return (
    <div className='h-screen w-full justify-center items-center flex flex-col'>
      <TailSpin
        color='#3b83f6'
        height={100}
      />
    </div>
  );
}
