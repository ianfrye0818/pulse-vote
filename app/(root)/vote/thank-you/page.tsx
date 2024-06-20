import Link from 'next/link';

export default function ThankYouForVotingPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <div className='max-w-md p-6 bg-card rounded-lg shadow-lg'>
        <div className='space-y-4 text-center'>
          <h1 className='text-3xl font-bold text-card-foreground'>Thank You for Voting</h1>
          <p className='text-muted-foreground'>
            We appreciate your participation in our survey. Your input will be automatically updated
            in the presentation shortly.
          </p>
          {/* <Link
            href="#"
            className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2"
            prefetch={false}
          >
            Return to Home
          </Link> */}
        </div>
      </div>
    </div>
  );
}
