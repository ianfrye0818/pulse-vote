import React from 'react';
import clsx from 'clsx';

type PageWrapperProps = {
  children?: React.ReactNode;
  center?: boolean;
};

export default function PageWrapper({ children, center }: PageWrapperProps) {
  return (
    <div
      className={clsx('h-[calc(100vh-5rem)] flex flex-col items-center container mx-auto', {
        'justify-center': center,
      })}
    >
      {children}
    </div>
  );
}
