import { Inter } from 'next/font/google';
import Head from 'next/head';

import { NewsList } from '@/components/News';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center max-w-3xl mx-auto py-12 px-4 ${inter.className}`}
      >
        <h1 className='text-2xl font-semibold mb-8'>Your Feed</h1>
        <NewsList />
      </main>
    </>
  );
}
