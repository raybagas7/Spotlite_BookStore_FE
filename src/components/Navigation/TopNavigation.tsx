import React from 'react';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useUser } from '@/store/useUser';

const TopNavigation = () => {
  const { userData, resetUserData } = useUser();
  const router = useRouter();
  const onLogout = async () => {
    deleteCookie('token', { path: '/' });
    resetUserData();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 z-[100] w-full border-b-[1px] bg-background/60 px-3 py-3 backdrop-blur md:px-28 2xl:px-72">
      <div className="flex w-full items-center justify-between gap-2 ">
        <div className="flex items-center gap-1 w-full">
          <Link href="/">
            <h1 className="text-xl font-bold max-md:text-base text-primary underline">
              SpotBook
            </h1>
          </Link>
          <div className="border-l-2 w-full overflow-hidden  relative h-8  flex items-center  border-primary ml-3 pl-3">
            <p className="text-xl absolute animate-slide_right_to_left font-bold max-md:text-base">
              <span className="text-primary">Hi</span> {userData?.name}!
            </p>
            <p className="text-xl absolute animate-slide_left_to_right font-bold max-md:text-base">
              Order Book Now!
            </p>
          </div>
        </div>
        <ul className="flex w-full justify-end gap-5 max-md:hidden">
          <Link href="/">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Home
            </li>
          </Link>
          {userData?.role === 'admin' && (
            <Link href="/add">
              <li className="cursor-pointer font-bold transition-colors hover:text-primary">
                Add Book
              </li>
            </Link>
          )}
          <Link href="/order">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Order
            </li>
          </Link>
          <button onClick={onLogout}>
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Logout
            </li>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigation;
