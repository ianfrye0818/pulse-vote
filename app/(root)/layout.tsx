import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import PageWrapper from '../page-wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='h-screen grid grid-rows-[96px,1fr,auto]'>
        <Header />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
      </main>
    </>
  );
}
export const dynamic = 'force-dynamic';
