import Image from 'next/image';
import { Inter } from 'next/font/google';
import { ReactElement } from 'react';
import MainLayout from '@/components/Layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>asd</div>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
