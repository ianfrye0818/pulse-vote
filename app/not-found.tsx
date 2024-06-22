import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Component() {
  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <header className='flex flex-col h-[calc(100vh_-_1rem)] items-center justify-center gap-2 px-4 text-center md:px-6'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-6xl'>
            404 Error - Page Not Found
          </h1>
          <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </div>

        <Link
          href='/'
          className='inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
          prefetch={false}
        >
          Go Home
        </Link>
      </header>
    </div>
  );
}
