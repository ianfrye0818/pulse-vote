import { IMAGES } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await currentUser();
  if (user) {
    redirect('/get-rooms');
  }
  return (
    <>
      {' '}
      <section className='w-full h-full py-10'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                  Real-time Polling Made Easy
                </h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                  Create custom polls, share access codes or QR codes, and get real-time results
                  from your audience.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center'>
                <Link
                  href='/sign-up'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href='/sign-in'
                  className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  prefetch={false}
                >
                  Sign In
                </Link>
              </div>
            </div>
            <a
              href='https://www.pulse-vote.com/get-room/yuW44HyKb9MCN9JnTdxm'
              target='_blank'
            >
              <Image
                src={IMAGES.pulseVoteGraphImage}
                width='550'
                height='550'
                alt='vote for how do you like your eggs'
                className='mx-auto aspect-video rounded-xl object-contain sm:w-full lg:order-last lg:aspect-square'
              />
            </a>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Powerful Polling Features
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Engage your audience with real-time polling, custom questions, and instant results.
                Pulse Vote makes it easy to gather feedback and make data-driven decisions.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
            <Image
              src={IMAGES.pulseVoteAddImage}
              width='550'
              height='310'
              alt='Image'
              className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
            />
            <div className='flex flex-col justify-center space-y-4'>
              <ul className='grid gap-6'>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Custom Polls</h3>
                    <p className='text-muted-foreground'>
                      Create polls with your own questions and answer choices.
                    </p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Real-time Results</h3>
                    <p className='text-muted-foreground'>
                      See live updates as your audience responds to your polls.
                    </p>
                  </div>
                </li>
                <li>
                  <div className='grid gap-1'>
                    <h3 className='text-xl font-bold'>Access Codes</h3>
                    <p className='text-muted-foreground'>
                      Share access codes or QR codes to let your audience join your polls.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
              Engage Your Audience with Pulse Vote
            </h2>
            <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              {
                "Gather real-time feedback, make data-driven decisions, and keep your audience engaged with Pulse Vote's powerful polling features."
              }
            </p>
          </div>
          <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end'>
            <Link
              href='/sign-up'
              className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              prefetch={false}
            >
              Get Started
            </Link>
            <Link
              href='/sign-in'
              className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              prefetch={false}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
