import React from 'react';
import Header from './components/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
export const dynamic = 'force-dynamic';
