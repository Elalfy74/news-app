import { useNews } from '@/hooks';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <h1 className='text-2xl font-semibold'>Welcome to News App!</h1>
      </main>
    </>
  );
}
