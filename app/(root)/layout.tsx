import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import PageWrapper from '../page-wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <PageWrapper>{children}</PageWrapper>
      </main>
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
